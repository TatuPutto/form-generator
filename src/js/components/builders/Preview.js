import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import createGridClass from '../../util/create-grid-class';

class Preview extends PureComponent {

  mousedownX
  mouseupX
  mousemoveX

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
    console.log('startResize ', e.nativeEvent.clientX);
    this.mousedownX = e.nativeEvent.clientX;
    // this.props.select(this.props.element.id)

    document.onmousemove = this.handleMousemove;
    document.onmouseup = this.stopResize;
    this.props.startResize(this.props.element.id, this.props.element.parentId)
  }

  stopResize = () => {
    document.onmousemove = null;
    setTimeout(() => {
      this.props.stopResize(this.props.element.id);
    }, 0);
  }

  handleMousemove = (e) => {
    // console.log('this.ref.current', this.ref.current.offsetWidth);
    this.mousemoveX = e.clientX;

    this.props.temporaryResize(this.props.element.id, this.getWidthAfterMousemove());
  }

  getWidthAfterMousemove = () => {
    const widthIncreased = this.mousemoveX > this.mousedownX;
    const widthChange = Math.abs(this.mousedownX - this.mousemoveX);
    const newWidth = widthIncreased ?
      this.ref.current.offsetWidth + widthChange
      :
      this.ref.current.offsetWidth - widthChange;

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
            onMouseUp={() => this.stopResize()}
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
    startResize: (fieldId) => dispatch({ type: 'START_RESIZE', fieldId }),
    stopResize: (fieldId) => dispatch({ type: 'STOP_RESIZE', fieldId }),
    temporaryResize: (fieldId, width) => dispatch({ type: 'SET_TEMPORARY_WIDTH', fieldId, width }),
    changeWidth: (fieldId, width) => dispatch({ type: 'CHANGE_FIELD_WIDTH', fieldId, key: 'width', direction: 'RIGHT', width }),
  })
)(Preview)

// export default FieldPreview;
