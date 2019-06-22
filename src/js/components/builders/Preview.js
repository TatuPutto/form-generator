import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import throttle from 'lodash/throttle';
import createGridClass from '../../util/create-grid-class';
import { ROW } from '../../types';

const withPreview = (Component) => {
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

    isResizable = () => {
      return this.props.element.type === 'FIELD'
    }

    select = (e, elementId) => {
      e.stopPropagation(); // Prevent click from bubbling down to parent element preview.
      this.props.select(elementId);
    }


    render() {
    //   console.log('this.props', this.props);

      const { children, element, select } = this.props;
      const gridClass = this.isResizable() ?
        createGridClass(element.breakpoints): null;
      const containerClassName = classnames('form-group', {
        [gridClass]: !element.resizing,
        'col': element.resizing
      });
      const elementClassName = classnames('preview', {
        'preview--initialized': element.initialized,
        'preview--selected': element.selected,
        'preview--resizing': element.resizing,
        'preview--row': element.type === ROW
      });
      const elementMetaClassName = classnames('preview__element-meta', {
        'preview__element-meta--selected': element.selected
      });
      const styles = element.resizing ? { width: element.temporaryWidth, maxWidth: element.temporaryWidth } : null;

      return (
        <div
          ref={this.ref}
          className={containerClassName}
          style={styles}
          onClick={(e) => this.select(e, element.id)}
        >
          <div className={elementClassName}>
            <div className={elementMetaClassName}>
              {element.type}
              {element.fieldType && ` ${element.fieldType}`}
              {element.fieldSubtype && ` ${element.fieldSubtype}`}
            </div>
            {/*<div className="preview__resize" />*/}
            <div className="preview__content">
              <Component element={element} />
            </div>
            {/*<div
              className="preview__resize"
              onMouseDown={(e) => this.startResize(e, 'RIGHT')}
            />*/}
          </div>
        </div>
      );
    }
  }

  return connect(
    () => ({}),
    (dispatch) => ({
      select: (elementId) => dispatch({ type: 'SELECT_ELEMENT', elementId }),
      startResize: (fieldId, direction) => dispatch({ type: 'START_RESIZE', fieldId, direction }),
      saveResize: (fieldId) => dispatch({ type: 'SAVE_RESIZE', fieldId }),
      temporaryResize: (fieldId, width) => dispatch({ type: 'SET_TEMPORARY_WIDTH', fieldId, width }),
      changeWidth: (fieldId, width) => dispatch({ type: 'CHANGE_FIELD_WIDTH', fieldId, key: 'width', direction: 'RIGHT', width }),
    })
  )(Preview)
}

export default withPreview;

// export default connect(
//   () => ({}),
//   (dispatch) => ({
//     select: (fieldId) => dispatch({ type: 'SELECT_FIELD', fieldId }),
//     startResize: (fieldId, direction) => dispatch({ type: 'START_RESIZE', fieldId, direction }),
//     saveResize: (fieldId) => dispatch({ type: 'SAVE_RESIZE', fieldId }),
//     temporaryResize: (fieldId, width) => dispatch({ type: 'SET_TEMPORARY_WIDTH', fieldId, width }),
//     changeWidth: (fieldId, width) => dispatch({ type: 'CHANGE_FIELD_WIDTH', fieldId, key: 'width', direction: 'RIGHT', width }),
//   })
// )(withPreview)

// export default FieldPreview;
