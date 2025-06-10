import React, { useEffect, useState } from 'react';
import { getProductos, postProducto, putProducto, deleteProducto } from '../../../service/productsService';
import { Producto } from '../../../types/producto';
import { useNavigate } from 'react-router-dom';
import { postSize } from '../../../service/sizeService';
import { getCategory, postCategory } from '../../../service/categoryService';
import { postDiscountPrice } from '../../../service/discountprice';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import './TablaProductoEtilo.css';

const productoSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es obligatorio'),
  productType: Yup.string().required('El tipo de producto es obligatorio'),
  gender: Yup.string().required('El género es obligatorio'),
  categoriesIds: Yup.array().min(1, 'Debe seleccionar al menos una categoría'),
});

const talleSchema = Yup.object().shape({
  number: Yup.string().required('El número de talle es obligatorio'),
});

const categoriaSchema = Yup.object().shape({
  name: Yup.string().required('El nombre de la categoría es obligatorio'),
});

const descuentoSchema = Yup.object().shape({
  fecha_inicio: Yup.string().required('La fecha de inicio es obligatoria'),
  fecha_final: Yup.string().required('La fecha final es obligatoria'),
  porcentaje: Yup.number()
    .min(1, 'El porcentaje debe ser mayor a 0')
    .max(100, 'El porcentaje no puede ser mayor a 100')
    .required('El porcentaje es obligatorio'),
});

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
    highlighted: false,
    active: true
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
      await productoSchema.validate(nuevoProducto, { abortEarly: false });
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
        highlighted: false,
        active: true
      });
      setMostrarModal(false);
      await cargarProductos();
      Swal.fire('¡Éxito!', 'Producto creado correctamente', 'success');
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        Swal.fire('Error de validación', err.errors.join('<br>'), 'error');
      } else {
        Swal.fire('Error', err?.message || 'Error desconocido', 'error');
      }
    }
  };

  // -------------------- Eliminar producto --------------------
  const handleEliminar = async (id?: number) => {
    if (!id) return;
    const result = await Swal.fire({
      title: '¿Seguro que deseas eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (!result.isConfirmed) return;
    try {
      await deleteProducto(id);
      await cargarProductos();
      Swal.fire('Eliminado', 'Producto eliminado correctamente', 'success');
    } catch (err) {
      Swal.fire('Error', 'Error al eliminar producto', 'error');
    }
  };

  // -------------------- Editar producto --------------------
  const handleEditarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editando || !editando.id) return;
    try {
      await productoSchema.validate(editando, { abortEarly: false });
      const productoParaEnviar = { ...editando };
      await putProducto(editando.id, productoParaEnviar);
      setEditando(null);
      await cargarProductos();
      Swal.fire('¡Éxito!', 'Producto actualizado correctamente', 'success');
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        Swal.fire('Error de validación', err.errors.join('<br>'), 'error');
      } else {
        Swal.fire('Error', err?.message || 'Error desconocido', 'error');
      }
    }
  };

  const handleEditarChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target as any;
    if (!editando) return;
    if (type === 'checkbox') {
      setEditando({ ...editando, [name]: (target as HTMLInputElement).checked });
    } else if (target instanceof HTMLSelectElement && name === "categoriesIds" && target.multiple) {
      // Si algún día usas select múltiple en editar
      const selected = Array.from(target.options)
        .filter(option => option.selected)
        .map(option => categorias.find(cat => cat.id === Number(option.value)))
        .filter(Boolean);
      setEditando({ ...editando, categoriesIds: selected });
    } else {
      setEditando({ ...editando, [name]: value });
    }
  };

  // -------------------- Agregar talle --------------------
  const handleAgregarTalle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await talleSchema.validate(nuevoTalle, { abortEarly: false });
      await postSize({ number: nuevoTalle.number });
      setNuevoTalle({ number: '' });
      setMostrarTalle(false);
      Swal.fire('¡Éxito!', 'Talle creado correctamente', 'success');
      // Si quieres recargar talles, hazlo aquí
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        Swal.fire('Error de validación', err.errors.join('<br>'), 'error');
      } else {
        Swal.fire('Error', err?.message || 'Error desconocido', 'error');
      }
    }
  };

  // -------------------- Agregar categoria --------------------
  const handleAgregarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await categoriaSchema.validate(nuevaCategoria, { abortEarly: false });
      await postCategory(nuevaCategoria);
      setNuevaCategoria({ name: '' });
      setMostrarCategoria(false);
      Swal.fire('¡Éxito!', 'Categoría creada correctamente', 'success');
      // Recargar categorías aquí:
      const data = await getCategory();
      setCategorias(data);
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        Swal.fire('Error de validación', err.errors.join('<br>'), 'error');
      } else {
        Swal.fire('Error', err?.message || 'Error desconocido', 'error');
      }
    }
  };

  // -------------------- Agregar descuento --------------------
  const handleAgregarDescuento = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await descuentoSchema.validate(nuevoDescuento, { abortEarly: false });
      const addSeconds = (dateStr: string) => dateStr.length === 16 ? dateStr + ':00' : dateStr;
      const descuentoParaEnviar = {
        initialDate: addSeconds(nuevoDescuento.fecha_inicio),
        finalDate: addSeconds(nuevoDescuento.fecha_final),
        percentage: nuevoDescuento.porcentaje
      };
      await postDiscountPrice(descuentoParaEnviar);
      setMostrarDescuento(false);
      setNuevoDescuento({ fecha_inicio: '', fecha_final: '', porcentaje: 0 });
      Swal.fire('¡Éxito!', 'Descuento creado correctamente', 'success');
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        Swal.fire('Error de validación', err.errors.join('<br>'), 'error');
      } else {
        Swal.fire('Error', err?.message || 'Error desconocido', 'error');
      }
    }
  };

  // -------------------- Render --------------------
  return (
    <div className="tabla-prod-container">
      <h3>Productos</h3>
      <button className="tabla-prod-btn" onClick={() => setMostrarModal(true)}>Agregar producto</button>
      <button className="tabla-prod-btn" onClick={() => setMostrarTalle(!mostrarTalle)}>Agregar un Talle</button>
      <button className="tabla-prod-btn" onClick={() => setMostrarCategoria(!mostrarCategoria)}>Agregar una Categoría</button>
      <button className="tabla-prod-btn" onClick={() => setMostrarDescuento(true)}>Crear un Descuento</button>

      {mostrarDescuento && (
        <div className="tabla-prod-modal">
          <form className="tabla-prod-form" onSubmit={handleAgregarDescuento}>
            <h4>Nuevo descuento</h4>
            <input
              type="datetime-local"
              name="fecha_inicio"
              value={nuevoDescuento.fecha_inicio}
              onChange={e => setNuevoDescuento({ ...nuevoDescuento, fecha_inicio: e.target.value })}
              required
              placeholder="Fecha inicio"
            />
            <input
              type="datetime-local"
              name="fecha_final"
              value={nuevoDescuento.fecha_final}
              onChange={e => setNuevoDescuento({ ...nuevoDescuento, fecha_final: e.target.value })}
              required
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
              placeholder="Porcentaje"
            />
            <button className="tabla-prod-btn" type="submit">Guardar descuento</button>
            <button className="tabla-prod-btn" type="button" onClick={() => setMostrarDescuento(false)}>Cancelar</button>
          </form>
        </div>
      )}

      {mostrarTalle && (
        <form className="tabla-prod-form" onSubmit={handleAgregarTalle}>
          <input
            type="text"
            placeholder="Número de talle"
            value={nuevoTalle.number}
            onChange={e => setNuevoTalle({ number: e.target.value })}
            required
          />
          <button className="tabla-prod-btn" type="submit">Guardar talle</button>
          <button className="tabla-prod-btn" type="button" onClick={() => setMostrarTalle(false)}>Cancelar</button>
        </form>
      )}

      {mostrarCategoria && (
        <form className="tabla-prod-form" onSubmit={handleAgregarCategoria}>
          <input
            type="text"
            placeholder="Nombre de categoría"
            value={nuevaCategoria.name}
            onChange={e => setNuevaCategoria({ name: e.target.value })}
            required
          />
          <button className="tabla-prod-btn" type="submit">Guardar categoría</button>
          <button className="tabla-prod-btn" type="button" onClick={() => setMostrarCategoria(false)}>Cancelar</button>
        </form>
      )}

      {mostrarModal && (
        <div className="tabla-prod-modal">
          <form className="tabla-prod-form" onSubmit={handleSubmit}>
            <h4>Nuevo producto</h4>
            <input name="name" placeholder="Nombre" value={nuevoProducto.name} onChange={handleChange} required />
            <select
              name="productType"
              value={nuevoProducto.productType}
              onChange={handleChange}
              required
            >
              <option value="">Tipo de producto</option>
              <option value="Zapatilla">Zapatilla</option>
              <option value="Remera">Remera</option>
              <option value="Pantalon">Pantalón</option>
              <option value="Gorra">Gorra</option>
              <option value="Abrigo">Abrigo</option>
              <option value="Otro Producto">Otro Producto</option>
            </select>
            <select
              name="gender"
              value={nuevoProducto.gender}
              onChange={handleChange}
              required
            >
              <option value="">Género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Unisex">Unisex</option>
            </select>
            <label>Categorías:</label>
            <select
              name="categoriesIds"
              multiple
              value={nuevoProducto.categoriesIds.map((cat: any) => cat.id)}
              onChange={handleChange}
              style={{ height: 80 }}
            >
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <div>
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
            <button className="tabla-prod-btn" type="submit">Guardar y cerrar</button>
            <button
              className="tabla-prod-btn"
              type="button"
              onClick={() => {
                setMostrarModal(false);
                setNuevoProducto({
                  id: 0,
                  productType: '',
                  categoriesIds: [],
                  name: '',
                  gender: '',
                  details: [],
                  highlighted: false,
                  active: true
                });
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

      {editando && (
        <div className="tabla-prod-modal">
          <form className="tabla-prod-form" onSubmit={handleEditarSubmit}>
            <h4>Editar producto</h4>
            <input name="name" placeholder="Nombre" value={editando.name} onChange={handleEditarChange} required />
            <select
              name="productType"
              value={editando.productType}
              onChange={handleEditarChange}
              required
            >
              <option value="">Tipo de producto</option>
              <option value="Zapatilla">Zapatilla</option>
              <option value="Remera">Remera</option>
              <option value="Pantalon">Pantalón</option>
              <option value="Gorra">Gorra</option>
              <option value="Abrigo">Abrigo</option>
              <option value="Otro Producto">Otro Producto</option>
            </select>
            <select
              name="gender"
              value={editando.gender}
              onChange={handleEditarChange}
              required
            >
              <option value="">Género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Unisex">Unisex</option>
            </select>
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
              style={{ height: 80 }}
            >
              {categorias
                .filter(cat => !editando.categoriesIds.some((c: any) => c.id === cat.id))
                .map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
            <div>
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
            <button className="tabla-prod-btn" type="submit">Guardar cambios</button>
            <button className="tabla-prod-btn" type="button" onClick={() => setEditando(null)}>Cancelar</button>
          </form>
        </div>
      )}

      <div className="tabla-prod-table-wrapper">
        <table className="tabla-prod-table">
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
            {productos
              .filter(prod => prod.active === true)
              .map(prod => (
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
                    <button className="tabla-prod-btn" onClick={() => navigate(`/admin/productos/${prod.id}`)}>Ver</button>
                    <button className="tabla-prod-btn" onClick={() => setEditando(prod)}>Editar</button>
                    <button className="tabla-prod-btn" onClick={() => handleEliminar(prod.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};