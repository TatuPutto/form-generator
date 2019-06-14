import isValidFinnishSsn from 'validate-finnish-ssn';

export const validateMinLength = (value, minLength) => {
  const error = `Minimum length is ${minLength} characters.`;
  return value && value.length < minLength ? error : undefined;
};

export const validateMaxLength = (value, maxLength) => {
  const error = `Max length is ${maxLength} characters`;
  return value && value.length > maxLength ? error : undefined;
};

export const validateSsn = (value) => {
  const error = 'Invalid SSN';
  return !isValidFinnishSsn(value) && value.length === 11 ? error : undefined;
};
