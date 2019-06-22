import React from 'react';
import Field from './Field';
import withPreview from './Preview';

const Row = ({ element }) => {
  // console.log(fields);
  return (
    <div key={`row-${element.id}`} className="row">
      {element.children.map(child => {
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

// export default Row;
export default withPreview(Row);
