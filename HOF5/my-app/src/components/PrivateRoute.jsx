import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../Providers/hooks/useAuth';

const PrivateRoute = () => {
    const { auth } = useAuth();

    if (auth.user === undefined) {
        return <h1>Loading.....</h1>
    }

    return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
