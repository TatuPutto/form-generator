import React from 'react';
import { connect } from 'react-redux';
import { combineRowsWithFields } from '../selectors';
import createGridClass from '../util/create-grid-class';
import newId from '../util/generate-id';


const shouldAddNewRow = (rows, fieldId) => {
  const lastRow = rows[rows.length - 1];
  const firstField = lastRow.children[0];
  const firstFieldIsEventTarget = firstField.id === fieldId;

  if (typeof firstField.type === 'undefined' && !firstFieldIsEventTarget) {
    return false;
  } else {
    return true;
  }
};

const shouldAddInitializerFieldToCurrentRow = (row) => {
  return !rowIsFull(row);
};

const rowIsFull = (row) => {
  const fields = row.children;
  const totalWidthOfFields = fields.reduce((total, nextField) => total += nextField.breakpoints['sm'], 0);

  if (totalWidthOfFields >= 12) {
    return true;
  } else {
    return false;
  }
};

const NewFieldButton = (props) => {
  const { initializeElement, initializeField, element } = props;
  const gridClass = element.type === 'FIELD' ?
    createGridClass(element.breakpoints): null;
  // console.log('props', props);
  // onClick={() => initializeField(props.rows, props.fields, element.id, element.parentId)}
  return (
    <div className={gridClass}>
      <button
        type="button"
        className="btn btn-outline-primary w-100"
        onClick={element.type === 'FIELD' ? () => initializeField(props.rows, element.id, element.parentId) : () => initializeElement(element.id)}
      >
        <span className="fas fa-plus" />
      </button>
    </div>
  );
};

export default connect(
  (state) => ({
    fields: state.builder.fields,
    rows: combineRowsWithFields(state)
  }),
  (dispatch) => ({
    initializeElement: (elementId, ) => {

      // has to initialize element with type of undefined (maybe row)
      dispatch({ type: 'INITIALIZE_ELEMENT', elementId });

      console.log('täällä');

      // has to create new initializer FIELD within row
      dispatch({ type: 'CREATE_INITIALIZER_FIELD', elementId: newId(), parentId: elementId });

      console.log('täällä2');

      // has to select newly initializer element
      dispatch({ type: 'SELECT_ELEMENT', elementId });

      // has to create new initializer


    },
    initializeField: (rows, fieldId, rowId) => {
      const row = rows.find(row => row.id === rowId);
      const newRowId = (rows.length + 1).toString(); /*newId(); */

      dispatch({ type: 'INITIALIZE_FIELD', fieldId });
      dispatch({ type: 'SELECT_FIELD', fieldId });

      if (shouldAddInitializerFieldToCurrentRow(row)) {
        dispatch({ type: 'CREATE_INITIALIZER_FIELD', fieldId: newId(), parentId: rowId });
      }

      if (shouldAddNewRow(rows, fieldId)) {
        dispatch({ type: 'ADD_NEW_ROW', elementId: newRowId });
        dispatch({ type: 'CREATE_INITIALIZER_FIELD', fieldId: newId(), parentId: newRowId });
      }

      // } else {
      //   dispatch({ type: 'CREATE_INITIALIZER_FIELD', parentId: lastElementId });
      // }
    }
  })
)(NewFieldButton);
