import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

import { I18nextProvider } from 'react-i18next'
import i18n from './locales/i18n'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { Toaster } from 'react-hot-toast'
// import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <LanguageProvider>
            <App />
            <Toaster position="top-right" />
          </LanguageProvider>
        </ThemeProvider>
      </I18nextProvider>
    </BrowserRouter>
  </StrictMode>,
)