import { connect } from 'react-redux';
import FormBuilder from '../components/FormBuilder';
import { combineElementsWithFields } from '../selectors';

const mapStateToProps = (state) => ({
  elements: combineElementsWithFields(state),
  rows: state.builder.rows,
  fields: state.builder.fields
});


const mapDispatchToProps = (dispatch) => ({
  // initializeApplicationWizard: (mode, applicationId) => (
  //   dispatch(operations.initializeApplicationWizard(mode, applicationId))
  // )
});

export default connect(mapStateToProps, mapDispatchToProps)(FormBuilder);
