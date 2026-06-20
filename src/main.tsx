import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { JourneyProvider } from './app/JourneyProvider'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JourneyProvider>
      <App />
    </JourneyProvider>
  </StrictMode>,
)

// Register the service worker so the app is installable and launches full-screen
// from the home screen. It's a no-cache pass-through, so updates stay fresh.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
