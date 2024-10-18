import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const user = useSelector((state) => state.user);

    if (!user.loggedIn) {
        return <Navigate to="/" />;
    }

    return element;
};

export default ProtectedRoute;
