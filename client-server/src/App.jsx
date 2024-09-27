import './App.css'
import Home from './components/home/home'
import {Route, Routes} from 'react-router-dom'
import Header from './components/menu/header'
import Course from './components/courses/course'
import Player from './components/courses/player'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<Home/ >} />
        <Route path='/courses' element={<Course/ >} />
        <Route path='/login' element={<Login/ >} />
        <Route path='/signup' element={<Signup/ >} />
        <Route path='/courses/player/:id' element={<Player/ >} />
      </Routes>
    </>
  )
}

export default App
