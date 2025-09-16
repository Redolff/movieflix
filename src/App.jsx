import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { Navbar } from './components/navbar/Navbar'
import { Inicio } from './pages/Inicio'
import { Movies } from './pages/movies/Movies'
import { MovieDetail } from './pages/movies/MovieDetail'
import { Series } from './pages/series/Series'
import { SerieDetail } from './pages/series/SerieDetail'
import { Games } from './pages/games/Games'
import { GameDetail } from './pages/games/GameDetail'
import { Mylist } from './pages/Mylist'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { AdminLayout } from './pages/admin/layout/AdminLayout'
import { Dashboard } from './pages/admin/dashboard/Dashboard'
import { MoviesAdmin } from './pages/admin/movies/MoviesAdmin'
import { SeriesAdmin } from './pages/admin/series/SeriesAdmin'
import { GamesAdmin } from './pages/admin/games/GamesAdmin'
import { UsersAdmin } from './pages/admin/users/UsersAdmin'
import { Login } from './pages/Login'
import { ProtectedRoute } from './pages/ProtectedRoute'

function App() {
  const [query, setQuery] = useState("")

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Navbar query={query} setQuery={setQuery} />
      <Routes>
        <Route path='/' element={<Inicio query={query} />} />
        <Route path='/login' element={<Login />} />

        <Route path='/admin'
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }>
          <Route index element={<Dashboard />} />
          <Route path='movies' element={<MoviesAdmin />} />
          <Route path='series' element={<SeriesAdmin />} />
          <Route path='games' element={<GamesAdmin />} />
          <Route path='users' element={<UsersAdmin />} />
        </Route>

        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetail />} />

        <Route path='/series' element={<Series />} />
        <Route path='/series/:id' element={<SerieDetail />} />

        <Route path='/games' element={<Games />} />
        <Route path='/games/:id' element={<GameDetail />} />

        <Route path='/mylist'
          element={
            <ProtectedRoute adminOnly>
              <Mylist />
            </ProtectedRoute>
          } />

        <Route path='*' element={<Navigate to={'/'} />} />

      </Routes>
    </Router>
  )
}

export default App
