
  import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
    BrowserRouter,
    HashRouter
  } from "react-router-dom";
  import "./i18nextInit";
  import { Provider } from 'react-redux'
  import store from './store'
  
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HashRouter>
    <Suspense fallback="...">
    <App />
    </Suspense>
    </HashRouter>
    </Provider>
)
