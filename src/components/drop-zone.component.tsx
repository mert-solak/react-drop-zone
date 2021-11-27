import React, { ChangeEventHandler, DragEventHandler, useCallback, useRef } from 'react';

import { variableHelper, attributeHelper } from '../helpers';
import { ComponentProps } from '../definitions';

import styles from './drop-zone.module.scss';

/**
 * button and content container can be overwritten
 * it can be managed by control object that comes
 * from useDropZone hook
 * @param param @type ComponentProps
 * @returns Rect.ReactNode
 */
export const DropZone: React.FC<ComponentProps> = ({
  className,
  buttonComponent: ButtonComponentParam,
  contentComponent: ContentComponentParam,
  accept,
  multiple,
  control,
  onDrop,
  onChange,
  onDragEnter,
  onDragLeave,
}) => {
  const inputRef = useRef<HTMLInputElement>();

  /**
   * It redirects event, accept and multiple to onDrop
   * and control.onDrop if they are given and prevents
   * default to make drop zone working
   * @param event @type DragEvent<HTMLDivElement>
   */
  const handleOnDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();

      if (variableHelper.isDefined(onDrop)) {
        onDrop(event, accept, multiple);
      }

      if (variableHelper.isDefined(control?.onDrop)) {
        control?.onDrop(event, accept, multiple);
      }
    },
    [onDrop, control?.onDrop, accept, multiple],
  );

  /**
   * It prevents default to make drop zone working
   * @param event: DragEvent<HTMLDivElement>
   */
  const handleOnDragOver: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault();
  }, []);

  /**
   * It redirects event to onDragEnter and control.onDragEnter if they are given
   * @param event @type DragEvent<HTMLDivElement>
   */
  const handleOnDragEnter: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (variableHelper.isDefined(onDragEnter)) {
        onDragEnter(event);
      }

      if (variableHelper.isDefined(control?.onDragEnter)) {
        control?.onDragEnter(event);
      }
    },
    [onDragEnter, control?.onDragEnter],
  );

  /**
   * It redirects event to onDragLeave and control.onDragLeave if they are given
   * @param event @type DragEvent<HTMLDivElement>
   */
  const handleOnDragLeave: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (variableHelper.isDefined(onDragLeave)) {
        onDragLeave(event);
      }

      if (variableHelper.isDefined(control?.onDragLeave)) {
        control?.onDragLeave(event);
      }
    },
    [onDragLeave, control?.onDragLeave],
  );

  /**
   * It redirects event to onChange and control.onChange if they are given
   * @param event @type ChangeEvent<HTMLInputElement>
   */
  const handleOnChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (variableHelper.isDefined(onDrop)) {
        onChange(event);
      }

      if (variableHelper.isDefined(control?.onChange)) {
        control?.onChange(event);
      }
    },
    [onChange, control?.onChange],
  );

  /**
   * It triggers input's click event to upload
   */
  const handleOnClickButton = useCallback(() => {
    inputRef.current.click();
  }, [inputRef.current]);

  /**
   * It decides for the button component
   * @returns React.ReactNode
   */
  const ButtonComponent = useCallback(
    () =>
      variableHelper.isDefined(ButtonComponentParam) ? (
        <ButtonComponentParam />
      ) : (
        <button className={styles.button}>Click to Upload</button>
      ),
    [ButtonComponentParam, handleOnClickButton],
  );

  /**
   * It decides for the content component ang manage
   * styling by looking at fileInDropZone prop
   * @returns React.ReactNode
   */
  const ContentComponent = useCallback(
    () =>
      ContentComponentParam ? (
        <ContentComponentParam />
      ) : (
        <div
          className={attributeHelper.shouldMergeClassNames(
            control?.fileInDropZone,
            2,
            styles.contentContainer,
            className,
            styles.fileInDropZone,
          )}
        >
          <p className={styles.text}>Drop files here</p>
          <p className={styles.text}>or</p>
        </div>
      ),
    [ContentComponentParam, className, control?.fileInDropZone],
  );

  return (
    <div
      className={styles.container}
      onDragOver={handleOnDragOver}
      onDrop={handleOnDrop}
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
    >
      <input
        className={styles.input}
        onChange={handleOnChangeInput}
        ref={inputRef}
        multiple={multiple}
        accept={accept?.join(',')}
        type="file"
      />
      <div
        className={styles.buttonWrapper}
        onKeyDown={handleOnClickButton}
        onClick={handleOnClickButton}
        role="button"
        tabIndex={-1}
      >
        <ButtonComponent />
      </div>
      <div className={styles.contentWrapper}>
        <ContentComponent />
      </div>
    </div>
  );
};
