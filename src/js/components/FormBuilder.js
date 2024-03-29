import React from 'react';
import { reduxForm } from 'redux-form';
// import BuildComponent from './BuildComponent';
import StructuralElement from './builders/StructuralElement';
import FieldConfiguration from './FieldConfiguration';
import { arrayFrom } from '../util/immutable';


class FormBuilder extends React.Component {

  renderElements = () => {
    return arrayFrom(this.props.elements).map(element => (
      <StructuralElement
        key={element.id}
        element={element}
      />
    ));
  }

  render() {
    // console.log('this.props', this.props)

    return (
      <div className="container" style={{ width: '768px' }}>
        <div className="row">
          {/*}<div className="col-md-4">
            <FieldConfiguration />
          </div>*/}
          <div id="form-preview" className="col-md-12 form-content">
            <form>
              {this.renderElements()}
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default reduxForm({
  form: 'test'
})(FormBuilder);

// export default FormBuilder;
