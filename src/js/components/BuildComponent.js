import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { CheckboxButton, RadioButton, Text } from 'redux-form-field-components';
import isValidSsn from 'validate-finnish-ssn';
import BuildRow from './BuildRow';
import BuildPlaceholder from './BuildPlaceholder';
import NewFieldButton from './NewFieldButton';



class BuildComponent extends PureComponent {
  createStructuralComponent = () => {
    const element = this.props.element;
    console.log('@createStructuralComponent', element);

    switch (element.type) {
      case 'HR':
        return <hr />
      default:
        return null;
    }
  }

  createLabel = () => {
    return (
      <label className="text-uppercase">
        {this.props.element.label || this.props.element.placeholder}
      </label>
    );
  }

  getComponentFactory = () => {
    const element = this.props.element;
    console.log(element.type);
    switch (element.type) {
      case 'ROW':
        return BuildRow;
      case 'TEXT':
        return this.createTextField(element);
      case 'CHECKBOX-BTN':
        return this.createCheckboxButtonField(element);
      case 'RADIO-BTN':
        return this.createRadioButtonField(element);
      case 'BTN-GROUP':
        return this.createButtonGroup(element);
      case 'HR':
        return <hr />
      case 'PENDING':
        return BuildPlaceholder;
      default:
        return NewFieldButton;
    }
  }

  createField = () => {
    const element = this.props.element;

    // console.log(element);

    switch (element.type) {
      case 'TEXT':
        return this.createTextField(element);
      case 'CHECKBOX-BTN':
        return this.createCheckboxButtonField(element);
      case 'RADIO-BTN':
        return this.createRadioButtonField(element);
      case 'BTN-GROUP':
        return this.createButtonGroup(element);
      default:
        return 'input';
    }
  }

  createTextField = ({ name, /* optional, */ placeholder, autoComplete = false, subType }) => {
    if (subType === 'SSN') {
      return (
        <Field
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          normalize={(value, previousValue) => value && value.length > 11 ? previousValue : value}
          validate={value => !value || value.length < 11 || isValidSsn(value) ? undefined : 'Invalid SSN'}
          uppercase
          component={Text}
        />
      );
    }

    return (
      <Field
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        component={Text}
      />
    );
  }

  createCheckboxButtonField = ({ name, children }) => {
    return (
      <Field
        name={name}
        component={CheckboxButton}
      >
        {children}
      </Field>
    );
  }

  createButtonGroup = ({ children }) => {
    // return this.createField(child);
    return (
      <div>
        <div className="btn-group">
          {children.map(child => this.createRadioButtonField(child))}
        </div>
      </div>
    );
  }

  createRadioButtonField = (element) => {
    return (
      <Field
        name={element.name}
        checkedValue={element.checkedValue}
        component={RadioButton}
      >
        {element.children}
      </Field>
    );
  }

  isFieldComponent = () => {
    const fieldRelatedTypes = [
      'TEXT',
      'CHECKBOX-BTN',
      'RADIO-BTN',
      'BTN-GROUP'
    ];
    return fieldRelatedTypes.includes(this.props.element.type);
  }

  render() {
    // const { name, type, gridClass } = this.props.element;
    // const fieldClass = 'form-group ' + gridClass;
    const ComponentFactory = this.getComponentFactory();

    return <ComponentFactory element={this.props.element} />;

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

export default BuildComponent;
