import { ReactNode } from 'react';
import { useUsuarioStore } from '../../store/useUsuarioStore';
import { Navigate } from 'react-router-dom';

export const RequireAdmin = ({ children }: { children: ReactNode }) => {
    const usuario = useUsuarioStore(state => state.usuario);
    console.log('usuario en RequireAdmin:', usuario);

    if (usuario === undefined) {
        return null;
    }

    if (!usuario || usuario.role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};