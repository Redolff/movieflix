import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { Navbar } from './components/navbar/Navbar'
import { Inicio } from './pages/Inicio'
import { Movies } from './pages/Movies'
import { MovieDetail } from './pages/MovieDetail'
import { Series } from './pages/Series'
import { SerieDetail } from './pages/SerieDetail'
import { Games } from './pages/Games'
import { Mylist } from './pages/Mylist'
import { GameDetail } from './pages/GameDetail'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { AdminLayout } from './pages/admin/layout/AdminLayout'
import { Dashboard } from './pages/admin/dashboard/Dashboard'
import { MoviesAdmin } from './pages/admin/movies/MoviesAdmin'
import { SeriesAdmin } from './pages/admin/series/SeriesAdmin'
import { GamesAdmin } from './pages/admin/games/GamesAdmin'
import { UsersAdmin } from './pages/admin/users/UsersAdmin'

function App() {
  const [query, setQuery] = useState("")

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Navbar query={query} setQuery={setQuery} />
      <Routes>
        <Route path='/' element={<Inicio query={query} />} />

        <Route path='/admin' element={<AdminLayout /> }>
          <Route index element={<Dashboard />} />
          <Route path='movies' element={ <MoviesAdmin /> } />
          <Route path='series' element={ <SeriesAdmin /> } />
          <Route path='games' element={ <GamesAdmin /> } />
          <Route path='users' element={ <UsersAdmin /> } />
        </Route>

        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={ <MovieDetail /> } />

        <Route path='/series' element={<Series />} />
        <Route path='/series/:id' element={<SerieDetail />} />

        <Route path='/games' element={<Games />} />
        <Route path='/games/:id' element={<GameDetail />} />

        <Route path='/mylist' element={<Mylist />} />

        <Route path='*' element={ <Navigate to={'/'} /> } />

      </Routes>
    </Router>
  )
}

export default App
