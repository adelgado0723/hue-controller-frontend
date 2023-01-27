import { v4 as uuidv4 } from 'uuid';
import { variables } from '$lib/variables';
const { BE_URL } = variables;

export function serializeNonPOJOs(obj: unknown) {
  return structuredClone(obj);
}

export function generateUsername(name: string) {
  const id = uuidv4().toString();
  return `${name.slice(0, 5)}${id}`;
}

export function appendToErrorMessage(errorMessage: string, message: string) {
  if (errorMessage) {
    return errorMessage + '\n' + message;
  }
  return message;
}

export const getImageURL = (
  collectionId: string,
  recordId: string,
  fileName: string,
  size = '0x0',
) => {
  return `${BE_URL}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};
