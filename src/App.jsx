import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Search from './pages/Search';

import Movies from './pages/Movies';
import DetailsPage from './pages/Movies/MovieDetails';
import TvSeries from './pages/TvSeries';
import HomeNav from './components/Navigation/HomeNav';


function App() {

  return (
    <div className='App'>
      <Router>
        <HomeNav />
        <Routes>
          <Route path={ '/' } element={ <Home /> } />
          <Route path={ '/search/:query' } element={ <Search /> } />

          <Route path={ '/movies' } element={ <Movies /> } />
          <Route path={ '/movies/:id' } element={ <DetailsPage /> } />
          <Route path={ '/movies/tv/series' } element={ <TvSeries /> } />
          <Route path={ '/movies/all/upcoming' } element={ <TvSeries /> } />
          {/* </Route> */ }

        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App
