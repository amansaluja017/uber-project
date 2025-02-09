import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { store } from './store/Store.js'
import Weclcome from './Pages/Welcome.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import CaptianLogin from './pages/CaptianLogin.jsx'
import CaptianSignup from './Pages/CaptianSignup.jsx'
import Home from './Pages/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Weclcome />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/signup' element={<UserSignup />} />
          <Route path='/captian-login' element={<CaptianLogin />} />
          <Route path='/captian-signup' element={<CaptianSignup />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
