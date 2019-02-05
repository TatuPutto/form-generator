import React from 'react';
import { connect } from 'react-redux';

// onClick={() => this.editField(item.id, 'editing', true)}

const NewFieldButton = (props) => {
  const { edit, element } = props;
  console.log('@NewFieldButton', element);
  // const field = fields.find(field => field.id === element);
  return <div className="col-6">
    <button
      type="button"
      className="btn btn-outline-primary w-100"
      onClick={() => edit(element.id, element.rowId)}
    >
      <span className="fas fa-plus" />
    </button>
  </div>
};

export default connect(
  (state) => ({
    // fields: state.builder.fields
  }),
  (dispatch) => ({
    edit: (fieldId, rowId) => dispatch({ type: 'EDIT', fieldId, rowId })
  })
)(NewFieldButton);
