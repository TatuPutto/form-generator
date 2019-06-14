import { createSelector } from 'reselect';

export const getElements = (state) => state.builder.elements;
export const getFields = (state) => state.builder.fields;

export const getRows = createSelector(
  getElements,
  (elements) => elements.filter(element => element.type === 'ROW')
);

export const combineRowsWithFields = createSelector(
  [getRows, getFields],
  (rows, fields) => {
    return rows.map(row => ({
      ...row,
      children: fields.filter(field => field.parentId === row.id)
    }));
  }
);

export const combineElementsWithFields = createSelector(
  [getElements, getFields],
  (elements, fields) => {
    return elements.map(element => {
      if (element.type === 'ROW') {
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

export const getSelectedField = createSelector(
  getFields,
  (fields) => fields.find(field => field.selected)
);
