import { create } from 'zustand';
import { Usuario } from '../types/usuario';

type UsuarioState = {
    usuario: Usuario | null;
    setUsuario: (usuario: Usuario) => void;
    limpiarUsuario: () => void;
};

export const useUsuarioStore = create<UsuarioState>((set) => ({
    usuario: null, // o undefined
    setUsuario: (usuario) => set({ usuario }),
    limpiarUsuario: () => set({ usuario: null }),
}));

