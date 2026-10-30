import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import { safeStorage } from './utils/safeStorage'

// Sanitize corrupt or oversized browser memory before initial mount
safeStorage.cleanOversizedStorage();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
