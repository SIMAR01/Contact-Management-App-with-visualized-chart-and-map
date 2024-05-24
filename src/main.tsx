import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import QueryProvider from './QueryClientProvider';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // Wrapping the entire application in BrowserRouter to enable routing
  <BrowserRouter>
    {/* Using StrictMode for additional checks and warnings */}
    <React.StrictMode>
        {/* Providing the QueryClient using the QueryProvider component */}
        <QueryProvider>
            <App />
        </QueryProvider>
    </React.StrictMode>
  </BrowserRouter>
,
)






