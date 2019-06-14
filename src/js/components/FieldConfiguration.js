import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { getSelectedField } from '../selectors';
import {
  TEXT,
  TEXT_PLAIN,
  TEXT_SSN
} from '../types';

class FieldConfiguration extends Component {

  render() {
    const {
      config: { subtypeOptionsVisible },
      field,
      changeFieldKeyValue,
      resetField,
      selectFieldType,
      selectFieldSubtype,
      toggleSubtypeOptions
    } = this.props;

    // const types = [
    //   'TEXT',
    //   'CHECKBOX',
    //   'RADIO',
    //   'SELECTIZE'
    // ]

    return (
      <div className="field-configuration">

        {field &&

          <Fragment>

          {field.type && field.type !== 'PENDING' &&
            <div>

            <div
              className="field-type-selection"
            >
              <span style={{ flexGrow: 1 }}>
                <FontAwesomeIcon icon="font" className="mr-2" />
                <span className="text-capitalize">
                  {field.type.toLowerCase()}
                </span>
                {field.subtype &&
                  <span className="text-muted ml-1">
                    ({field.subtype.toLowerCase()})
                  </span>
                }
              </span>
              <button className="btn undo-selection" onClick={() => resetField()}>
                <FontAwesomeIcon icon="times" className="pull-right" />
              </button>
            </div>

            <hr />

            {field.type && field.type !== 'PENDING' && field.subtype &&
              <div className="field-config__subtype">

              <Button
                color="link"
                className="subtype__toggle-options"
                onClick={toggleSubtypeOptions}
              >
                Subtypes
                {subtypeOptionsVisible ?
                  <FontAwesomeIcon icon="chevron-down" className="ml-1" />
                  :
                  <FontAwesomeIcon icon="chevron-right" className="ml-1" />
                }
              </Button>

              {subtypeOptionsVisible &&
                <div className="subtype__options mt-2">
                  <div className="row form-group">
                    <div className="col-lg-4">
                      <div
                        onClick={() => selectFieldSubtype(TEXT_PLAIN)}
                        className={cn('subtype__option', {
                          'subtype__option--selected': field.subtype === TEXT_PLAIN
                        })}
                      >
                        <FontAwesomeIcon icon="font" className="mr-2" />
                        Plain
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div
                        onClick={() => selectFieldSubtype(TEXT_SSN)}
                        className={cn('subtype__option', {
                          'subtype__option--selected': field.subtype === TEXT_SSN
                        })}
                      >
                        <div className="subtype__option_title">
                          <FontAwesomeIcon icon="address-card" className="mr-2" />
                          SSN
                        </div>
                        {/*}<h5 className="subtype__option_title">
                          SSN
                        </h5>*/}
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div
                        onClick={() => selectFieldSubtype('NAME')}
                        className={cn('subtype__option', {
                          'subtype__option--selected': field.subtype === 'NAME'
                        })}
                      >
                        <FontAwesomeIcon icon="user" className="mr-2" />
                        Name
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-4">
                      <div
                        onClick={() => selectFieldSubtype('PHONE')}
                        className={cn('subtype__option', {
                          'subtype__option--selected': field.subtype === 'PHONE'
                        })}
                      >
                        <FontAwesomeIcon icon="phone" className="mr-2" />
                        Phone
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div
                        onClick={() => selectFieldSubtype('EMAIL')}
                        className={cn('subtype__option', {
                          'subtype__option--selected': field.subtype === 'EMAIL'
                        })}
                      >
                        <FontAwesomeIcon icon="envelope" className="mr-2" />
                        Email
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div
                        onClick={() => selectFieldSubtype('CURRENCY')}
                        className={cn('subtype__option', {
                          'subtype__option--selected': field.subtype === 'CURRENCY'
                        })}
                      >
                        <FontAwesomeIcon icon="euro-sign" className="mr-2" />
                        Currency
                      </div>
                    </div>
                  </div>
                </div>
              }

              </div>
            }

            <hr />

            {field.type && field.type !== 'PENDING' && field.subtype &&

              <Fragment>
              <div className="form-group">
                <label>
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={e => changeFieldKeyValue('name', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>
                  Label
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={e => changeFieldKeyValue('label', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>
                  Placeholder
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={e => changeFieldKeyValue('placeholder', e.target.value)}
                />
              </div>

              {/*}
              <hr />

              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>
                      Length
                    </label>
                    <InputGroup>
                      <Input placeholder="Min" />
                      <InputGroupAddon>&ndash;</InputGroupAddon>
                      <Input placeholder="Max" />
                    </InputGroup>
                  </div>
                </div>
              </div>

              */}

              </Fragment>
            }

              </div>
          }

          {field.type === 'PENDING' &&
            <div className="col-xl-6">
              <button
                className="btn btn-outline-light"
                onClick={() => selectFieldType('TEXT')}
              >
                <FontAwesomeIcon icon="font" className="mr-2" />
                Text
              </button>

              <button
                className="btn btn-outline-light"
                onClick={() => selectFieldType('CHECKBOX-BUTTON')}
              >
                <FontAwesomeIcon icon="check-square" className="mr-2" />
                Checkbox
              </button>

              <button
                className="btn btn-outline-light"
                onClick={() => selectFieldType('RADIO-BUTTON')}
              >
                <FontAwesomeIcon icon="dot-circle" className="mr-2" />
                Radio
              </button>
            </div>
          }

          </Fragment>
        }



      </div>
    );
  }

}

export default connect(
  (state) => ({
    field: getSelectedField(state),
    config: state.builder.config
  }),
  (dispatch) => ({
    resetField: () => dispatch({ type: 'RESET_FIELD' }),
    selectFieldType: (fieldType) => dispatch({ type: 'SET_FIELD_TYPE_TEXT' }),
    selectFieldSubtype: (subtype) => dispatch({ type: 'SET_FIELD_SUBTYPE', subtype }),
    changeFieldKeyValue: (key, value) => dispatch({ type: 'CHANGE', key, value }),
    toggleSubtypeOptions: () => dispatch({ type: 'TOGGLE_SUBTYPE_OPTIONS' }),
  })
)(FieldConfiguration);
