import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    token: string | null | undefined;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ token }) => {
    const isAuthenticated = token !== null && token !== undefined && token !== '';   
    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
