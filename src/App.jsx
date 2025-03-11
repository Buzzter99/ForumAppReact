import './App.css'
import About from './Components/About/About.jsx'
import Footer from './Components/Footer/Footer.jsx'
import { Routes, Route, Navigate } from 'react-router'
import NotFound from './Components/NotFound/NotFound.jsx'
import Navigation from './Components/Navigation/Navigation.jsx'
function App() {

  return (
    <>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path='/home' element={<h1>Home</h1>}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
