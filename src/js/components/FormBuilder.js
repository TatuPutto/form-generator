import React from 'react';
import { reduxForm } from 'redux-form';
import BuildComponent from './BuildComponent';
import FieldConfiguration from './FieldConfiguration';

class FormBuilder extends React.Component {
  renderElements = () => {
    return this.props.elements.map(element => {
      return <BuildComponent key={element.id} element={element} />
    });
  }

  renderRowContent = (rowId) => {
    return this.getRowContent(rowId).map(item => (
      <div key={item.id} className={`col-${item.width}`}>
        {item.type ?
          <span />

        : item.editing ?
          <select className="form-control" onChange={e => this.setFieldType(item.id, e)}>
            <option />
            <option value="text">
              Text
            </option>
            <option value="select">
              Select
            </option>
            <option value="checkbox">
              Checkbox
            </option>
          </select>
          :
          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={() => this.editField(item.id, 'editing', true)}
          >
            +
          </button>
        }
      </div>
    ));
  }

  render() {
    // console.log('this.props', this.props)

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <FieldConfiguration />
          </div>
          <div className="col-md-8 form-content">
            <form>
              {this.renderElements()}
              {/*this.renderRows()*/}
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
