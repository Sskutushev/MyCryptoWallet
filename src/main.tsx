import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Telegram WebApp SDK
const script = document.createElement('script')
script.src = 'https://telegram.org/js/telegram-web-app.js'
script.async = true
document.head.appendChild(script)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
