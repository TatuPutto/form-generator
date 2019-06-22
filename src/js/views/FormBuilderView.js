import { connect } from 'react-redux';
import FormBuilder from '../components/FormBuilder';
import { combineElementsWithChildren } from '../selectors';

const mapStateToProps = (state) => ({
  // elements: combineElementsWithFields(state)
  elements: combineElementsWithChildren(state)
});


const mapDispatchToProps = (dispatch) => ({
  // initializeApplicationWizard: (mode, applicationId) => (
  //   dispatch(operations.initializeApplicationWizard(mode, applicationId))
  // )
});

export default connect(mapStateToProps, mapDispatchToProps)(FormBuilder);
