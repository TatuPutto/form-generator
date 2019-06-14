import React from 'react';
import { connect } from 'react-redux';
import { combineRowsWithFields } from '../selectors';
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
  const totalWidthOfFields = fields.reduce((total, nextField) => total += nextField.width, 0);

  if (totalWidthOfFields < 12) {
    return false;
  } else {
    return true;
  }
};

const NewFieldButton = (props) => {
  const { initializeField, element } = props;
  // console.log('props', props);
  return (
    <div className="col-6">
      <button
        type="button"
        className="btn btn-outline-primary w-100"
        onClick={() => initializeField(props.rows, props.fields, element.id, element.parentId)}
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
    initializeField: (rows, fields, fieldId, rowId) => {

      const row = rows.find(row => row.id === rowId);
      const newRowId = newId();

      dispatch({ type: 'FIELDS/INITIALIZE', fieldId: fieldId /*fields.length - 1*/ });

      if (shouldAddInitializerFieldToCurrentRow(row)) {
        // console.log('should add to current row');
        dispatch({ type: 'CREATE_INITIALIZER_FIELD', parentId: rowId });
      }

      if (shouldAddNewRow(rows, fieldId)) {
        // console.log('should add new row');
        dispatch({ type: 'ADD_NEW_ROW', id: newRowId });
        dispatch({ type: 'CREATE_INITIALIZER_FIELD', parentId: newRowId });
      }

      // } else {
      //   dispatch({ type: 'CREATE_INITIALIZER_FIELD', parentId: lastElementId });
      // }
    }
  })
)(NewFieldButton);
