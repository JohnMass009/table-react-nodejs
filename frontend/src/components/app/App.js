import React from 'react';
import './App.css';
import {TableWithFilter} from "components/table";
import { AppConsumer } from '../../core/createContext';

function App() {
  return (
    <div className={'container'}>
      <AppConsumer>{(context) => (
        <TableWithFilter {...context} />
      )}
      </AppConsumer>
    </div>
  );
}

export default App;