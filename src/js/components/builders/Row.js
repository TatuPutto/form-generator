import React from 'react';
import { connect } from 'react-redux';
import Field from './Field';

const Row = ({ element }) => {
  // console.log(fields);
  return (
    <div key={`row-${element.id}`} className="row">
      {element.children.map(child => {
        // const field = fields.find(field => field.id === child);
        // console.log('FIELD', field)

        return (
          <Field
            key={`field-${child.id}`}
            element={child}
          />
        );
      })}
    </div>
  );
};

// export default connect(state => ({
//   fields: state.builder.fields
// }))(Row);

export default Row;
