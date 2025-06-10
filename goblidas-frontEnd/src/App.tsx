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
import { Success } from './components/screens/Sucess/Success'
import { Pending } from './components/screens/Pending/Pending'
import { Failure } from './components/screens/Failure/Failure'
import { SelecionarDireccion } from './components/screens/SelecionarDireccion/SelecionarDireccion'
import { AdminPanel } from './components/screens/Admin/AdminPanel'
import { DetalleProducto } from './components/screens/Admin/DetalleProducto/DetalleProducto'
import { RequireAdmin } from './components/routes/RequireAdmin';
import { ConfirmarCompra } from './components/screens/ConfirmarCompra/ConfirmarCompra';
import { MisPedidos } from './components/screens/MisPedidos/MisPedidos';
import { ProtectedRoute } from './components/routes/ProtectedRoute';

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
              <Route
                path='/verperfil'
                element={
                  <ProtectedRoute>
                    <VerPerfil />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/success'
                element={
                  <ProtectedRoute>
                    <Success />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/pending'
                element={
                  <ProtectedRoute>
                    <Pending />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/failure'
                element={
                  <ProtectedRoute>
                    <Failure />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/seleccionar-direccion'
                element={
                  <ProtectedRoute requireCart>
                    <SelecionarDireccion />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/confirmar-compra'
                element={
                  <ProtectedRoute requireCart>
                    <ConfirmarCompra />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/productos"
                element={
                  <RequireAdmin>
                    <AdminPanel />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/productos/:id"
                element={
                  <RequireAdmin>
                    <DetalleProducto />
                  </RequireAdmin>
                }
              />
              <Route
                path='/mis-pedidos'
                element={
                  <ProtectedRoute>
                    <MisPedidos />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <PieDePagina />
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
