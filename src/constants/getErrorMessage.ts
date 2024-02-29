import errors from './error.json';

/**
 * Fetch the error message using the error code. error codes can be found from errors.json file
 */

interface ErrorDefinition {
  error_msg: string;
}

type Errors = Record<string, ErrorDefinition>;

export function getErrorMessage(
  errorCode: string,
  varNameArr?: string[],
): string | undefined {
  const errorMessage = (errors as Errors)[errorCode]?.error_msg;

  if (errorMessage && errorMessage.indexOf('<') !== -1) {
    let updatedErrorMessage = errorMessage;

    if (varNameArr) {
      varNameArr.forEach((val, index) => {
        updatedErrorMessage = updatedErrorMessage.replace(
          new RegExp('<' + (index + 1) + '>', 'g'),
          val,
        );
      });
    }

    return updatedErrorMessage;
  } else {
    return errorMessage;
  }
}
