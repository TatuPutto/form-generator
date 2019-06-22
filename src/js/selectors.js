import { createSelector } from 'reselect';
import get from 'lodash/get';
import { arrayFrom } from './util/immutable';
import { ROW, FIELD } from './types';

export const getContent = (state) => get(state, ['builder', 'content']);

export const getElementsAsArray = createSelector(
  getContent,
  (content) => arrayFrom(get(content, 'elements'))
);

// export const getFieldsAsArray = createSelector(
//   getContent,
//   (content) => arrayFrom(get(content, 'fields'))
// );

export const getStructuralElementsAsArray = createSelector(
  getElementsAsArray,
  (elements) => elements.filter(element => element.type !== FIELD)
);

export const getFieldsAsArray = createSelector(
  getElementsAsArray,
  (elements) => elements.filter(element => element.type === FIELD)
);

export const getRowsAsArray = createSelector(
  getElementsAsArray,
  (elements) => elements.filter(element => element.type === ROW)
);

export const combineRowsWithFields = createSelector(
  [getRowsAsArray, getFieldsAsArray],
  (rows, fields) => {
    return rows.map(row => ({
      ...row,
      children: fields.filter(field => field.parentId === row.id)
    }));
  }
);

export const combineElementsWithChildren = createSelector(
  [getStructuralElementsAsArray, getFieldsAsArray],
  (elements, fields) => {
    return elements.map(element => {
      if (element.type === ROW) {
        return {
          ...element,
          children: fields.filter(field => field.parentId === element.id)
        };
      } else {
        return element;
      }
    });
  }
);

export const getSelectedElement = createSelector(
  getElementsAsArray,
  (elements) => elements.find(element => element.selected)
);

export const getSelectedField = createSelector(
  getFieldsAsArray,
  (fields) => fields.find(field => field.selected)
);
