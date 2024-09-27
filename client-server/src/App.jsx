import './App.css'
import Home from './components/home/home'
import {Route, Routes} from 'react-router-dom'
import Header from './components/menu/header'
import Course from './components/courses/course'
function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/ >} />
        <Route path='/course' element={<Course/ >} />
      </Routes>
    </>
  )
}

export default App
