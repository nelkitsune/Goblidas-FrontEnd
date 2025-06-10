// =======================
// Importaciones
// =======================

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Usuario } from '../types/usuario'
import { useCarritoStore } from './useCarritoStore' // Permite manipular el carrito desde el store de usuario

// =======================
// Definición del estado y tipos
// =======================

type UsuarioState = {
    usuario: Usuario | null // Usuario autenticado o null si no hay sesión
    setUsuario: (usuario: Usuario | null) => void // Establece el usuario
    logout: () => void // Cierra sesión y limpia datos relacionados
}

// =======================
// Store de usuario con persistencia en localStorage
// =======================

export const useUsuarioStore = create<UsuarioState>()(
    persist(
        (set) => ({
            usuario: null,
            setUsuario: (usuario) => set({ usuario }),
            logout: () => {
                set({ usuario: null }) // Borra el usuario
                useCarritoStore.getState().vaciarCarrito() // Vacía el carrito al cerrar sesión
            },
        }),
        {
            name: 'usuario-storage', // Clave de almacenamiento en localStorage
        }
    )
)

