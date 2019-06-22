import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field as RFField } from 'redux-form';
// import { CheckboxButton, RadioButton,  } from 'redux-form-field-components';
import Placeholder from './Placeholder';
import NewFieldButton from '../NewFieldButton';
import TextField from './Text';

class Field extends PureComponent {
  getComponent = () => {
    const element = this.props.element;

    // console.log(element);

    console.log('jep', element);

    if (!element.initialized) {
      return NewFieldButton;
    }

    // else if (!element.type) {
    //     console.log('tääkkä');
    //   return Placeholder;
    // }



    switch (element.fieldType) {
      case 'TEXT':
        return TextField;
        // return this.createTextField(element);
      // case 'CHECKBOX-BTN':
      //   return this.createCheckboxButtonField(element);
      // case 'RADIO-BTN':
      //   return this.createRadioButtonField(element);
      // case 'BTN-GROUP':
      //   return this.createButtonGroup(element);
      case 'HR':
        return <hr />;
      default:
        return NewFieldButton;
    }
  }

  // createTextField = ({ name, /* optional, */ placeholder, autoComplete = false, subType }) => {
  //   if (subType === 'SSN') {
  //     return (
  //       <RFField
  //         name={name}
  //         placeholder={placeholder}
  //         autoComplete={autoComplete}
  //         normalize={(value, previousValue) => value && value.length > 11 ? previousValue : value}
  //         validate={value => !value || value.length < 11 || isValidSsn(value) ? undefined : 'Invalid SSN'}
  //         uppercase
  //         component={Text}
  //       />
  //     );
  //   }
  //
  //   return (
  //     <RFField
  //       name={name}
  //       placeholder={placeholder}
  //       autoComplete={autoComplete}
  //       component={Text}
  //     />
  //   );
  // }
  //
  // createCheckboxButtonField = ({ name, children }) => {
  //   return (
  //     <RFField
  //       name={name}
  //       component={CheckboxButton}
  //     >
  //       {children}
  //     </RFField>
  //   );
  // }
  //
  // createButtonGroup = ({ children }) => {
  //   // return this.createField(child);
  //   return (
  //     <div>
  //       <div className="btn-group">
  //         {children.map(child => this.createRadioButtonField(child))}
  //       </div>
  //     </div>
  //   );
  // }
  //
  // createRadioButtonField = (element) => {
  //   return (
  //     <RFField
  //       name={element.name}
  //       checkedValue={element.checkedValue}
  //       component={RadioButton}
  //     >
  //       {element.children}
  //     </RFField>
  //   );
  // }
  //
  // isFieldComponent = () => {
  //   const fieldRelatedTypes = [
  //     'TEXT',
  //     'CHECKBOX-BTN',
  //     'RADIO-BTN',
  //     'BTN-GROUP'
  //   ];
  //   return fieldRelatedTypes.includes(this.props.element.type);
  // }

  render() {
    // const { name, type, gridClass } = this.props.element;
    // const fieldClass = 'form-group ' + gridClass;
    const Component = this.getComponent();

    return <Component element={this.props.element} />;

    // if (this.isFieldComponent()) {
    //   return (
    //     <div className={fieldClass}>
    //       {/* render label */}
    //       {/*this.createLabel()*/}
    //       {/*this.createField()*/}
    //     </div>
    //   );
    // } else {
    //   return this.createStructuralComponent();
    // }
  }
}

// CreateComponent.propTypes = {
//   : PropTypes.
// };

export default Field;
