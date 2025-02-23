import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/Context.jsx'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

createRoot(document.getElementById('root')).render(
  
  <AppContextProvider>
      <BrowserRouter>
      <App/>
      <ToastContainer
         position="top-right"
         autoClose={1000}
         limit={1}
         hideProgressBar={false}
         newestOnTop
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
         
         />
      </BrowserRouter>
  </AppContextProvider>
)
