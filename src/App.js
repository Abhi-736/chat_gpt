import React from 'react'
import Home from './components/Home';
import ImgGenerator from './components/ImgGenerator';
import './style/style.scss';
import './style/mediaquery.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/imgGenerator' element={<ImgGenerator/>} />
      </Routes>
    </Router>

  )
}

export default App
