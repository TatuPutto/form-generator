import { Text } from 'redux-form-field-components';
import {
  TEXT,
  TEXT_PLAIN,
  TEXT_SSN
} from '../types';
import {
  validateMinLength,
  validateMaxLength,
  validateSsn,
} from './validators';
import {
  normalizeSsn
} from './normalizers';


export const createGenericProps = (id) => {
  return {
    name: id,
    editing: false,
    gridClass: 'col-sm-6',
    type: undefined,
    // validate: true
  };
};

export const createTextProps = (field) => {
  return {
    ...createGenericProps(field.id),
    type: TEXT,
    subtype: TEXT_PLAIN,
    component: Text,
    name: field.name,
    label: field.label || 'Label',
    placeholder: field.placeholder || 'Placeholder',
    validate: [
      (value) => validateMinLength(value, field.minLength || 2),
      (value) => validateMaxLength(value, field.maxLength || 10),
    ]
  };
};

export const createTextSsnProps = (field) => {
  console.log('@CREATETEXTSSNPROPS', createTextSsnProps)
  return {
    ...createTextProps(field),
    subtype: TEXT_SSN,
    normalize: normalizeSsn,
    validate: validateSsn
  };
};
