import React, { ChangeEventHandler, DragEvent, DragEventHandler } from 'react';

export type Accept = string[];

export interface Control {
  onDrop?: (event: DragEvent<HTMLDivElement>, accept: Accept, multiple: boolean) => void | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onDragEnter?: DragEventHandler<HTMLDivElement> | undefined;
  onDragLeave?: DragEventHandler<HTMLDivElement> | undefined;
  fileInDropZone: boolean;
}

export interface ComponentProps extends Omit<Control, 'fileInDropZone'> {
  fullWidth?: boolean | undefined;
  accept?: Accept | undefined;
  multiple?: boolean | undefined;
  control?: Control | undefined;
  className?: string | undefined;
  buttonComponent?: React.FunctionComponent | undefined;
  contentComponent?: React.FunctionComponent | undefined;
}

export type GetFilesAs = 'base64' | 'File';

export interface DropZoneHookProps {
  getFilesAs: GetFilesAs;
}

export interface Errors {
  invalidFormat: boolean;
}

export interface DropZoneHookReturns<T extends DropZoneHookProps> {
  control: Control;
  files: (T['getFilesAs'] extends 'base64' ? string : File)[];
  fileList: FileList;
  totalFileSize: number;
  fileInDropZone: boolean;
  reset: () => void;
  errors: Errors;
}
