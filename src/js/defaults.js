import {
  TEXT,
  TEXT_PLAIN,
  TEXT_SSN
} from './types';
import {
  validateSsn
} from './util/validators';
import {
  normalizeSsn
} from './util/normalizers';


export const generic = (id) => {
  return {
    id: id,
    editing: false,
    gridClass: 'col-sm-6',
    type: undefined,
    validate: true
  };
};

export const text = (field) => {
  return {
    ...generic(field.id),
    type: TEXT,
    subtype: TEXT_PLAIN,
    component: Text,
    name: field.name,
    label: field.label || 'Label',
    placeholder: field.placeholder || 'Placeholder',
    validation: {
      minLength: 2,
      maxLength: 100
    }
  };
};

export const textSsn = (field) => {
  return {
    ...text(field),
    subtype: TEXT_SSN,
    normalize: normalizeSsn,
    validation: validateSsn
  };
};
