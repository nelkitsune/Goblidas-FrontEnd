import React, { useEffect, useState } from 'react';
import { getProductos, postProducto, putProducto, deleteProducto } from '../../../service/productsService';
import { Producto } from '../../../types/producto';
import { useNavigate } from 'react-router-dom';
import { postSize } from '../../../service/sizeService'; // Asegúrate de tener este servicio
import { getCategory, postCategory } from '../../../service/categoryService';
import { postDiscountPrice } from '../../../service/discountprice';

// ... Tipado de Producto ...

export const TablaProductos = () => {
  // -------------------- Estados --------------------
  const [productos, setProductos] = useState<Producto[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState<Producto>({
    id: 0,
    productType: '',
    categoriesIds: [],
    name: '',
    gender: '',
    details: [],
    highlighted: false
  });
  const [editando, setEditando] = useState<Producto | null>(null);
  const [mostrarTalle, setMostrarTalle] = useState(false);
  const [nuevoTalle, setNuevoTalle] = useState({ number: '' });
  const [categorias, setCategorias] = useState<any[]>([]);
  const [mostrarCategoria, setMostrarCategoria] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({ name: '' });
  const [mostrarDescuento, setMostrarDescuento] = useState(false);
  const [nuevoDescuento, setNuevoDescuento] = useState({
    fecha_inicio: '',
    fecha_final: '',
    porcentaje: 0
  });
  const navigate = useNavigate();

  // -------------------- Cargar productos --------------------
  const cargarProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      console.error('🔴 [TablaProductos] Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // -------------------- Cargar categorias --------------------
  useEffect(() => {
    const cargarCategorias = async () => {
      const data = await getCategory();
      setCategorias(data);
    };
    cargarCategorias();
  }, []);

  // -------------------- Handlers de formulario --------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value } = target as any;
    if (target instanceof HTMLSelectElement && name === "categoriesIds" && target.multiple) {
      // Para el select multiple de categorías
      const selected = Array.from(target.options)
        .filter(option => option.selected)
        .map(option => categorias.find(cat => cat.id === Number(option.value)))
        .filter(Boolean);
      setNuevoProducto({ ...nuevoProducto, categoriesIds: selected });
    } else if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setNuevoProducto({ ...nuevoProducto, [name]: target.checked });
    } else {
      setNuevoProducto({ ...nuevoProducto, [name]: value });
    }
  };

  // -------------------- Crear producto --------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Elimina el id si es 0 o null antes de enviar
      const { id, ...rest } = nuevoProducto;
      const productoParaEnviar = { ...rest };
      await postProducto(productoParaEnviar);

      setNuevoProducto({
        id: 0,
        productType: '',
        categoriesIds: [],
        name: '',
        gender: '',
        details: [],
        highlighted: false
      });
      await cargarProductos();
    } catch (err: any) {
      console.error('Error al crear producto:', err);
      alert(`Error al crear producto: ${err?.message || 'Error desconocido'}`);
    }
  };

  // -------------------- Eliminar producto --------------------
  const handleEliminar = async (id?: number) => {
    if (!id) return;
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      await deleteProducto(id);
      await cargarProductos();
    } catch (err) {
      console.error('Error al eliminar producto:', err);
    }
  };

  // -------------------- Editar producto --------------------
  const handleEditarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editando || !editando.id) return;
    try {
      const productoParaEnviar = {
        ...editando,
        // ...aquí puedes agregar lógica para detalles si es necesario...
      };

      await putProducto(editando.id, productoParaEnviar);
      setEditando(null);
      await cargarProductos();
    } catch (err) {
      console.error('Error al actualizar producto:', err);
    }
  };

  const handleEditarChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    if (!editando) return;
    if (type === 'checkbox') {
      setEditando({ ...editando, [name]: target.checked });
    } else {
      setEditando({ ...editando, [name]: value });
    }
  };

  // -------------------- Agregar talle --------------------
  const handleAgregarTalle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postSize({ number: nuevoTalle.number });
      setNuevoTalle({ number: '' });
      setMostrarTalle(false);
      alert('Talle creado correctamente');
      // Si quieres recargar talles, hazlo aquí
    } catch (err) {
      alert('Error al crear talle');
    }
  };

  // -------------------- Agregar categoria --------------------
  const handleAgregarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postCategory(nuevaCategoria);
      setNuevaCategoria({ name: '' });
      setMostrarCategoria(false);
      alert('Categoría creada correctamente');
      // Si quieres recargar categorías, hazlo aquí
    } catch (err) {
      alert('Error al crear categoría');
    }
  };

  // -------------------- Render --------------------
  return (
    <div>
      <h3>Productos</h3>
      <button onClick={() => setMostrarModal(true)} style={{ marginBottom: 12 }}>Agregar producto</button>
      <button onClick={() => setMostrarTalle(!mostrarTalle)}>Agregar un Talle</button>
      <button onClick={() => setMostrarCategoria(!mostrarCategoria)}>Agregar una Categoría</button>
      <button onClick={() => setMostrarDescuento(true)}>Crear un Descuento</button>

      {mostrarDescuento && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <form
            style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, maxWidth: 400 }}
            onSubmit={async (e) => {
              e.preventDefault();
              console.log(nuevoDescuento); // <-- Agrega esto para depurar
              try {
                await postDiscountPrice(nuevoDescuento);
                setMostrarDescuento(false);
                setNuevoDescuento({ fecha_inicio: '', fecha_final: '', porcentaje: 0 });
                alert('Descuento creado correctamente');
              } catch (err) {
                alert('Error al crear descuento');
              }
            }}
          >
            <h4>Nuevo descuento</h4>
            <input
              type="datetime-local"
              name="fecha_inicio"
              value={nuevoDescuento.fecha_inicio}
              onChange={e => setNuevoDescuento({ ...nuevoDescuento, fecha_inicio: e.target.value })}
              required
              style={{ width: '100%', marginBottom: 8 }}
              placeholder="Fecha inicio"
            />
            <input
              type="datetime-local"
              name="fecha_final"
              value={nuevoDescuento.fecha_final}
              onChange={e => setNuevoDescuento({ ...nuevoDescuento, fecha_final: e.target.value })}
              required
              style={{ width: '100%', marginBottom: 8 }}
              placeholder="Fecha final"
            />
            <input
              type="number"
              name="porcentaje"
              value={nuevoDescuento.porcentaje}
              onChange={e => setNuevoDescuento({ ...nuevoDescuento, porcentaje: Number(e.target.value) })}
              required
              min={1}
              max={100}
              style={{ width: '100%', marginBottom: 8 }}
              placeholder="Porcentaje"
            />
            <button type="submit" style={{ marginTop: 12 }}>Guardar descuento</button>
            <button type="button" onClick={() => setMostrarDescuento(false)} style={{ marginLeft: 8 }}>Cancelar</button>
          </form>
        </div>
      )}
      {mostrarTalle && (
        <form onSubmit={handleAgregarTalle} style={{ margin: '12px 0', background: '#f5f5f5', padding: 12, borderRadius: 6 }}>
          <input
            type="text"
            placeholder="Número de talle"
            value={nuevoTalle.number}
            onChange={e => setNuevoTalle({ number: e.target.value })}
            required
            style={{ marginRight: 8 }}
          />
          <button type="submit">Guardar talle</button>
          <button type="button" onClick={() => setMostrarTalle(false)} style={{ marginLeft: 8 }}>Cancelar</button>
        </form>
      )}
      {mostrarCategoria && (
        <form onSubmit={handleAgregarCategoria} style={{ margin: '12px 0', background: '#f5f5f5', padding: 12, borderRadius: 6 }}>
          <input
            type="text"
            placeholder="Nombre de categoría"
            value={nuevaCategoria.name}
            onChange={e => setNuevaCategoria({ name: e.target.value })}
            required
            style={{ marginRight: 8 }}
          />
          <button type="submit">Guardar categoría</button>
          <button type="button" onClick={() => setMostrarCategoria(false)} style={{ marginLeft: 8 }}>Cancelar</button>
        </form>
      )}
      {mostrarModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <form
            style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, maxWidth: 400 }}
            onSubmit={handleSubmit}
          >
            <h4>Nuevo producto</h4>
            <input name="name" placeholder="Nombre" value={nuevoProducto.name} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
            <input name="productType" placeholder="Tipo de producto" value={nuevoProducto.productType} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
            <input name="gender" placeholder="Género" value={nuevoProducto.gender} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
            <label>Categorías:</label>
            <select
              name="categoriesIds"
              multiple
              value={nuevoProducto.categoriesIds.map((cat: any) => cat.id)}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: 8, height: 80 }}
            >
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <div style={{ marginBottom: 8 }}>
              <label>
                <input
                  type="checkbox"
                  name="highlighted"
                  checked={!!nuevoProducto.highlighted}
                  onChange={handleChange}
                />{' '}
                ¿Destacado?
              </label>
            </div>
            <button type="submit" style={{ marginTop: 12 }}>Guardar y cerrar</button>
            <button type="button" onClick={() => setMostrarModal(false)} style={{ marginLeft: 8 }}>Cancelar</button>
          </form>
        </div>
      )}
      {editando && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <form
            style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, maxWidth: 400 }}
            onSubmit={handleEditarSubmit}
          >
            <h4>Editar producto</h4>
            <input name="name" placeholder="Nombre" value={editando.name} onChange={handleEditarChange} required style={{ width: '100%', marginBottom: 8 }} />
            <input name="productType" placeholder="Tipo de producto" value={editando.productType} onChange={handleEditarChange} required style={{ width: '100%', marginBottom: 8 }} />
            <input name="gender" placeholder="Género" value={editando.gender} onChange={handleEditarChange} required style={{ width: '100%', marginBottom: 8 }} />
            <label>Categorías actuales:</label>
            <ul>
              {editando.categoriesIds.map((cat: any) => (
                <li key={cat.id}>{cat.name}</li>
              ))}
            </ul>
            <label>Agregar categorías:</label>
            <select
              multiple
              value={[]}
              onChange={e => {
                const selected = Array.from(e.target.selectedOptions, option => {
                  const id = Number(option.value);
                  return categorias.find(cat => cat.id === id);
                }).filter(Boolean);
                // Evita duplicados
                const nuevas = selected.filter(cat => !editando.categoriesIds.some((c: any) => c.id === cat.id));
                setEditando({ ...editando, categoriesIds: [...editando.categoriesIds, ...nuevas] });
              }}
              style={{ width: '100%', marginBottom: 8, height: 80 }}
            >
              {categorias
                .filter(cat => !editando.categoriesIds.some((c: any) => c.id === cat.id))
                .map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
            <div style={{ marginBottom: 8 }}>
              <label>
                <input
                  type="checkbox"
                  name="highlighted"
                  checked={!!editando.highlighted}
                  onChange={handleEditarChange}
                />{' '}
                ¿Destacado?
              </label>
            </div>
            <button type="submit" style={{ marginTop: 12 }}>Guardar cambios</button>
            <button type="button" onClick={() => setEditando(null)} style={{ marginLeft: 8 }}>Cancelar</button>
          </form>
        </div>
      )}
      <table border={1} cellPadding={8} style={{ width: '100%', background: '#fff' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Género</th>
            <th>Categorías</th>
            <th>¿Destacado?</th>
            <th>Detalles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.productType}</td>
              <td>{prod.gender}</td>
              <td>
                {prod.categoriesIds && Array.isArray(prod.categoriesIds)
                  ? prod.categoriesIds.map((cat: any) => cat.name).join(', ')
                  : ''}
              </td>
              <td><input type="checkbox" checked={prod.highlighted} disabled /></td>
              <td>{prod.details ? prod.details.length : 0}</td>
              <td>
                <button onClick={() => navigate(`/admin/productos/${prod.id}`)}>Ver</button>
                <button style={{ marginLeft: 4 }} onClick={() => setEditando(prod)}>Editar</button>
                <button style={{ marginLeft: 4 }} onClick={() => handleEliminar(prod.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};