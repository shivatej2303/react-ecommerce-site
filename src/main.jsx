import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store.js'
import { Provider } from 'react-redux'





createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
       <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>

)
