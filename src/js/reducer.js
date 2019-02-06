import { combineReducers } from 'redux';
import { update, updateActiveField } from './util/immutable-array-utils';

const initialElements = [{
  id: 0,
  type: 'ROW',
  children: [0, 1]
}];

const elements = (state = initialElements, action) => {
  switch (action.type) {
    case 'ADD':
      return state.map(field => ({
        ...field,
        editing: field.id === action.fieldId ? true : false
      }));
    default:
      return state;
  }
};

const initialRows = [{
  id: 0,
  fields: [0, 1]
}];

const rows = (state = initialRows, action) => {
  switch (action.type) {
    // case 'EDIT':
    //   return state.map(field => ({
    //     ...field,
    //     editing: field.id === action.fieldId ? true : false
    //   }));
    default:
      return state;
  }
};

const initialFields = [
  {
    id: 0,
    rowId: 1,
    editing: false,
    gridClass: 'col-sm-6',
    type: undefined,
    validate: true
  },
  {
    id: 1,
    rowId: 1,
    editing: false,
    gridClass: 'col-sm-6',
    type: undefined,
    validate: true
  }
];

const fields = (state = initialFields, action) => {
  switch (action.type) {
    case 'RESET_FIELD':
      return updateActiveField(state, (field) => {
        return createEmptyField(field.id);
      });
    case 'CREATE':
      return state.concat(createEmptyField(state.length));
    case 'CHANGE':
      return updateActiveField(state, action.key, action.value);
    case 'EDIT':
      return state.map(field => {
        if (field.id === action.fieldId) {
          return {
            ...field,
            editing: true,
            type: field.type ? field.type : 'PENDING'
          };
        } else {
          return {
            ...field,
            editing: false,
            type: field.type === 'PENDING' ? undefined : field.type
          };
        }
      });
    case 'SET_FIELD_TYPE_TEXT':
      return updateActiveField(state, (field) => {
        return {
          ...field,
          type: 'TEXT',
          subtype: 'PLAIN'
        };
      });
    case 'SET_FIELD_SUBTYPE':
      return updateActiveField(state, (field) => {
        return {
          ...field,
          subtype: action.subtype
        };
      });
    default:
      return state;
  }
};

const initialConfig = {
  subtypeOptionsVisible: true
};

const config = (state = initialConfig, action) => {
  switch (action.type) {
    case 'TOGGLE_SUBTYPE_OPTIONS':
    case 'SET_FIELD_SUBTYPE':
      return {
        ...state,
        subtypeOptionsVisible: !state.subtypeOptionsVisible
      };
    default:
      return state;
  }
};



export default combineReducers({ elements, rows, fields, config });


////

const createEmptyField = (id) => {
  return {
    id: id,
    editing: true,
    gridClass: 'col-sm-6',
    type: 'PENDING',
    validate: true
  };
};

// return update(fields, action.fieldId, )
