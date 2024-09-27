import './App.css'
import Home from './components/home/home'
import {Route, Routes} from 'react-router-dom'
import 
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/ >} />
      </Routes>
    </>
  )
}

export default App
