// =======================
// Importaciones
// =======================

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Detalle } from '../types/detalle'

// =======================
// Tipos y estado del carrito
// =======================

type ProductoCarrito = Detalle & {
    cantidad: number // Cantidad de este producto en el carrito
}

type CarritoState = {
    productos: ProductoCarrito[] // Productos en el carrito
    agregarProducto: (producto: ProductoCarrito) => void // Agrega o suma cantidad de un producto
    quitarProducto: (id: number) => void // Elimina un producto por id
    vaciarCarrito: () => void // Vacía todo el carrito
    cambiarCantidad: (id: number, cantidad: number) => void // Cambia la cantidad de un producto
}

// Tipado para persistencia


// =======================
// Store del carrito con persistencia en localStorage
// =======================

export const useCarritoStore = create<CarritoState>()(
    persist<CarritoState>(
        (set) => ({
            productos: [],
            agregarProducto: (producto) =>
                set((state) => {
                    // Si el producto ya existe, suma la cantidad (sin superar el stock)
                    const existe = state.productos.find((p) => p.id === producto.id)
                    if (existe) {
                        const nuevaCantidad = Math.min(
                            existe.cantidad + producto.cantidad,
                            producto.stock
                        );
                        return {
                            productos: state.productos.map((p) =>
                                p.id === producto.id
                                    ? { ...p, cantidad: nuevaCantidad }
                                    : p
                            ),
                        }
                    }
                    // Si no existe, lo agrega con la cantidad limitada al stock
                    return { productos: [...state.productos, { ...producto, cantidad: Math.min(producto.cantidad, producto.stock) }] }
                }),
            quitarProducto: (id) =>
                set((state) => ({
                    productos: state.productos.filter((p) => p.id !== id),
                })),
            vaciarCarrito: () => set({ productos: [] }),
            cambiarCantidad: (id, cantidad) =>
                set((state) => ({
                    productos: state.productos.map((p) =>
                        p.id === id ? { ...p, cantidad } : p
                    ),
                })),
        }),
        {
            name: 'carrito-storage', // Clave de almacenamiento en localStorage
        }
    )
)