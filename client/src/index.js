import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FreezerBox from './FreezerBox';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<FreezerBox />, document.getElementById('root'));
registerServiceWorker();
