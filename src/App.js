import React from 'react';
import './App.css';
import Main from './components/Main';
import SharedProvider from './services/context'

class App extends React.Component {
  render() {
    return (
      <SharedProvider>
        <link rel="shortcut icon" href="https://veggyline.com/favicon.ico?v=2"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <Main/>
      </SharedProvider>
    );
  }

  componentDidMount() {
    document.title = "VeggyLine";
  }

}

export default App;

