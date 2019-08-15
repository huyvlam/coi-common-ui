import * as React from 'react';
import PropTypes from 'prop-types';
import CiscoSans from './CiscoSans';

function App() {
  return (
    <div>
      <h1>coi-common-ui</h1>
      <h3>Cisco One Identity Common User Interface</h3>
      {CiscoSans()}
    </div>
  );
}

App.propTypes = {
  title: PropTypes.string
};

export default App;
