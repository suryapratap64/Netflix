import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "../src/redux/store.js";
np
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
