import { useCallback, useMemo, useState } from 'react';
import { convertFileToBase64 } from '@mertsolak/file-helper';

import { DropZoneHookReturns, DropZoneHookProps, Control } from '../definitions';
import { variableHelper, acceptHelper } from '../helpers';

/**
 * It gives ready to use states if control
 * object is provided to DropZoneComponent
 * as props
 * @param param @type DropZoneHookProps
 * @returns DropZoneHookReturns<DropZoneHookProps>
 */
export const useDropZone = <T extends DropZoneHookProps>(
  { getFilesAs }: T = { getFilesAs: 'File' } as T,
): DropZoneHookReturns<T> => {
  const [fileInDropZone, setFileInDropZone] = useState<DropZoneHookReturns<T>['fileInDropZone']>(false);
  const [totalFileSize, setTotalFileSize] = useState<DropZoneHookReturns<T>['totalFileSize']>();
  const [fileList, setFileList] = useState<DropZoneHookReturns<T>['fileList']>();
  const [files, setFiles] = useState<DropZoneHookReturns<T>['files']>();

  /** It sets file related states and converts files if needed
   * @param eventFileList @type FileList
   */
  const processFiles = useCallback(
    async (eventFileList: FileList) => {
      const convertedFiles: DropZoneHookReturns<T>['files'] = [];
      const conversionPromises: Promise<any>[] = [];
      const eventFiles: File[] = [];
      let eventTotalFileSize = 0;

      Object.keys(eventFileList).forEach((eachFileKey) => {
        const file = eventFileList[eachFileKey] as File;
        eventFiles.push(file);
        eventTotalFileSize += file.size;

        if (getFilesAs === 'base64') {
          conversionPromises.push(convertFileToBase64(file));
        }
      });

      const conversionResults = await Promise.all(conversionPromises);

      eventFiles.forEach((file, index) => {
        const convertedFile = conversionResults[index] ?? file;
        convertedFiles.push(convertedFile);
      });

      setTotalFileSize(eventTotalFileSize);
      setFileList(eventFileList);
      setFiles(convertedFiles);
    },
    [getFilesAs],
  );

  /**
   * It filters files by looking at accept and multiple
   * and calls processFiles with filtered files
   * @param event @type DragEvent<HtMLDivElement>
   * @param accept @type string[]
   * @param multiple @type boolean
   */
  const handleOnDrop = useCallback<Control['onDrop']>(
    (event, accept, multiple) => {
      const extendedAccept = acceptHelper.extend(accept);
      setFileInDropZone(false);

      const eventFiles = event.dataTransfer.files;
      const newDataTransfer = new DataTransfer();

      Object.values(eventFiles).some((file) => {
        const confirmFile = () => {
          newDataTransfer.items.add(file);
          if (!multiple) {
            return true;
          }

          return false;
        };

        if (!variableHelper.isDefined(extendedAccept)) {
          return confirmFile();
        }

        if (extendedAccept.includes(`.${file.type.split('/').pop()}`)) {
          return confirmFile();
        }

        return false;
      });

      processFiles(newDataTransfer.files);
    },
    [processFiles],
  );

  /**
   * it calls processFiles with files that comes from event
   * @param event @type DragEvent<HtMLDivElement>
   */
  const handleOnChange = useCallback<Control['onChange']>(
    (event) => {
      processFiles(event.currentTarget.files);
    },
    [processFiles],
  );

  /**
   * it sets fileInDropZone state true to notify there is a file
   * inside of the drop zone borders
   */
  const handleOnDragEnter = useCallback<Control['onDragEnter']>(() => {
    setFileInDropZone(true);
  }, []);

  /**
   * it sets fileInDropZone state false to notify there is no file
   * inside of the drop zone borders
   */
  const handleOnDragLeave = useCallback<Control['onDragLeave']>(() => {
    setFileInDropZone(false);
  }, []);

  /**
   * it resets all file related states
   */
  const reset = () => {
    setTotalFileSize(null);
    setFileList(null);
    setFiles(null);
  };

  /**
   * control object that controls dropZoneComponent to process
   * inputs for the ready to use outputs
   */
  const control: DropZoneHookReturns<T>['control'] = useMemo(
    () => ({
      onDrop: handleOnDrop,
      onChange: handleOnChange,
      onDragEnter: handleOnDragEnter,
      onDragLeave: handleOnDragLeave,
      fileInDropZone,
    }),
    [handleOnDrop, handleOnChange, handleOnDragEnter, handleOnDragLeave, fileInDropZone],
  );

  return { control, files, fileList, totalFileSize, fileInDropZone, reset };
};
