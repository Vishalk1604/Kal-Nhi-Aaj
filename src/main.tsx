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
