import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { store } from './store/Store.js'
import Weclcome from './Pages/Welcome.jsx'
import UserLogin from './Pages/UserLogin.jsx'
import UserSignup from './Pages/UserSignup.jsx'
import CaptianLogin from './Pages/CaptianLogin.jsx'
import CaptianSignup from './Pages/CaptianSignup.jsx'
import Home from './Pages/Home.jsx'
import UserProtected from './components/UserProtected.jsx'
import UserLogout from './Pages/UserLogout.jsx'
import CaptianLogout from './Pages/CaptianLogout.jsx'
import CaptianHome from './Pages/CaptianHome.jsx'
import CaptianProtected from './components/CaptianProtected.jsx'
import Riding from './Pages/Riding.jsx'
import CaptianRide from './Pages/CaptianRide.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Weclcome />} />
          <Route path='/home' element={
            <UserProtected>
              <Home />
            </UserProtected>
          } />
          <Route path='/riding' element={<Riding />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/signup' element={<UserSignup />} />
          <Route path='/logout' element={
            <UserProtected>
              <UserLogout />
            </UserProtected>
          } />
          <Route path='/captian-login' element={<CaptianLogin />} />
          <Route path='/captian-signup' element={<CaptianSignup />} />
          <Route path='/captian-home' element={
            <CaptianProtected>
              <CaptianHome />
            </CaptianProtected>
          } />
          <Route path='/captian-riding' element={<CaptianRide />} />
          <Route path='/captian-logout' element={
            <UserProtected>
              <CaptianLogout />
            </UserProtected>
          } />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
