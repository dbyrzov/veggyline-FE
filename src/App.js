import React from 'react';
import './App.css';
import Main from './components/Main';
import SharedProvider from './services/context'

class App extends React.Component {
  render() {
    return (
      <SharedProvider>
        <Main/>
      </SharedProvider>
    );
  }
}

export default App;

