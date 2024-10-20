import React, {useState} from 'react';
import styles from './Orders.module.css'
import clsx from 'clsx';
const Orders = () => {

    const STATUS = {
        new: 'Новый',
        success: 'Завершено',
        pending: 'В процессе',
        delete: 'Отменено',
    };

    const [orders, setOrders] = useState([
        {
            id: 1,
            customerName: 'Иван Иванов',
            address: 'ул. Ленина, 25, Москва',
            phone: '+7(999)-123-45-67',
            date: '2024-10-18',
            time: '10:30',
            service: 'Чистка ковров',
            status: STATUS.new,
        },
        {
            id: 2,
            customerName: 'Петр Петров',
            address: 'ул. Пушкина, 10, Санкт-Петербург',
            phone: '+7(912)-456-78-90',
            date: '2024-10-15',
            time: '12:00',
            service: 'Мойка окон',
            status: STATUS.success,
        },
        {
            id: 3,
            customerName: 'Андрей Андреев',
            address: 'проспект Мира, 50, Казань',
            phone: '+7(915)-987-65-43',
            date: '2024-10-12',
            time: '09:00',
            service: 'Химчистка мебели',
            status: STATUS.pending,
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [cancelComment, setCancelComment] = useState('');

    const handleStatusChange = (orderId, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);

        if (newStatus === STATUS.delete) {
            setCurrentOrder(orderId);
            setShowModal(true);
        }
    };

    const handleSaveCancelComment = () => {
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
                                onChange={e => handleStatusChange(order.id, e.target.value)}
                            >
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

            {/* Модальное окно для ввода комментария при отмене заказа */}
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