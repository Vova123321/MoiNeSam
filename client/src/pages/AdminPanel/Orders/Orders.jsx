import React, { useEffect, useState } from 'react';
import styles from './Orders.module.css';
import clsx from 'clsx';

const Orders = () => {
    const STATUS = {
        new: 'Новый',
        success: 'Завершено',
        pending: 'В процессе',
        delete: 'Отменено',
    };

    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [cancelComment, setCancelComment] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/orders/all');
                if (!response.ok) {
                    throw new Error('Ошибка загрузки заказов');
                }
                const data = await response.json();
                setOrders(data.orders);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        if (newStatus === STATUS.delete) {
            setCurrentOrder(orderId);
            setShowModal(true);
        } else {
            await updateOrderStatus(orderId, newStatus);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus,
                    reason: newStatus === STATUS.delete ? cancelComment : undefined,
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка обновления статуса заказа');
            }

            const updatedOrder = await response.json();
            setOrders(orders.map(order => (order.id === orderId ? updatedOrder.order : order)));
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleSaveCancelComment = async () => {
        await updateOrderStatus(currentOrder, STATUS.delete);

        const updatedOrders = orders.map(order =>
            order.id === currentOrder ? { ...order, reason: cancelComment } : order
        );

        setOrders(updatedOrders);
        setShowModal(false);
        setCancelComment('');
    };

    return (
        <div className={styles.orderTableContainer}>
            <h2 className={styles.title}>Заказы (Админ)</h2>
            <table className={styles.orderTable}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>ФИО</th>
                    <th>Адрес</th>
                    <th>Телефон</th>
                    <th>Дата и время</th>
                    <th>Услуга</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td data-label="#"> {order.id}</td>
                        <td data-label="ФИО">{order.customerName}</td>
                        <td data-label="Адрес">{order.address}</td>
                        <td data-label="Телефон">{order.phone}</td>
                        <td data-label="Дата и время">
                            {order.date} {order.time}
                        </td>
                        <td data-label="Услуга">{order.service}</td>
                        <td data-label="Статус">
                            <select
                                value={order.status}
                                onChange={e => handleStatusChange(order.id, e.target.value)}>
                                <option value={STATUS.new}>{STATUS.new}</option>
                                <option value={STATUS.pending}>{STATUS.pending}</option>
                                <option value={STATUS.success}>{STATUS.success}</option>
                                <option value={STATUS.delete}>{STATUS.delete}</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Причина отмены</h3>
                        <textarea
                            value={cancelComment}
                            onChange={e => setCancelComment(e.target.value)}
                            placeholder="Введите причину отмены"
                        />
                        <button onClick={handleSaveCancelComment}>Сохранить</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
