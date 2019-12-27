import React from 'react';
import ReactDOM from 'react-dom';
import './global.scss';
import './styles/base.scss';
import Homepage from './components/Homepage.js';

function Root() {
    return <Homepage />;
}

// Render the Root element into the DOM
ReactDOM.render(
    <Root />,
    document.getElementById('root'),
);