import { combineReducers } from 'redux';
import { update, updateActiveField, updateLastItem } from './util/immutable-array-utils';
import newId from './util/generate-id';

const initialElements = [{
  id: newId(),
  type: 'ROW',
  // children: [0]
}];

const elements = (state = initialElements, action) => {
  switch (action.type) {
    case 'ADD_NEW_ROW':
      return state.concat([{
        id: action.id,
        type: 'ROW'
      }]);
    default:
      return state;
  }
};

// const initialRows = [{
//   id: 0,
//   fields: [0]
// }];
//
// const rows = (state = initialRows, action) => {
//   switch (action.type) {
//     case 'ADD_ROW':
//       console.log('add');
//       return state.concat([{
//         id: action.rowId,
//         type: 'ROW',
//         fields: [action.fieldId]
//       }]);
//     // case 'EDIT':
//     //   return state.map(field => ({
//     //     ...field,
//     //     editing: field.id === action.fieldId ? true : false
//     //   }));
//     default:
//       return state;
//   }
// };

const initialFieldsById = {
  [newId()]: {
    parentId: initialElements[0].id,
    selected: false,
    initialized: false,
    gridClass: 'col-sm-6',
    width: 6,
    type: undefined,
    validate: true
  }
};

const fields = (state = initialFieldsById, action) => {
  switch (action.type) {
    case 'RESET_FIELD':
      return updateActiveField(state, (field) => {
        return createEmptyField(field.id);
      });
    case 'CREATE_EMPTY_FIELD':
      return state.concat(createEmptyField(state.length));
    case 'CREATE_INITIALIZER_FIELD':
      return state.concat(createInitializerField(action.parentId));
    case 'CHANGE':
      return updateActiveField(state, action.key, action.value);
    case 'FIELDS/INITIALIZE':
      return state.map(field => {
        if (field.id === action.fieldId) {
          return {
            ...field,
            initialized: true,
            selected: true
          };
        } else {
          return {
            ...field,
            selected: false
          };
        }
      });
    case 'FIELDS/SELECT':
      return state.map(field => {
        if (field.id === action.fieldId) {
          return {
            ...field,
            selected: true
          };
        } else {
          return {
            ...field,
            selected: false
          };
        }
      });

    case 'CHANGE_FIELD_WIDTH':

      function adjustRowContentWidth()


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



export default combineReducers({ elements, /* rows, */ fields, config });


////

const createEmptyField = (id, parentId) => {
  return {
    id: id,
    parentId: parentId,
    initialized: true,
    editing: true,
    gridClass: 'col-sm-6',
    width: 6,
    type: 'PENDING'
  };
};

const createInitializerField = (parentId) => {
  return {
    // id: newId(),
    parentId: parentId,
    editing: false,
    type: undefined,
    gridClass: 'col-sm-6',
    width: 6
    // width: {
    //
    // },
  };
};
