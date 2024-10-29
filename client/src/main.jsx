
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import {store} from "./store/index.js"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <ToastContainer/>
    <App />
  </Provider>
  
  </BrowserRouter>,
)