import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { Inicio } from './pages/Inicio'
import { Movies } from './pages/Movies'
import { MovieDetail } from './pages/MovieDetail'
import { Series } from './pages/Series'
import { SerieDetail } from './pages/SerieDetail'
import { Games } from './pages/Games'
import { Mylist } from './pages/Mylist'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={ <MovieDetail /> } />
        <Route path='/series' element={<Series />} />
        <Route path='/series/:id' element={<SerieDetail />} />
        <Route path='/games' element={<Games />} />
        <Route path='/mylist' element={<Mylist />} />
        <Route path='*' element={ <Navigate to={'/'} /> } />

      </Routes>
    </Router>
  )
}

export default App
