export const mergeClassNames = (...classNames: (string | undefined)[]): string => classNames.join(' ');

export const shouldMergeClassNames = (
  shouldMerge: boolean,
  defaultMergeNumber: number,
  ...classNames: string[]
) =>
  shouldMerge
    ? classNames.join(' ')
    : classNames.filter((...params) => params[1] <= defaultMergeNumber - 1).join(' ');
