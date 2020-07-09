import React from 'react';
import ReactDOM from 'react-dom';
import 'index.scss';
import App from 'components/app/App';
import {ErrorBoundry} from 'components/error-boundry'
import {AppProvider} from 'core/createContext';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundry>
      <AppProvider state={ { }}>
        <App />
      </AppProvider>
    </ErrorBoundry>
  </React.StrictMode>,
  document.getElementById('root')
);
