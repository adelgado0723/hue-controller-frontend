const { randomBytes } = await import('node:crypto');
export function serializeNonPOJOs(obj: unknown) {
  return structuredClone(obj);
}

export function generateUsername(name: string) {
  const id = randomBytes(2).toString('hex');
  return `${name.slice(0, 5)}${id}`;
}

export function appendToErrorMessage(errorMessage: string, message: string) {
  if (errorMessage) {
    return (errorMessage + '\n' + message);
  }
  return message;
}
