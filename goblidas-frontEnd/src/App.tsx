// =======================
// Importaciones de módulos y componentes
// =======================

import React, { useState } from 'react'
import './App.css' // Estilos globales
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // Solo íconos de Bootstrap

// Componentes de UI
import { NavBar } from './components/ui/NavBar/NavBar'
import { PieDePagina } from './components/ui/PieDePagina/PieDePagina'

// Pantallas principales
import { Home } from './components/screens/Home/Home'
import { Catalogo } from './components/screens/Catalogo/Catalogo'
import { VerProducto } from './components/screens/VerProducto/VerProducto'
import { Carrito } from './components/screens/Carrito/Carrito'
import { VerPerfil } from './components/screens/VerPerfil/VerPerfil'
import { Success } from './components/screens/Sucess/Success'
import { Pending } from './components/screens/Pending/Pending'
import { Failure } from './components/screens/Failure/Failure'
import { SelecionarDireccion } from './components/screens/SelecionarDireccion/SelecionarDireccion'
import { ConfirmarCompra } from './components/screens/ConfirmarCompra/ConfirmarCompra'
import { MisPedidos } from './components/screens/MisPedidos/MisPedidos'

// Pantallas de administración
import { AdminPanel } from './components/screens/Admin/AdminPanel'
import { DetalleProducto } from './components/screens/Admin/DetalleProducto/DetalleProducto'

// Rutas protegidas y de administración
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RequireAdmin } from './components/routes/RequireAdmin';
import { ProtectedRoute } from './components/routes/ProtectedRoute';

// =======================
// Componente principal de la aplicación
// =======================

function App() {
  return (
    <>
      {/* Enrutador principal de la aplicación */}
      <BrowserRouter>
        <div className="parent">
          {/* Barra de navegación superior */}
          <div className="NavBarApp">
            <NavBar />
          </div>
          {/* Contenedor principal de las pantallas */}
          <div className="Pantalla">
            {/* Definición de rutas de la aplicación */}
            <Routes>
              {/* Rutas públicas */}
              <Route path='/' element={<Home />} />
              <Route path='/catalogo' element={<Catalogo />} />
              <Route path='/verproducto' element={<VerProducto />} />
              <Route path='/carrito' element={<Carrito />} />
              {/* Rutas protegidas para usuarios autenticados */}
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
                path='/mis-pedidos'
                element={
                  <ProtectedRoute>
                    <MisPedidos />
                  </ProtectedRoute>
                }
              />
              {/* Rutas protegidas solo para administradores */}
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
            </Routes>
            {/* Pie de página visible en todas las pantallas */}
            <PieDePagina />
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
