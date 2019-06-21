import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import throttle from 'lodash/throttle';
import createGridClass from '../../util/create-grid-class';

class Preview extends PureComponent {

  mousedownX
  mouseupX
  mousemoveX
  originalWidth

  // componentDidMount() {
  //   this.registerMouseDownListener();
  //
  // }
  //
  // registerMouseDownListener = () => {
  //   console.log('this.ref', this.ref);
  //   this.ref.current.addEventListener('mousedown', this.handleMousedown);
  // }
  //
  // handleMousedown = (e) => {
  //   console.log('e', e);
  //   this.props.changeWidth(this.props.element.id, 8);
  // }

  startResize = (e, direction) => {
    // const width = this.props.element.breakpoints['sm'];
    // const containerWidth = document.getElementById('form-preview').offsetWidth;
    // const colWidth = containerWidth / 12;
    // const originalWidth = colWidth * width;
    // console.log('originalWidth: ', originalWidth);

    // console.log('startResize ', e.nativeEvent.clientX);
    this.mousedownX = e.nativeEvent.clientX;
    // this.originalWidth = originalWidth;
    // this.originalWidth = this.ref.current.offsetWidth;
    // this.props.select(this.props.element.id)

    document.getElementById('form-preview').onmousemove = this.handleMousemove;
    document.onmouseup = this.saveResize;
    this.props.startResize(this.props.element.id, direction);
    // this.props.temporaryResize(this.props.element.id, originalWidth);

  }

  saveResize = () => {
    document.getElementById('form-preview').onmousemove = null;
    document.onmouseup = null;
    this.props.saveResize(this.props.element.id);
  }

  handleMousemove = (e) => {
    // console.log('this.ref.current', this.ref.current.offsetWidth);
    this.mousemoveX = e.clientX;
    // console.log(e.clientX);
    this.props.temporaryResize(this.props.element.id, this.getWidthAfterMousemove());
  }

  getWidthAfterMousemove = () => {
    const widthIncreased = this.mousemoveX > this.mousedownX;
    const widthChange = Math.abs(this.mousemoveX - this.mousedownX);
    const newWidth = widthIncreased ?
      this.props.element.originalWidth + widthChange :
      this.props.element.originalWidth - widthChange
    // console.log('widthChange: ', widthChange);
    // const newWidth = widthIncreased ?
    //   this.ref.current.offsetWidth + widthChange
    //   :
    //   this.ref.current.offsetWidth - widthChange;
    //   console.log('newWidth: ', newWidth);
    return newWidth;
  }

  getMousemoveDirection = () => {
    if (this.mousedownX > this.mousemoveX) {
      return 'LEFT';
    } else {
      return 'RIGHT';
    }
  }

  ref = createRef();

  render() {
    const { children, element, select } = this.props;
    const gridClass = createGridClass(element.breakpoints);
    const containerClassName = classnames('form-group', {
      [gridClass]: !element.resizing,
      'col': element.resizing
    });
    const fieldClassName = classnames('field-preview', {
      'field-preview--initialized': element.initialized,
      'field-preview--selected': element.selected,
      'field-preview--resizing': element.resizing
    });
    const styles = element.resizing ? { width: element.temporaryWidth, maxWidth: element.temporaryWidth } : null;

    return (
      <div
        ref={this.ref}
        className={containerClassName}
        style={styles}
        onClick={() => select(element.id)}
      >
        <div className={fieldClassName}>
          <div className="field-preview__resize" />
          <div className="field-preview__content">
            {children}
          </div>
          <div
            className="field-preview__resize"
            onMouseDown={(e) => this.startResize(e, 'RIGHT')}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  (dispatch) => ({
    select: (fieldId) => dispatch({ type: 'SELECT_FIELD', fieldId }),
    startResize: (fieldId, direction) => dispatch({ type: 'START_RESIZE', fieldId, direction }),
    saveResize: (fieldId) => dispatch({ type: 'SAVE_RESIZE', fieldId }),
    temporaryResize: (fieldId, width) => dispatch({ type: 'SET_TEMPORARY_WIDTH', fieldId, width }),
    changeWidth: (fieldId, width) => dispatch({ type: 'CHANGE_FIELD_WIDTH', fieldId, key: 'width', direction: 'RIGHT', width }),
  })
)(Preview)

// export default FieldPreview;
