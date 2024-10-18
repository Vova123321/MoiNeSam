import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Registration from './pages/Registation/Registration.jsx';
import Authorization from "./pages/Authorization/Authorization.jsx";
import CreateOrder from "./pages/CreateOrder/CreateOrder.jsx";
import ListOfOrders from "./pages/ListOfOrders/ListOfOrders.jsx";
import AdminPanel from "./pages/AdminPanel/AdminPanel.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute/ProtectedRoute.jsx";
import AdminRoute from "./Routes/AdminRoute/AdminRoute.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Registration />
    },
    {
        path: '/authorization',
        element: <Authorization />
    },
    {
        path: '/create_order',
        element: <ProtectedRoute element={<CreateOrder />} />  // Защищаем маршрут
    },
    {
        path: '/list_of_orders',
        element: <ProtectedRoute element={<ListOfOrders />} /> // Защищаем маршрут
    },
    {
        path: '/admin_panel',
        element: <AdminRoute element={<AdminPanel />} />       // Защищаем маршрут только для админа
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
);
