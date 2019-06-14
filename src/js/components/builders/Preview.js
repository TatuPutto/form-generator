import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

class Preview extends PureComponent {

  componentDidMount() {
    console.log('jeep');
    this.registerMouseDownListener();

  }

  registerMouseDownListener = () => {
    console.log('this.ref', this.ref);
    this.ref.current.addEventListener('mousedown', this.handleMousedown);
  }

  handleMousedown = (e) => {
    console.log('e', e);
    this.props.changeWidth(this.props.element.id, 8);
  }

  ref = createRef();

  render() {
    const { children, element, select } = this.props;
    const containerClassName = classnames('form-group', element.gridClass);
    const fieldClassName = classnames('field-preview', {
      'field-preview--initialized': element.initialized,
      'field-preview--selected': element.selected
    });

    return (
      <div
        ref={this.ref}
        className={containerClassName}
        onClick={() => select(element.id)}
      >
        <div className={fieldClassName}>
          {children}
        </div>
      </div>
    );
  }
}

export default connect(
  () => {},
  (dispatch) => ({
    select: (fieldId) => dispatch({ type: 'FIELDS/SELECT', fieldId }),
    changeWidth: (fieldId, width) => dispatch({ type: 'CHANGE_FIELD', id: fieldId, key: 'width', value: width }),
  })
)(Preview)

// export default FieldPreview;
