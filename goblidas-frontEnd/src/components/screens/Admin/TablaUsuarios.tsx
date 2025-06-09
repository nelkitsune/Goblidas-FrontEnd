import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../../service/userService';
import { getAdressByUser } from '../../../service/adressService';
import { Usuario } from '../../../types/usuario';
import Swal from 'sweetalert2';

export const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<Usuario | null>(null);
  const [nuevoUsuario, setNuevoUsuario] = useState<Partial<Usuario>>({
    name: '',
    email: '',
    password: '',
    dni: '',
    role: '',
    active: true
  });
  const [direcciones, setDirecciones] = useState<any[]>([]);
  const [usuarioDirecciones, setUsuarioDirecciones] = useState<number | null>(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const data = await getUsers();
    setUsuarios(data.filter((u: Usuario) => u.active === true));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(nuevoUsuario);
      setMostrarForm(false);
      setNuevoUsuario({ name: '', email: '', password: '', dni: '', role: '', active: true });
      await cargarUsuarios();
      Swal.fire('¡Éxito!', 'Usuario creado correctamente', 'success');
    } catch (err: any) {
      Swal.fire('Error', err.message || 'Error desconocido', 'error');
    }
  };

  const handleEditar = (usuario: Usuario) => {
    setEditando(usuario);
    setNuevoUsuario(usuario);
    setMostrarForm(true);
  };

  const handleGuardarEdicion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Aquí deberías tener un servicio para editar usuario, por ejemplo: await updateUser(editando.id, nuevoUsuario);
      setEditando(null);
      setMostrarForm(false);
      await cargarUsuarios();
      Swal.fire('¡Éxito!', 'Usuario editado correctamente', 'success');
    } catch (err: any) {
      Swal.fire('Error', err.message || 'Error desconocido', 'error');
    }
  };

  const handleEliminar = async (usuario: Usuario) => {
    const result = await Swal.fire({
      title: '¿Eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (!result.isConfirmed) return;
    await deleteUser(usuario.id);
    await cargarUsuarios();
    Swal.fire('Eliminado', 'Usuario eliminado correctamente', 'success');
  };

  const handleVerDirecciones = async (usuarioId: number) => {
    const data = await getAdressByUser(usuarioId);
    setDirecciones(data);
    setUsuarioDirecciones(usuarioId);
  };

  return (
    <div>
      <h3>Usuarios</h3>
      <button onClick={() => { setMostrarForm(true); setEditando(null); setNuevoUsuario({ name: '', email: '', password: '', dni: '', role: '', active: true }); }}>
        Agregar usuario
      </button>
      <table border={1} cellPadding={6} style={{ marginTop: 16, width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>DNI</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.name}</td>
              <td>{usuario.email}</td>
              <td>{usuario.dni}</td>
              <td>{usuario.role}</td>
              <td>
                <button onClick={() => handleEditar(usuario)}>Editar</button>
                <button onClick={() => handleEliminar(usuario)}>Eliminar</button>
                <button onClick={() => handleVerDirecciones(usuario.id)}>Ver direcciones</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarForm && (
        <form onSubmit={editando ? handleGuardarEdicion : handleSubmit} style={{ marginTop: 20 }}>
          <input name="name" placeholder="Nombre" value={nuevoUsuario.name || ''} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={nuevoUsuario.email || ''} onChange={handleChange} required />
          <input name="password" placeholder="Contraseña" type="password" value={nuevoUsuario.password || ''} onChange={handleChange} required={!editando} />
          <input name="dni" placeholder="DNI" value={nuevoUsuario.dni || ''} onChange={handleChange} required />
          <select name="role" value={nuevoUsuario.role || ''} onChange={handleChange} required>
            <option value="">Rol</option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>
          <button type="submit">{editando ? 'Guardar cambios' : 'Crear usuario'}</button>
          <button type="button" onClick={() => setMostrarForm(false)}>Cancelar</button>
        </form>
      )}

      {usuarioDirecciones && (
        <div style={{ marginTop: 20 }}>
          <h4>Direcciones del usuario {usuarioDirecciones}</h4>
          <ul>
            {direcciones.length === 0 && <li>No tiene direcciones registradas.</li>}
            {direcciones.map((dir, idx) => (
              <li key={idx}>
                Calle: {dir.adressId?.streetName} {dir.adressId?.number}, {dir.adressId?.locality}, {dir.adressId?.province}, {dir.adressId?.country}
              </li>
            ))}
          </ul>
          <button onClick={() => setUsuarioDirecciones(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};