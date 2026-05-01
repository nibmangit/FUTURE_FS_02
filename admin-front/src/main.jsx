import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext";
import { HeaderProvider } from './context/HeaderContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <AuthProvider >
      <HeaderProvider> 
        <App />
      </HeaderProvider>
    </AuthProvider>
  </StrictMode>
  </BrowserRouter>
)
