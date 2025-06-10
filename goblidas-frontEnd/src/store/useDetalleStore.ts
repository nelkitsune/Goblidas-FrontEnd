// =======================
// Importaciones
// =======================

import { create } from 'zustand';
import { Detalle } from '../types/detalle';

// =======================
// Definición del estado y tipos
// =======================

type DetalleState = {
    detalles: Detalle[]; // Lista de detalles en memoria
    setDetalles: (detalles: Detalle[]) => void; // Reemplaza la lista de detalles
    agregarDetalle: (detalle: Detalle) => void; // Agrega un detalle a la lista
    quitarDetalle: (id: number) => void; // Elimina un detalle por id
    actualizarDetalle: (id: number, detalle: Detalle) => void; // Actualiza un detalle por id
    detalleActivo: Detalle | null; // Detalle actualmente seleccionado
    setDetalleActivo: (detalle: Detalle | null) => void; // Cambia el detalle activo
    limpiarDetalleActivo?: () => void; // Limpia el detalle activo (opcional)
    limpiarDetalles: () => void; // Limpia la lista de detalles
};

// =======================
// Store de detalles (no persistente)
// =======================

export const useDetalleStore = create<DetalleState>((set) => ({
    detalles: [],
    setDetalles: (detalles) => set({ detalles }),
    agregarDetalle: (detalle) =>
        set((state) => ({
            detalles: [...state.detalles, detalle],
        })),
    quitarDetalle: (id) =>
        set((state) => ({
            detalles: state.detalles.filter((d) => d.id !== id),
        })),
    actualizarDetalle: (id, detalle) =>
        set((state) => ({
            detalles: state.detalles.map((d) =>
                d.id === id ? { ...d, ...detalle } : d
            ),
        })),
    detalleActivo: null,
    setDetalleActivo: (producto) => set({ detalleActivo: producto }),
    limpiarDetalleActivo: () => set({ detalleActivo: null }),
    limpiarDetalles: () => set({ detalles: [] }),
}));