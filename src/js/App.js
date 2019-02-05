import React from 'react';
import { Provider } from 'react-redux';
import FormBuilder from './views/FormBuilderView';
// import FormPreview from './components/FormPreview';
import store from './configure-store';

// import '../less/bootstrap.css';
import '../less/styles.css';

const App = () => (
  <Provider store={store}>
    {/*<FormPreview />*/}
    <FormBuilder />
  </Provider>
);

export default App;
