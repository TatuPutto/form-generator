import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { CheckboxButton } from 'redux-form-field-components';
import CreateComponent from './CreateComponent';

const formElements = [
  {
    id: 'row-0',
    type: 'ROW',
    children: [
      {
        id: '1',
        name: 'ssn',
        type: 'TEXT',
        subType: 'SSN',
        gridClass: 'col-sm-3 col-xs-5',
        placeholder: 'SSN',
        autoComplete: false
      },
      {
        id: '2',
        name: 'lastName',
        type: 'TEXT',
        gridClass: 'col-sm-4 col-xs-5',
        placeholder: 'Last name',
        autoComplete: false
      },
      {
        id: '3',
        name: 'firstNames',
        type: 'TEXT',
        placeholder: 'First names',
        gridClass: 'col-sm-5 col-xs-7',
        autoComplete: false
      },
    ]
  },
  {
    id: 'row-1',
    type: 'ROW',
    children: [
      {
        id: '1',
        name: 'email',
        type: 'TEXT',
        subType: 'EMAIL',
        gridClass: 'col-sm-7',
        placeholder: 'Email address',
        autoComplete: false
      },
      {
        id: '2',
        name: 'phone',
        type: 'TEXT',
        subType: 'PHONE',
        gridClass: 'col-sm-5',
        placeholder: 'Phone number',
        autoComplete: false
      }
    ]
  },
  {
    id: '6',
    type: 'HR'
  },
  {
    id: 'row-2',
    type: 'ROW',
    children: [
      {
        id: '5',
        type: 'BTN-GROUP',
        gridClass: 'col-sm-6',
        label: 'Has fixed period',
        children: [
          {
            id: '5[0]',
            name: 'fixedPeriod',
            type: 'RADIO-BTN',
            checkedValue: true,
            children: 'Fixed period'
          },
          {
            id: '5[1]',
            name: 'fixedPeriod',
            type: 'RADIO-BTN',
            checkedValue: false,
            children: 'Open ended'
          }
        ]
      }
    ]
  },
  {
    id: 'row-3',
    type: 'ROW',
    children: [
      {
        id: '4',
        name: 'security-training-completed',
        type: 'CHECKBOX-BTN',
        gridClass: 'col-sm-3 col-xs-12',
        children: 'Security training completed',
        label: 'Security training completed'
      },
    ]
  }
];


// {
//   id: '4',
//   name: 'isAdmin',
//   type: 'CHECKBOX-BTN',
//   gridClass: 'col-sm-3 col-xs-12',
//   children: 'Turvallisuuskoulutus suoritettu',
//   label: 'Turvallisuuskoulutus suoritettu'
// },

class FormPreview extends React.Component {

  renderRowContent = () => {

    // iterate through elements -> create new row every 12 columns

  }


  render() {
    console.log(this.props.valid);
    return (
      <div className="container">
      <div className="container-fuild">

        {/*}
        <div className="form-heading">
          <h2>Putto, Tatu</h2>
        </div>
        */}

        <form className="pt-4">


        {formElements.map(element => {
          if (element.type === 'ROW') {
            return (
              <div className="row">
                {element.children.map(child => (
                  <CreateComponent
                    key={child.id}
                    element={child}
                  />
                ))}
              </div>
            );
          } else {
            return <hr />;
          }
        })}


          <div className="row">



          </div>



        </form>

      </div>
      </div>
    );

  }


}

export default reduxForm({
  form: 'test'
})(FormPreview);
