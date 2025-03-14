import './App.css'
import About from './Components/About/About.jsx'
import Footer from './Components/Footer/Footer.jsx'
import { Routes, Route, Navigate } from 'react-router'
import NotFound from './Components/NotFound/NotFound.jsx'
import Navigation from './Components/Navigation/Navigation.jsx'
import Home from './Components/Home/Home.jsx'
import Login from './Components/User/Login/Login.jsx'
function App() {

  return (
    <>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
