import React, { ChangeEventHandler, DragEvent, DragEventHandler } from 'react';

export type Accept = string[];

export interface Control {
  onDrop?: (event: DragEvent<HTMLDivElement>, accept: Accept, multiple: boolean) => void | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onDragEnter?: DragEventHandler<HTMLDivElement> | undefined;
  onDragLeave?: DragEventHandler<HTMLDivElement> | undefined;
  fileInDropZone: boolean;
}

export interface ButtonComponentProps {
  onClick: () => void;
}

export interface ComponentProps extends Omit<Control, 'fileInDropZone'> {
  accept?: Accept | undefined;
  multiple?: boolean | undefined;
  control?: Control | undefined;
  className?: string | undefined;
  buttonClassName?: string | undefined;
  contentClassName?: string | undefined;
  buttonComponent?: React.FunctionComponent<ButtonComponentProps> | undefined;
  contentComponent?: React.FunctionComponent | undefined;
}

export type GetFilesAs = 'base64' | 'File';

export interface DropZoneHookProps {
  getFilesAs: GetFilesAs;
}

export interface DropZoneHookReturns<T extends DropZoneHookProps> {
  control: Control;
  files: (T['getFilesAs'] extends 'base64' ? string : File)[];
  fileList: FileList;
  totalFileSize: number;
  fileInDropZone: boolean;
}
