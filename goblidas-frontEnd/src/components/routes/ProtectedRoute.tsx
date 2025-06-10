import React, { ReactNode, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUsuarioStore } from '../../store/useUsuarioStore';
import { useCarritoStore } from '../../store/useCarritoStore';

interface Props {
    children: ReactNode;
    requireCart?: boolean;
}

export const ProtectedRoute: React.FC<Props> = ({ children, requireCart = false }) => {
    const usuario = useUsuarioStore(state => state.usuario);
    const productos = useCarritoStore(state => state.productos);
    const location = useLocation();
    const alertShown = useRef(false);

    // Si el usuario aún no está cargado, puedes mostrar un loader o null
    if (usuario === undefined) return null;

    // No logueado
    if (!usuario) {
        if (!alertShown.current) {
            Swal.fire({
                icon: 'warning',
                title: 'Debes iniciar sesión',
                text: 'Por favor, inicia sesión para continuar.',
                confirmButtonColor: '#7bd15f'
            });
            alertShown.current = true;
        }
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // Si requiere carrito y está vacío
    if (requireCart && (!productos || productos.length === 0)) {
        if (!alertShown.current) {
            Swal.fire({
                icon: 'info',
                title: 'Carrito vacío',
                text: 'Debes agregar productos al carrito antes de continuar.',
                confirmButtonColor: '#7bd15f'
            });
            alertShown.current = true;
        }
        return <Navigate to="/catalogo" replace />;
    }

    return <>{children}</>;
};