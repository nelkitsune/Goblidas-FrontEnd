import React, { useState } from 'react';
import { TablaProductos } from './TablaProductos';
import { TablaUsuarios } from './TablaUsuarios';
import './AdminPanelEstilo.css';

export const AdminPanel = () => {
  const [vista, setVista] = useState<'productos' | 'usuarios'>('productos');

  return (
    <div className="admin-panel-container">
      <h2 className="admin-panel-title">Panel de Administración</h2>
      <p className="admin-panel-bienvenida">Bienvenido/a administrador/a.</p>
      <div className="admin-panel-btns">
        <button
          className={`admin-panel-btn${vista === 'productos' ? ' active' : ''}`}
          onClick={() => setVista('productos')}
        >
          Productos
        </button>
        <button
          className={`admin-panel-btn${vista === 'usuarios' ? ' active' : ''}`}
          onClick={() => setVista('usuarios')}
        >
          Usuarios
        </button>
      </div>
      {vista === 'productos' ? <TablaProductos /> : <TablaUsuarios />}
    </div>
  );
};