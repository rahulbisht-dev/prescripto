import {BrowserRouter} from "react-router-dom"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AdminContextProvider } from "./context/Admincontext.jsx"
import { DoctorContextProvider } from "./context/Doctorcontext.jsx"
import { AppContextProvider } from "./context/Appcontext.jsx"
import {ToastContainer} from "react-toastify";

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <AdminContextProvider>
    <DoctorContextProvider>
      <AppContextProvider>
      <App />
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
         transition={"Bounce"}
         />
      </AppContextProvider>
    </DoctorContextProvider>
  </AdminContextProvider>
  </BrowserRouter>

  
)

