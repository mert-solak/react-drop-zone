import { variableHelper } from '../helpers';
import { acceptConfig } from '../configs';
import { Accept } from '../definitions';

/**
 * it extends accept array for .jpeg, .jpg etc
 * @param acceptArray @type Accept
 * @returns Accept | undefined
 */
export const extend = (acceptArray: Accept | undefined): Accept | undefined => {
  if (!variableHelper.isDefined(acceptArray)) {
    return undefined;
  }

  const extendedAcceptArray: Accept = [];

  acceptArray.forEach((accept) => {
    if (variableHelper.isDefined(acceptConfig.extensions[accept])) {
      extendedAcceptArray.push(acceptConfig.extensions[accept]);
    }

    extendedAcceptArray.push(accept);
  });

  return extendedAcceptArray;
};
