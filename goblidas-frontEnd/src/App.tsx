import React, { useState } from 'react'
import './App.css'
import { NavBar } from './components/ui/NavBar/NavBar'
import { PieDePagina } from './components/ui/PieDePagina/PieDePagina'
import { Home } from './components/screens/Home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <div className="parent">
        <div className="NavBarApp"><NavBar /></div>
        <div className="Pantalla"> <Home /> </div>
        <div className="PieDePagina"> <PieDePagina /> </div>
      </div>
    </>
  )
}

export default App
