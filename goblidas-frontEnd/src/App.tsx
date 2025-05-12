import React, { useState } from 'react'
import './App.css'
import { NavBar } from './components/ui/NavBar/NavBar'
import { PieDePagina } from './components/ui/PieDePagina/PieDePagina'
import { Home } from './components/screens/Home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Catalogo } from './components/screens/Catalogo/Catalogo'

function App() {

  return (
    <>
      <div className="parent">
        <div className="NavBarApp"><NavBar /></div>
        <div className="Pantalla">
          <Catalogo />
          <PieDePagina />
        </div>
      </div>
    </>
  )
}

export default App
