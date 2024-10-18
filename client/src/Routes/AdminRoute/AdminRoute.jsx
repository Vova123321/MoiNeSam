import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element }) => {
    const user = useSelector((state) => state.user);

    if (!user.loggedIn && user.name !== 'admin') {
        return <Navigate to="/list_of_orders" />;
    }


    return element;
};

export default AdminRoute;