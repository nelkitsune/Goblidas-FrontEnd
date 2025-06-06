import React, { useState } from 'react'
import './App.css'
import { NavBar } from './components/ui/NavBar/NavBar'
import { PieDePagina } from './components/ui/PieDePagina/PieDePagina'
import { Home } from './components/screens/Home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Catalogo } from './components/screens/Catalogo/Catalogo'
import { VerProducto } from './components/screens/VerProducto/VerProducto'
import { Carrito } from './components/screens/Carrito/Carrito'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { VerPerfil } from './components/screens/VerPerfil/VerPerfil'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="parent">
          <div className="NavBarApp"><NavBar /></div>
          <div className="Pantalla">

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/catalogo' element={<Catalogo />} />
              <Route path='/verproducto' element={<VerProducto />} />
              <Route path='/carrito' element={<Carrito />} />
              <Route path='/verperfil' element={<VerPerfil />} />
            </Routes>
            <PieDePagina />
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
