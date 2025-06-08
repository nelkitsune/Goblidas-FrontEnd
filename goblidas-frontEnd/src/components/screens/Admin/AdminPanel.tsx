import React, { useState } from 'react';
import { TablaProductos } from './TablaProductos';
import { TablaUsuarios } from './TablaUsuarios';

export const AdminPanel = () => {
  const [vista, setVista] = useState<'productos' | 'usuarios'>('productos');

  return (
    <div style={{ padding: 24, background: "#fff", borderRadius: 8, minHeight: 500 }}>
      <h2>Panel de Administración</h2>
      <p>Bienvenido/a administrador/a.</p>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setVista('productos')}>Productos</button>
        <button onClick={() => setVista('usuarios')} style={{ marginLeft: 8 }}>Usuarios</button>
      </div>
      {vista === 'productos' ? <TablaProductos /> : <TablaUsuarios />}
    </div>
  );
}; 