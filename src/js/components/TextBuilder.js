import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import classnames from 'classnames';
import isValidSsn from 'validate-finnish-ssn';
import { Text } from 'redux-form-field-components';

class TextBuilder extends PureComponent {
  createFieldProps = () => {
    const { element } = this.props;
    // console.log(element);
    let fieldProps = {
      component: Text,
      name: element.name || element.id,
      label: element.label || 'Label',
      placeholder: element.placeholder || 'Placeholder'
    };

    if (element.validate) {
      fieldProps.validate = this.getValidator();
    }

    return fieldProps;
  }

  getValidator = () => {
    const element = this.props.element;
    switch (element.subtype) {
      case 'SSN':
        return (value) => {
          // console.log('@VALIDATE', value);
          // console.log('is vlaid: ', isValidSsn(value));
          // console.log('validation result: ', (!value || value.length < 11 || isValidSsn(value)) ? undefined : 'Invalid SSN.');
          return (!value || value.length < 11 || isValidSsn(value)) ? undefined : 'Invalid SSN.';
        };
      default:

    }
  }

  validateSsn = (value) => {
    return (!value || value.length < 11 || isValidSsn(value)) ? undefined : 'Invalid SSN.';
  }

  render() {
    const { element } = this.props;
    const containerClassName = classnames('form-group', element.gridClass);
    const fieldClassName = classnames('field-preview', {
      'field-preview--selected': element.editing
    });

    return (
      <div className={containerClassName}>
        {/*}<Field
          name={element.name}
          label={element.label}
          placeholder={element.placeholder}
          component={Text}
        />*/}
        <div className={fieldClassName}>
          <Field {...this.createFieldProps()} />
        </div>
      </div>
    );
  }
}

export default TextBuilder;
