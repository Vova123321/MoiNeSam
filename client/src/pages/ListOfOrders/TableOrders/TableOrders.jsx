import React, { useEffect, useState } from 'react';
import styles from './TableOrders.module.css';
import clsx from "clsx";
import {useSelector} from "react-redux";

const STATUS = {
    success: 'Завершено',
    pending: 'В процессе',
    delete: 'Отменено'
}

const TableOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userName = useSelector((state) => state.user.user_id);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/orders?user_id=${userName}`);
                if (!response.ok) {
                    throw new Error('Сетевая ошибка, попробуйте снова');
                }
                const data = await response.json();
                setOrders(data.orders);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userName]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка при загрузке заказов: {error.message}</div>;
    }

    return (
        <div className={styles.orderTableContainer}>
            <h2 className={styles.title}>История заказов</h2>
            <table className={styles.orderTable}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Адрес</th>
                    <th>Телефон</th>
                    <th>Дата заявки</th>
                    <th>Время</th>
                    <th>Вид услуги</th>
                    <th>Комментарий</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td data-label="#"> {order.id}</td>
                        <td data-label="Адрес">{order.address}</td>
                        <td data-label="Телефон">{order.phone}</td>
                        <td data-label="Дата заявки">{order.date}</td>
                        <td data-label="Время">{order.time}</td>
                        <td data-label="Вид услуги">{order.service}</td>
                        {order.status === STATUS.delete ? (
                            <td data-label="Причина">{order.reason}</td>
                        ) : (
                            <td data-label="Комментарий">Спасибо за заказ!</td>
                        )}
                        <td data-label="Статус" className={clsx(order.status === STATUS.success && styles['status-completed'],
                            order.status === STATUS.pending && styles['status-in-progress'],
                            order.status === STATUS.delete && styles['status-cancelled'])}>{order.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableOrders;
