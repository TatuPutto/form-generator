import { combineReducers } from 'redux';
import { update } from './util/immutable-array-utils';

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
    width: 6,
    type: undefined
  },
  {
    id: 1,
    rowId: 1,
    editing: false,
    width: 6,
    type: undefined
  }
];

const fields = (state = initialFields, action) => {
  switch (action.type) {
    case 'CREATE':
      return state.concat(createEmptyField(state.length));
    case 'EDIT':
    console.log('@EDIT:', action);
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
            editing: false
          };
        }
      });
    default:
      return state;
  }
};

export default combineReducers({ elements, rows, fields });


////

const createEmptyField = (id) => {
  return {
    id: id,
    editing: true,
    width: 6,
    type: 'PENDING'
  };
};

// return update(fields, action.fieldId, )
