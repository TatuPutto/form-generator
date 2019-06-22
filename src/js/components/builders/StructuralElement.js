import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
// import Placeholder from './Placeholder';
import NewElementButton from '../NewFieldButton';
// import NewElementButton from '../NewFieldButton';
// import Text from './Text';

class StructuralElement extends PureComponent {
  getComponent = () => {
    const element = this.props.element;

    switch (element.type) {
      case 'INITIALIZER':
        return NewElementButton;
      case 'ROW':
        return Row;
      case 'HR':
        return <hr />;
      default:
        return NewElementButton;
    }
  }

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
    const Component = this.getComponent();
    return <Component element={this.props.element} />;
  }
}

// CreateComponent.propTypes = {
//   : PropTypes.
// };

export default StructuralElement;
