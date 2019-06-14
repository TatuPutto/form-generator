import React from 'react';
// import { Button } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import Preview from './Preview';

const Placeholder = ({ element }) => {
  // const containerClassName = classnames('form-group', element.gridClass);
  // const fieldClassName = classnames('field-preview', {
  //   'field-preview--active': element.editing,
  // });

  return (
    <Preview element={element}>
      Select field type
    </Preview>
  );
};

export default Placeholder;
