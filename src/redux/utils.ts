export const isThunkPayload = <T>(
  payload: T | string | null | undefined,
): payload is T => !!payload && typeof payload !== 'string';
