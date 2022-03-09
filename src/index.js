import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // <React.StrictMode>
    <App>
        <link rel="icon" href="https://veggyline.com/favicon.ico?v=2"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta name="description" content="VeggyLine"></meta>
        <meta charSet="utf-8"></meta>
        <meta property="og:url"                content='https://veggyline.com/' />
        <meta property="og:type"               content="website" />
        <meta property="og:title"              content="VeggyLine" />
        <meta property="og:description"        content="Be fit be veggy!" />
        <meta property="og:image"              content="https://veggyline.com/images/logo.png" />
    </App>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
