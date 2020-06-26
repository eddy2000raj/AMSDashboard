import React from 'react';
import ReactDOM from 'react-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import MainApp from './mainapp';
import store from './createStore';//dont use {} to import store
import { Provider } from 'react-redux';

ReactDOM.render(<Provider store={store}><MainApp /></Provider>, document.getElementById('root'));

//registerServiceWorker();