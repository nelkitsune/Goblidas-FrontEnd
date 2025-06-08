import React, { ReactNode } from 'react';
import { useUsuarioStore } from '../../store/useUsuarioStore';
import { Navigate } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const usuario = useUsuarioStore(state => state.usuario);

    if (usuario === undefined) {
        return null; // O un loader
    }

    if (!usuario) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};