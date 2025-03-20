import './App.css'
import About from './Components/About/About.jsx'
import Footer from './Components/Footer/Footer.jsx'
import { Routes, Route, Navigate } from 'react-router'
import NotFound from './Components/NotFound/NotFound.jsx'
import Navigation from './Components/Navigation/Navigation.jsx'
import Home from './Components/Home/Home.jsx'
import Login from './Components/User/Login/Login.jsx'
import Register from './Components/User/Register/Register.jsx'
import AuthorizedRouteGuard from './RouteGuards/AuthorizedRouteGuard/AuthorizedRouteGuard.jsx'
import UnauthorizedRouteGuard from './RouteGuards/UnauthorizedRouteGuard/UnauthorizedRouteGuard.jsx'
import All from './Components/Post/All/All.jsx'
import Edit from './Components/Post/Edit/Edit.jsx'
import Create from './Components/Post/Create/Create.jsx'
import Details from './Components/Post/Details/Details.jsx'
import Comments from './Components/User/Comments/Comments.jsx'
import EditUserComment from './Components/User/EditUserComment/EditUserComment.jsx'
function App() {
  return (
    <>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/all' element={<All />}></Route>
        <Route path='/all/:postId' element={<Details />}></Route>
        <Route element={<AuthorizedRouteGuard />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<UnauthorizedRouteGuard />}>
          <Route path='/edit/:postId' element={<Edit />} />
          <Route path='/create' element={<Create />} />
          <Route path='/comments' element={<Comments />} />
          <Route path='/comments/edit/:commentId' element={<EditUserComment />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer></Footer>
    </>
  )
}
export default App
