import { create } from 'zustand';
import { Detalle } from '../types/detalle';

type DetalleState = {
    detalles: Detalle[];
    setDetalles: (detalles: Detalle[]) => void;
    agregarDetalle: (detalle: Detalle) => void;
    quitarDetalle: (id: number) => void;
    actualizarDetalle: (id: number, detalle: Detalle) => void;
    detalleActivo: Detalle | null;
    setDetalleActivo: (detalle: Detalle | null) => void;
    limpiarDetalles: () => void;
};


export const useProductoStore = create<DetalleState>((set) => ({
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