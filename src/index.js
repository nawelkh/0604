import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


//redux
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
//import logger from 'redux-logger'
import rootReducer from "./reducers";
// dev tools
import { composeWithDevTools } from "redux-devtools-extension";


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);



ReactDOM.render(

  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
   
  document.getElementById('root')
);



