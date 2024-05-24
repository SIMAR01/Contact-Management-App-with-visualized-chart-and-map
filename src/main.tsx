import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import QueryProvider from './QueryClientProvider';
import './index.css'
import { Provider } from 'react-redux';
import store from './features/store/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // Wrapping the entire application in BrowserRouter to enable routing
  <BrowserRouter>
    {/* Using StrictMode for additional checks and warnings */}
    <React.StrictMode>
        {/* Providing the QueryClient using the QueryProvider component */}
        <QueryProvider>
          {/* Providing the Redux store using the Provider component */}
          <Provider store={store}>
            <App />
          </Provider>
        </QueryProvider>
    </React.StrictMode>
  </BrowserRouter>
,
)






