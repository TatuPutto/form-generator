import React from 'react';
import { reduxForm } from 'redux-form';
import BuildComponent from './BuildComponent';

class FormBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      rows: [1],

    };

    this.getRowContent = this.getRowContent.bind(this);
    this.findFieldIndex = this.findFieldIndex.bind(this);
    this.editField = this.editField.bind(this);
    this.setFieldType = this.setFieldType.bind(this);
  }

  findFieldIndex(fieldId) {
    return this.state.fields.findIndex(field => field.id === fieldId);
  }

  editField(fieldId, key, value) {
    const matchingFieldAt = this.findFieldIndex(fieldId);
    const fields = JSON.parse(JSON.stringify(this.state.fields));
    fields[matchingFieldAt] = { ...fields[matchingFieldAt], [key]: value }
    this.setState({ fields });
  }

  setFieldType(fieldId, e) {
    this.editField(fieldId, 'type', e.target.value)
  }

  getRowContent(rowId) {
    return this.state.fields.filter(field => field.rowId === rowId);
  }
  //
  // getField = (fieldId) => {
  //   return this.props.fields.find(field => field.id === fieldId);
  // }

  renderElements = () => {
    // return this.state.rows.map(row => (
    //   <div key={row} className="row">
    //     {this.renderRowContent(row)}
    //   </div>
    // ));
    console.log(this.props.elements);
    return this.props.elements.map(element => {
      return <BuildComponent key={element.id} element={element} />
      // if (element.type === 'ROW') {
      //   return <BuildRow element={element} />;
      // }
    });
  }

  /*
  <Field
    name={item.id.toString()}
    type="text"
    component="input"
  />
  */

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
    console.log('this.props', this.props)

    return (
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-4">
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

// export default reduxForm({
//   form: 'test'
// })(FormBuilder);

export default FormBuilder;
