import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element }) => {
    const user = useSelector((state) => state.user);

    if (!user.loggedIn && user.name !== 'adminka') {
        return <Navigate to="/" />;
    }


    return element;
};

export default AdminRoute;
