import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';
import '../dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDom.render(<App/>, document.getElementById('app'));