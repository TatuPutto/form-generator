import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

/* eslint-disable */
const RadioButtonOptionsForm = ({ input }) => {
  console.log(input);
  return (
    <div className="configure-radio-button-field">
      {/*<form onSubmit={handleSubmit}>*/}

        <Field
          name={`${input.name.toString()}.name`}
          type="text"
          placeholder="Name"
          component="input"
        />

        <Field
          name="checkedValue"
          type="text"
          placeholder="Value"
          component="input"
        />

        <Field
          name="placeholder"
          type="text"
          placeholder="Placeholder"
          component="input"
        />


    </div>
  );
};

// RadioButtonFieldConfiguration.propTypes = {
//   : PropTypes.
// };

// export default reduxForm({
//   form: 'radio-button-options'
// })(RadioButtonOptionsForm);

export default RadioButtonOptionsForm;
