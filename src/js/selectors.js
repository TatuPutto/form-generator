import { createSelector } from 'reselect';

export const getElements = (state) => state.builder.elements;
export const getFields = (state) => state.builder.fields;

export const combineElementsWithFields = createSelector(
  getElements,
  getFields,
  (elements, fields) => {
    return elements.map(element => {
      if (element.type === 'ROW') {
        return {
          ...element,
          children: fields.filter(field =>  element.children.includes(field.id))
        };
      } else {
        return element;
      }
    });
  }
);
