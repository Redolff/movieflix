import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { Inicio } from './pages/Inicio'
import { Movies } from './pages/Movies'
import { Series } from './pages/Series'
import { Games } from './pages/Games'
import { Mylist } from './pages/Mylist'
import { MovieDetail } from './pages/MovieDetail'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/series' element={<Series />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={ <MovieDetail /> } />
        <Route path='/games' element={<Games />} />
        <Route path='/mylist' element={<Mylist />} />
        <Route path='*' element={ <Navigate to={'/'} /> } />

      </Routes>
    </Router>
  )
}

export default App
