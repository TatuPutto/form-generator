import React from 'react';
import { connect } from 'react-redux';
import BuildComponent from './BuildComponent';

const BuildRow = ({ element, fields }) => {
  console.log(fields);
  const { id, children } = element;

  
  return <div key={`row-${id}`} className="row">
    {children.map(child => {
      const field = fields.find(field => field.id === child);
      console.log('FIELD', field)

      return (
        <BuildComponent
          key={`field-${child.id}`}
          element={child}
        />
      );
    })}
  </div>
};

export default connect(state => ({
  fields: state.builder.fields
}))(BuildRow);
