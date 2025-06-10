// =======================
// Importaciones
// =======================

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Producto } from '../types/producto'

// =======================
// Definición del estado y tipos
// =======================

type ProductoState = {
    productos: Producto[] // Lista de productos en memoria
    setProductos: (productos: Producto[]) => void // Reemplaza la lista de productos
    agregarProducto: (producto: Producto) => void // Agrega un producto a la lista
    quitarProducto: (id: number) => void // Elimina un producto por id
    actualizarProducto: (id: number, producto: Producto) => void // Actualiza un producto por id
    productoActivo: Producto | null // Producto actualmente seleccionado
    setProductoActivo: (producto: Producto | null) => void // Cambia el producto activo
    limpiarProductos: () => void // Limpia la lista de productos
}

// =======================
// Store de productos con persistencia parcial (solo productoActivo)
// =======================

export const useProductoStore = create<ProductoState>()(
    persist(
        (set) => ({
            productos: [],
            setProductos: (productos) => set({ productos }),
            agregarProducto: (producto) =>
                set((state) => ({
                    productos: [...state.productos, producto],
                })),
            quitarProducto: (id) =>
                set((state) => ({
                    productos: state.productos.filter((p) => p.id !== id),
                })),
            actualizarProducto: (id, producto) =>
                set((state) => ({
                    productos: state.productos.map((p) =>
                        p.id === id ? { ...p, ...producto } : p
                    ),
                })),
            productoActivo: null,
            setProductoActivo: (producto) => set({ productoActivo: producto }),
            limpiarProductos: () => set({ productos: [] }),
        }),
        {
            name: 'producto-activo-storage',
            partialize: (state) => ({ productoActivo: state.productoActivo }), // Solo persiste productoActivo
        }
    )
)