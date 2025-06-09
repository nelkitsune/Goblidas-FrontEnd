import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Producto } from '../types/producto'
import { Detalle } from '../types/detalle'
import { DetailsHTMLAttributes } from 'react'

type ProductoCarrito = Detalle & {
    cantidad: number
}

type CarritoState = {
    productos: ProductoCarrito[]
    agregarProducto: (producto: ProductoCarrito) => void
    quitarProducto: (id: number) => void
    vaciarCarrito: () => void
    cambiarCantidad: (id: number, cantidad: number) => void
}

export const useCarritoStore = create<CarritoState>(
    persist(
        (set) => ({
            productos: [],
            agregarProducto: (producto) =>
                set((state) => {
                    const existe = state.productos.find((p) => p.id === producto.id)
                    if (existe) {
                        return {
                            productos: state.productos.map((p) =>
                                p.id === producto.id
                                    ? { ...p, cantidad: p.cantidad + producto.cantidad }
                                    : p
                            ),
                        }
                    }
                    return { productos: [...state.productos, producto] }
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
            name: 'carrito-storage', // clave en localStorage
        }
    )
)