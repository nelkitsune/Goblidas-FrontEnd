import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Producto } from '../types/producto'

type ProductoState = {
    productos: Producto[]
    setProductos: (productos: Producto[]) => void
    agregarProducto: (producto: Producto) => void
    quitarProducto: (id: number) => void
    actualizarProducto: (id: number, producto: Producto) => void
    productoActivo: Producto | null
    setProductoActivo: (producto: Producto | null) => void
    limpiarProductos: () => void
}

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