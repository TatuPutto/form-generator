import { combineReducers } from 'redux';
import { update, updateActiveField, updateLastItem } from './util/immutable';
import newId from './util/generate-id';

const initialRowId = newId();
const initialFieldId = newId();

const initialElements = {
  [initialRowId]: {
    type: 'ROW',
    childrenOrder: [initialRowId],
    // children: [0]
  }
};

const initialFields = {
  [initialFieldId]: {
    parentId: initialRowId,
    selected: false,
    initialized: false,
    gridClass: 'col-sm-6',
    width: 6,
    type: undefined,
    validate: true
  }
};

const initialState = {
  elements: initialElements,
  fields: initialFields
};


const elements = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW_ROW':
      return {
        ...state,
        elements: {
          ...state.elements,
          [action.elementId]: createEmptyRow()
        }
      };
      // return state..concat([{
      //   id: action.id,
      //   type: 'ROW'
      // }]);



    //// FIELDS ////

    case 'CREATE_INITIALIZER_FIELD':
      return {
        ...state,
        elements: {
          ...state.elements,
          [action.parentId]: {
            ...state.elements[action.parentId],
            childrenOrder: state.elements[action.parentId].childrenOrder.concat([action.fieldId])
          }
        },
        fields: {
          ...state.fields,
          [action.fieldId]: createInitializerField(action.parentId)
        }
      };
    // case 'CHANGE':
    //   return updateActiveField(state, action.key, action.value);
    case 'INITIALIZE_FIELD':
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.fieldId]: {
            ...state.fields[action.fieldId],
            initialized: true
          }
        }
      };

      // return setIn(state, ['fields', action.fieldId], setIn(state, []))
      //
      // return state.map(field => {
      //   if (field.id === action.fieldId) {
      //     return {
      //       ...field,
      //       initialized: true,
      //       selected: true
      //     };
      //   } else {
      //     return {
      //       ...field,
      //       selected: false
      //     };
      //   }
      // });
    case 'SELECT_FIELD':
      return {
        ...state,
        fields: Object.keys(state.fields).map((fieldId) => {
          if (fieldId === action.fieldId) {
            return {
              ...state.fields[fieldId],
              selected: true
            };
          } else {
            return {
              ...state.fields[fieldId],
              selected: false
            };
          }
        })
      };
      // return state.map(field => {
      //   if (field.id === action.fieldId) {
      //     return {
      //       ...field,
      //       selected: true
      //     };
      //   } else {
      //     return {
      //       ...field,
      //       selected: false
      //     };
      //   }
      // });
      /* eslint-disable */
    case 'CHANGE_FIELD_WIDTH':
      // return {
      //   ...fields,
      //   [action.fieldId]: {
      //     ...fields[action.fieldId],
      //     initialized: true,
      //     selected: true
      //   }
      // };

      // function adjustRowContentWidth() {
      //
      //   const { width, direction } = action;
      //
      //
      //   const field = fields[action.id];
      //
      //
      //   const fieldWidthIncreased = width > field.width;
      //
      //   const parentRow = field.parentId;
      //   const parentRowFields = parentRow.children;
      //
      //   if (fieldWidthIncreased) {
      //
      //   }
      //
      //   function findAdjacentField() {
      //
      //     if (direction === 'LEFT' && fieldWidthIncreased) {
      //
      //       // LEFT sibling
      //       // decrease width of left sibling and increase current
      //       return fields[]
      //
      //     } else if (direction === 'LEFT' && !fieldWidthIncreased) {
      //
      //       // RIGHT sibling
      //       // increase width of right sibling and decrease current
      //
      //     } else if (direction === 'RIGHT' && fieldWidthIncreased) {
      //
      //       // RIGHT sibling
      //       // decrease width of right sibling and increase current
      //
      //
      //     } else {
      //
      //
      //       // LEFT sibling
      //       // increase width of left sibling and decrease current
      //
      //     }
      //
      //   }
      //
      // }




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

    ////////////////

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

// const initialFieldsById = {
//   [newId()]: {
//     parentId: initialElements[0].id,
//     selected: false,
//     initialized: false,
//     gridClass: 'col-sm-6',
//     width: 6,
//     type: undefined,
//     validate: true
//   }
// };
//
// const fieldsReducer = (fields = initialFieldsById, action) => {
//   switch (action.type) {
//     // case 'RESET_FIELD':
//     //   return updateActiveField(state, (field) => {
//     //     return createEmptyField(field.id);
//     //   });
//     // case 'CREATE_EMPTY_FIELD':
//     //   return state.concat(createEmptyField(state.length));
//     case 'CREATE_INITIALIZER_FIELD':
//       return {
//         ...fields,
//         [action.id]: createInitializerField(action.parentId)
//       };
//     // case 'CHANGE':
//     //   return updateActiveField(state, action.key, action.value);
//     case 'INITIALIZE_FIELD':
//       return {
//         ...fields,
//         [action.id]: {
//           ...fields[action.id],
//           initialized: true,
//           selected: true
//         }
//       };
//       //
//       // return state.map(field => {
//       //   if (field.id === action.fieldId) {
//       //     return {
//       //       ...field,
//       //       initialized: true,
//       //       selected: true
//       //     };
//       //   } else {
//       //     return {
//       //       ...field,
//       //       selected: false
//       //     };
//       //   }
//       // });
//     case 'SELECT_FIELD':
//       return {
//         ...fields,
//         [action.id]: {
//           ...fields[action.id],
//           selected: true
//         }
//       };
//       // return state.map(field => {
//       //   if (field.id === action.fieldId) {
//       //     return {
//       //       ...field,
//       //       selected: true
//       //     };
//       //   } else {
//       //     return {
//       //       ...field,
//       //       selected: false
//       //     };
//       //   }
//       // });
//       /* eslint-disable */
//     case 'CHANGE_FIELD_WIDTH':
//       // return {
//       //   ...fields,
//       //   [action.fieldId]: {
//       //     ...fields[action.fieldId],
//       //     initialized: true,
//       //     selected: true
//       //   }
//       // };
//
//       function adjustRowContentWidth() {
//
//         const { width, direction } = action;
//
//
//         const field = fields[action.id];
//
//
//         const fieldWidthIncreased = width > field.width;
//
//         const parentRow = field.parentId;
//         const parentRowFields = parentRow.children;
//
//         if (fieldWidthIncreased) {
//
//         }
//
//         function findAdjacentField() {
//
//           if (direction === 'LEFT' && fieldWidthIncreased) {
//
//             // LEFT sibling
//             // decrease width of left sibling and increase current
//             return fields[]
//
//           } else if (direction === 'LEFT' && !fieldWidthIncreased) {
//
//             // RIGHT sibling
//             // increase width of right sibling and decrease current
//
//           } else if (direction === 'RIGHT' && fieldWidthIncreased) {
//
//             // RIGHT sibling
//             // decrease width of right sibling and increase current
//
//
//           } else {
//
//
//             // LEFT sibling
//             // increase width of left sibling and decrease current
//
//           }
//
//         }
//
//       }
//
//
//
//
//     case 'EDIT':
//       return state.map(field => {
//         if (field.id === action.fieldId) {
//           return {
//             ...field,
//             editing: true,
//             type: field.type ? field.type : 'PENDING'
//           };
//         } else {
//           return {
//             ...field,
//             editing: false,
//             type: field.type === 'PENDING' ? undefined : field.type
//           };
//         }
//       });
//     case 'SET_FIELD_TYPE_TEXT':
//       return updateActiveField(state, (field) => {
//         return {
//           ...field,
//           type: 'TEXT',
//           subtype: 'PLAIN'
//         };
//       });
//     case 'SET_FIELD_SUBTYPE':
//       return updateActiveField(state, (field) => {
//         return {
//           ...field,
//           subtype: action.subtype
//         };
//       });
//     default:
//       return state;
//   }
// };

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



export default combineReducers({ content: elements, /* rows, */ /*fields: fieldsReducer,*/ config });


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

const createEmptyRow = () => {
  return {
    type: 'ROW',
    childrenOrder: []
  }
}
