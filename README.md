## React Drop Zone

Package to upload and convert files with drop zone

![npm](https://img.shields.io/npm/v/@mertsolak/react-drop-zone)
![license](https://img.shields.io/npm/l/@mertsolak/react-drop-zone)
![size](https://img.shields.io/bundlephobia/min/@mertsolak/react-drop-zone)
![issue](https://img.shields.io/github/issues/mert-solak/react-drop-zone)

## Installation

Use node package manager to install @mertsolak/react-drop-zone.

```bash
npm i @mertsolak/react-drop-zone
```

## Basic Usage

```typescript
import { DropZone, useDropZone } from '@mertsolak/react-drop-zone';

const App = () => {
  // converted files will be available in files array
  // fileInDropZone can be used to style component when any file drag over the drop zone
  // fileList is the original list that comes from event
  // control needs to be given to the component to get updated states
  // 'File' is the default value for the getFilesAs, if it is not provided
  const { files, control, fileList, totalFileSize, errors, fileInDropZone } = useDropZone({
    getFilesAs: 'base64',
  });

  // default components can be overwritten with buttonComponent
  // and contentComponent or container style can be updated via className
  return <DropZone multiple accept={['.png']} control={control} />;
};
```
