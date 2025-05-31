import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Buffer } from 'buffer'

// Polyfill Buffer for browser
if (!(window as any).Buffer) {
  (window as any).Buffer = Buffer
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
