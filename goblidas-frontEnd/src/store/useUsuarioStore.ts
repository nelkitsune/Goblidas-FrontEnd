import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Usuario } from '../types/usuario'
import { useCarritoStore } from './useCarritoStore' // <-- Agrega esta línea

type UsuarioState = {
    usuario: Usuario | null
    setUsuario: (usuario: Usuario | null) => void
    logout: () => void
}

export const useUsuarioStore = create<UsuarioState>()(
    persist(
        (set) => ({
            usuario: null,
            setUsuario: (usuario) => set({ usuario }),
            logout: () => {
                set({ usuario: null })
                useCarritoStore.getState().vaciarCarrito() // <-- Vacía el carrito al cerrar sesión
            },
        }),
        {
            name: 'usuario-storage', // clave en localStorage
        }
    )
)

