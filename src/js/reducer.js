import { combineReducers } from 'redux';
import { get } from 'lodash';
import {
  set,
  push,
  arrayFrom,
  objectFrom,
  update,
  updateActiveField,
  updateLastItem
} from './util/immutable';
import newId from './util/generate-id';
import { getColWidth, getFieldMinWidth } from './util/field-helpers';

const initialRowId = '1' /* newId(); */
const initialFieldId = newId();
const initialInitializerId = newId();

const initialField = {
  parentId: initialRowId,
  type: 'FIELD',
  selected: false,
  initialized: false,
  gridClass: 'col-lg-4 col-md-6 col-xs-12',
  breakpoints: {
    lg: 3,
    md: 4,
    sm: 6,
    xs: 12
  },
  validate: true
};

const initialElements = {
  // [initialRowId]: {
  //   type: 'ROW'
  // },
  // [initialFieldId]: {
  //   parentId: initialRowId,
  //   editing: false,
  //   type: 'FIELD',
  //   fieldType: 'INITIALIZER',
  //   breakpoints: {
  //     lg: 3,
  //     md: 4,
  //     sm: 6,
  //     xs: 12
  //   },
  // },
  [initialInitializerId]: {
    type: 'INITIALIZER'
  }
  // [initialRowId]: {
  //   type: 'ROW'
  // },
  // [initialFieldId]: initialField
};

const initialElementOrder = [
  // initialRowId,
  initialInitializerId
];

const initialFieldOrder = {
  [initialRowId]: [initialFieldId]
};


const initialState = {
  elements: initialElements,
  // fields: initialFields,
  elementOrder: initialElementOrder,
  fieldOrder: []
};


const actionsMap = (state, action) => {

  const actions = {
    ['ADD_NEW_ROW']: () => {
      return {
        ...state,
        elements: {
          ...state.elements,
          [action.elementId]: createEmptyRow()
        },
        fieldOrder: {
          ...state.fieldOrder,
          [action.elementId]: []
        }
      };
    },

    // ['CREATE_INITIALIZER_FIELD']: () => {
    //   return {
    //     ...state,
    //     fieldOrder: {
    //       ...state.fieldOrder,
    //       [action.parentId]: push(state.fieldOrder[action.parentId], action.fieldId)
    //     },
    //     elements: {
    //       ...state.elements,
    //       [action.fieldId]: createInitializerField(action.parentId)
    //     }
    //     // fields: {
    //     //   ...state.fields,
    //     //   [action.fieldId]: createInitializerField(action.parentId)
    //     // }
    //   };
    // },

    ['CREATE_INITIALIZER_FIELD']: () => {
      return {
        ...state,
        fieldOrder: {
          ...state.fieldOrder,
          [action.parentId]: push(state.fieldOrder[action.parentId], action.elementId)
        },
        elements: {
          ...state.elements,
          [action.elementId]: createInitializerField(action.parentId)
        }
        // fields: {
        //   ...state.fields,
        //   [action.fieldId]: createInitializerField(action.parentId)
        // }
      };
    },

    ['INITIALIZE_ELEMENT']: () => {
      return {
        ...state,
        elements: {
          ...state.elements,
          [action.elementId]: {
            ...state.elements[action.elementId],
            initialized: true,
            type: 'ROW'
          }
        },
        fieldOrder: {
          ...state.fieldOrder,
          [action.elementId]: []
        }
      };
      // return setElement(action.elementId, {
      //   ...state.elements[action.elementId],
      //   initialized: true,
      //   type: 'ROW'
      // });
    },

    ['SELECT_ELEMENT']: () => {
      return togglePropValueForOtherElements(action.elementId, 'selected', true);
    },

    ['INITIALIZE_FIELD']: () => {
      // return setFieldProp(action.fieldId, 'initialized', true);
      return setElement(action.fieldId, {
        ...state.elements[action.fieldId],
        initialized: true,
        type: 'FIELD',
        fieldType: 'TEXT'
      });
    },
    ['SELECT_FIELD']: () => {
      // return togglePropValueForOtherFields(action.fieldId, 'selected', true);
      return togglePropValueForOtherFields(action.fieldId, 'selected', true);
    },
    ['START_RESIZE']: () => {
      const field = getField(action.fieldId);
      const rowFieldIds = state.fieldOrder[field.parentId];

      return {
        ...state,
        fields: Object.keys(state.fields).reduce((updatedFields, nextFieldId) => {

          const field = state.fields[nextFieldId];

          if (rowFieldIds.includes(nextFieldId)) {

            const width = field.breakpoints['sm'];
            const containerWidth = document.getElementById('form-preview').offsetWidth;
            const colWidth = containerWidth / 12;
            const originalWidth = colWidth * width;

            return {
              ...updatedFields,
              [nextFieldId]: {
                ...field,
                resizing: true,
                resizeDirection: action.direction,
                originalWidth: originalWidth,
                temporaryWidth: originalWidth,
              }
            };

          } else {
            return {
              ...updatedFields,
              [nextFieldId]: field
            };

          }

        }, {})
      };





      // return setPropValueForFields(rowFieldIds, 'resizing', true);
    },
    ['SET_TEMPORARY_WIDTH']: () => {
      const field = getField(action.fieldId);
      // const fieldResizeArgs = field.resizeArgs;
      // const { temporaryWidth, originalWidth } = field.resizeArgs;

      // Target field width after the change

      const colWidth = getColWidth();
      const minWidth = getFieldMinWidth();


      const fieldWidth = field.temporaryWidth || getWidthForCurrentBreakpoint(field.breakpoints);

      if (fieldWidth <= minWidth) {
        return state;
      }

      // const fieldWidth = fieldTemporaryWidth || getWidthForCurrentBreakpoint(field.breakpoints);
      const widthChange = Math.abs(action.width - field.originalWidth);

      // console.log('widthChange: ', widthChange);
      // console.log('action.direction: ', action.direction);

      const widthIncreased = action.width > field.temporaryWidth;

      // const adjacentFieldId = findAdjacentFieldId(field, action.direction);
      const fieldOrderForRow = state.fieldOrder[field.parentId];

      const fieldIndex = fieldOrderForRow.findIndex(fieldId => fieldId === action.fieldId);
      const adjacentFieldIndex = field.resizeDirection === 'RIGHT' ? fieldIndex + 1 : fieldIndex - 1;
      const adjacentFieldId = fieldOrderForRow[adjacentFieldIndex];

      const adjacentField = getField(adjacentFieldId);

      // console.log('adjacentFieldHasRoomToGrow()', adjacentFieldHasRoomToGrow());

      if (!widthIncreased || adjacentFieldHasRoomToGrow()) {
        return setFieldProp(action.fieldId, 'temporaryWidth', action.width);
      } else {
        // console.log('täällä');
        return {
          ...state,
          fields: Object.keys(state.fields).reduce((updatedFields, nextFieldId) => {
            const field = state.fields[nextFieldId];
            if (nextFieldId === adjacentFieldId) {
              console.log('found adjacent element ', widthChange);
              return {
                ...updatedFields,
                [nextFieldId]: {
                  ...field,
                  temporaryWidth: field.originalWidth - widthChange
                }
              };
            } else if (nextFieldId === action.fieldId) {
              return {
                ...updatedFields,
                [nextFieldId]: {
                  ...field,
                  temporaryWidth: action.width
                }
              };
            } else {
              return {
                ...updatedFields,
                [nextFieldId]: field
              };
            }
          }, {})
        }
      }

      // has to decrease adjacent element size



      function adjacentFieldHasRoomToGrow() {

        // const containerWidth = document.getElementById('form-preview').offsetWidth;
        // const colWidth = containerWidth / 12;

        const amountOfColsOccupiedByCurrentFieldAfterResize = Math.round(action.width / colWidth);
        // console.log('@amountOfColsOccupiedByCurrentFieldAfterResize', amountOfColsOccupiedByCurrentFieldAfterResize);

        const fieldIds = state.fieldOrder[field.parentId];

        const rowTotalWidth = fieldIds.reduce((total, nextFieldId) => {

          if (nextFieldId !== action.fieldId) {

            const field = getField(nextFieldId);
            const fieldWidth = field.breakpoints['sm'];
            // console.log('FIELDWIDTH', fieldWidth)
            return total += fieldWidth;

          } else {
            return total;
          }

        }, amountOfColsOccupiedByCurrentFieldAfterResize);

        // console.log('rowTotalWidth: ', rowTotalWidth);

        return rowTotalWidth < 12;
      }

      // const rowFieldIds = state.fieldOrder[field.parentId];
      // const adjacentFieldId = findAdjacentFieldId(action.field, action.direction, widthIncreased);
      // const adjacentField = getField(adjacentFieldId);

      return setFieldProp(action.fieldId, 'temporaryWidth', action.width);

      // return setPropValueForFields(rowFieldIds, 'resizing', true);
    },
    ['SAVE_RESIZE']: () => {
      const field = getField(action.fieldId);
      const fieldWidth = field.temporaryWidth;
      // console.log('FIELDWIDTH', fieldWidth)
      const containerWidth = document.getElementById('form-preview').offsetWidth;
      const colWidth = containerWidth / 12;
      // console.log('COLWIDTH', colWidth) // 62

      const closestColWidth = Math.round(fieldWidth / colWidth);
      const fieldBreakpoints = createBreakpoints(closestColWidth);
      // console.log('FIELDBREAKPOINTS', fieldBreakpoints)

      const updatedFields = Object.keys(state.fields).reduce((updatedFields, nextFieldId) => {
        if (nextFieldId === action.fieldId) {
          // console.log('found resize stop target', {
          //   ...state.fields[nextFieldId],
          //   resizing: false,
          //   temporaryWidth: null,
          //   breakpoints: fieldBreakpoints
          // });
          return {
            ...updatedFields,
            [nextFieldId]: {
              ...state.fields[nextFieldId],
              resizing: false,
              temporaryWidth: null,
              breakpoints: fieldBreakpoints
            }
          };
        } else {
          return {
            ...updatedFields,
            [nextFieldId]: {
              ...state.fields[nextFieldId],
              resizing: false,
              temporaryWidth: null
            }
          };
        }
      }, {});

      return {
        ...state,
        fields: updatedFields
      };


      // let newState = setFieldProp(action.fieldId, 'breakpoints', fieldBreakpoints);
      // newState = setPropValueForAllFields('resizing', false)
      // console.log('newState', newState);
      // return newState;
    },
    ['CHANGE_FIELD_WIDTH']: () => {
      const currentBreakpoint = 'sm';

      const { direction } = action;
      const field = getField(action.fieldId);
      const fieldWidth = getWidthForCurrentBreakpoint(field.breakpoints);
      const widthChange = Math.abs(action.width - fieldWidth);
      const widthIncreased = action.width > fieldWidth;
      // const parentRow = getElement(field.parentId);
      const fieldBreakpoints = {
        ...field.breakpoints,
        [currentBreakpoint]: widthIncreased ? fieldWidth + widthChange : fieldWidth - widthChange
      };

      const adjacentFieldId = findAdjacentFieldId(field, direction, widthIncreased);
      const adjacentField = getField(adjacentFieldId.toString());
      const adjacentFieldWidth = getWidthForCurrentBreakpoint(adjacentField.breakpoints);
      const adjacentFieldBreakpoints = {
        ...adjacentField.breakpoints,
        [currentBreakpoint]: widthIncreased ? adjacentFieldWidth - widthChange : adjacentFieldWidth + widthChange
      };


      return {
        ...state,
        fields: {
          ...state.fields,
          [action.fieldId]: {
            ...field,
            breakpoints: fieldBreakpoints
          },
          [adjacentFieldId]: {
            ...state.fields[adjacentFieldId],
            breakpoints: adjacentFieldBreakpoints
          }
        }
      }
    }
  }

  const reduceFn = actions[action.type];

  if (!reduceFn) return state;
  return reduceFn()
    // case 'EDIT':
    //   return state.map(field => {
    //     if (field.id === action.fieldId) {
    //       return {
    //         ...field,
    //         editing: true,
    //         type: field.type ? field.type : 'PENDING'
    //       };
    //     } else {
    //       return {
    //         ...field,
    //         editing: false,
    //         type: field.type === 'PENDING' ? undefined : field.type
    //       };
    //     }
    //   });
    // case 'SET_FIELD_TYPE_TEXT':
    //   return updateActiveField(state, (field) => {
    //     return {
    //       ...field,
    //       type: 'TEXT',
    //       subtype: 'PLAIN'
    //     };
    //   });
    // case 'SET_FIELD_SUBTYPE':
    //   return updateActiveField(state, (field) => {
    //     return {
    //       ...field,
    //       subtype: action.subtype
    //     };
    //   });

    ////////////////


  ////

  function findAdjacentFieldId(field, direction, widthIncreased) {

    const fieldOrderForRow = state.fieldOrder[field.parentId];
    const index = fieldOrderForRow.findIndex(fieldId => fieldId === action.fieldId);

    if (direction === 'LEFT' && widthIncreased) {
      console.log('dir left and widthIncreased');
      // LEFT sibling
      // decrease width of left sibling and increase current
      return fieldOrderForRow[index - 1];

    } else if (direction === 'LEFT' && !widthIncreased) {

      // RIGHT sibling
      // increase width of right sibling and decrease current
      return fieldOrderForRow[index + 1];

    } else if (direction === 'RIGHT' && widthIncreased) {

      // RIGHT sibling
      // decrease width of right sibling and increase current
      return fieldOrderForRow[index - 1];

    } else {

      // LEFT sibling
      // increase width of left sibling and decrease current
      return fieldOrderForRow[index + 1];

    }

  }



  function getElement(id) {
    return get(state, ['elements', id]);
  }

  function getElementProp(id, prop) {
    return get(getElement(id), prop);
  }

  function setElement(path, value) {
    return set(state, ['elements', ...path], value);
  }

  function setElementProp(path, prop, value) {
    if (Array.isArray(path)) {
      return set(state, ['elements', ...path], set(getElement(path), prop, value));
    } else {
      return set(state, ['elements', path], value);
    }
  }

  function getField(id) {
    return get(state, ['fields', id]);
  }

  function getFieldProp(id, prop) {
    return get(getField(id), prop);
  }

  function setField(path, value) {
    return set({ ...state }, ['elements', path], value);
  }

  function setFieldProp(path, prop, value) {
    if (Array.isArray(path)) {
      return set({ ...state }, ['fields', ...path], set({ ...getField(path) }, prop, value));
    } else {
      return set({ ...state, }, ['fields', path], set({ ...getField(path) }, prop, value));
    }
  }

  function setPropValueForFields(fieldIds, prop, value) {
    const updatedFields = Object.keys(state.fields).reduce((fields, fieldId) => {
      const field = state.fields[fieldId];

      if (fieldIds.includes(fieldId)) {
        return {
          ...fields,
          [fieldId]: {
            ...field,
            [prop]: value
          }
        };
      } else {
        return {
          ...fields,
          [fieldId]: field
        };
      }
    }, {});

    return set(state, 'fields', updatedFields);
  }

  function setPropValueForAllFields(prop, value) {
    const updatedFields = Object.keys(state.fields).reduce((fields, fieldId) => {
      const field = state.fields[fieldId];
      return {
        ...fields,
        [fieldId]: {
          ...field,
          [prop]: value
        }
      };
    }, {});

    return set(state, 'fields', updatedFields);
  }

  function togglePropValueForOtherElements(targetElementIds, prop, value) {
    targetElementIds = Array.isArray(targetElementIds) ? targetElementIds : [targetElementIds];

    const updatedElements = Object.keys(state.elements).reduce((elements, elementId) => {
      const element = state.elements[elementId];
      if (targetElementIds.includes(elementId)) {
        return {
          ...elements,
          [elementId]: {
            ...element,
            [prop]: value
          }
        };
      } else {
        return {
          ...elements,
          [elementId]: {
            ...element,
            [prop]: !value
          }
        };
      }
    }, {});

    return set(state, 'elements', updatedElements);
  }

  function togglePropValueForOtherFields(targetFieldIds, prop, value) {
    targetFieldIds = Array.isArray(targetFieldIds) ? targetFieldIds : [targetFieldIds];
    const updatedFields = Object.keys(state.elements).reduce((fields, fieldId) => {
      const element = state.elements[fieldId];
      if (targetFieldIds.includes(fieldId)) {
        return {
          ...fields,
          [fieldId]: {
            ...element,
            [prop]: value
          }
        };
      } else if (element.type === 'FIELD') {
        return {
          ...fields,
          [fieldId]: {
            ...element,
            [prop]: !value
          }
        };
      } else {
        return fields;
      }
    }, {});

    return set(state, 'fields', updatedFields);
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


const contentReducer = (state = initialState, action) => actionsMap(state, action);

export default combineReducers({ content: contentReducer, /* rows, */ /*fields: fieldsReducer,*/ config });


////

const createEmptyField = (id, parentId) => {
  return {
    id: id,
    parentId: parentId,
    initialized: true,
    editing: true,
    gridClass: 'col-lg-4 col-sm-6 col-xs-12',
    breakpoints: createBreakpoints(),
    type: 'FIELD',
    fieldType: undefined
  };
};

const createInitializerField = (parentId) => {
  return {
    // id: newId(),
    parentId: parentId,
    editing: false,
    // type: 'INITIALIZER',
    type: 'FIELD',
    fieldType: 'INITIALIZER',
    // gridClass: 'col-lg-4 col-md-6 col-xs-12',
    breakpoints: createBreakpoints()
    // width: {
    //
    // },
  };
};

const createInitializer = (id) => {
  return {
    // id: newId(),
    id,
    // editing: false,
    type: 'INITIALIZER',
    // type: 'FIELD',
    // fieldType: 'INITIALIZER',
    // gridClass: 'col-lg-4 col-md-6 col-xs-12',
    // breakpoints: createBreakpoints()
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

const createBreakpoints = (width) => {
  return {
    lg: width && isCurrentBreakpoint('lg') ? width : 3,
    md: width && isCurrentBreakpoint('md') ? width : 4,
    sm: width && isCurrentBreakpoint('sm') ? width : 6,
    xs: width && isCurrentBreakpoint('xs') ? width : 12,
  };
};

const isCurrentBreakpoint = (breakpoint) => {
  const currentBreakpoint = 'sm';
  return breakpoint === currentBreakpoint;
};


const updateGridClass = (gridClass, breakpoint, width) => {
  const gridClassBreakpoints = gridClass.split(' '); // ['col-lg-x', 'col-md-x', ...]
  return gridClassBreakpoints.reduce((newGridClass, nextBreakpoint) => {
    if (nextBreakpoint.includes(breakpoint)) { // 'col-lg-x'.includes('lg')
      return newGridClass += ` ${createGridClassBreakpoint(breakpoint, width)}`
    } else {
      return newGridClass += ` ${nextBreakpoint}`;
    }
  }, '');
}

const createGridClassBreakpoint = (breakpoint, width) => {
  return `col-${breakpoint}-${width}`;
}

const getWidthForCurrentBreakpoint = (breakpoints) => {
  const currentBreakpoint = 'sm';
  return breakpoints[currentBreakpoint];
}
