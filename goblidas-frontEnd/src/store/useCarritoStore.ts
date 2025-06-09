import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
import { Detalle } from '../types/detalle'

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

// Tipar correctamente el persist
type MyPersist = PersistOptions<CarritoState>

export const useCarritoStore = create<CarritoState>()(
    persist<CarritoState>(
        (set) => ({
            productos: [],
            agregarProducto: (producto) =>
                set((state) => {
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
            name: 'carrito-storage',
        }
    )
)