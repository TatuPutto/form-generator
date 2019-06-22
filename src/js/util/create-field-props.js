// import { Text } from 'redux-form-field-components';
import React from 'react';

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
  console.log('createTextProps', {
    ...createGenericProps(field.id),
    fieldType: TEXT,
    fieldSubtype: TEXT_PLAIN,
    component: <input type="text" />,
    name: field.name,
    label: field.label || 'Label',
    placeholder: field.placeholder || 'Placeholder',
    validate: [
      (value) => validateMinLength(value, field.minLength || 2),
      (value) => validateMaxLength(value, field.maxLength || 10),
    ]
  });
  return {
    ...createGenericProps(field.id),
    fieldType: TEXT,
    fieldSubtype: TEXT_PLAIN,
    component: <input type="text" />,
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
  console.log('@CREATETEXTSSNPROPS', createTextSsnProps);
  return {
    ...createTextProps(field),
    fieldSubtype: TEXT_SSN,
    normalize: normalizeSsn,
    validate: validateSsn
  };
};
