export const anySymbolRegex = /^[\s\S]*$/;

export const emailRegex =
  /^([a-z0-9!#$%&'*+/=?^_`{|}~-]){1,50}(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)[a-z0-9](?:[a-z0-9-.]*[a-z0-9])?$/i;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
export const digitsOnlyRegex = /^[0-9+]*$/;
