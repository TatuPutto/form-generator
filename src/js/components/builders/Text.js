import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import classnames from 'classnames';
import Preview from './Preview';
import {
  TEXT_PLAIN,
  TEXT_SSN,
} from '../../types';
import {
  createTextProps,
  createTextSsnProps
} from '../../util/create-field-props';


class Text extends PureComponent {
  createFieldProps = () => {
    const { element } = this.props;

    switch (element.subtype) {
      case TEXT_PLAIN:
        return createTextProps(element);
      case TEXT_SSN:
        return createTextSsnProps(element);
      default:
        return createTextProps(element);
    }

  }

  // getValidator = () => {
  //   const element = this.props.element;
  //   switch (element.subtype) {
  //     case 'SSN':
  //       return (value) => {
  //         // console.log('@VALIDATE', value);
  //         // console.log('is vlaid: ', isValidSsn(value));
  //         // console.log('validation result: ', (!value || value.length < 11 || isValidSsn(value)) ? undefined : 'Invalid SSN.');
  //         return (!value || value.length < 11 || isValidSsn(value)) ? undefined : 'Invalid SSN.';
  //       };
  //     default:
  //
  //   }
  // }

  render() {
    return (
      <Preview element={this.props.element}>
        <Field {...this.createFieldProps()} />
      </Preview>
    );
  }
}

export default Text;
