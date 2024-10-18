import React from 'react';
import styles from './TableOrders.module.css';
import clsx from "clsx";

const STATUS = {
    success: 'Завершено',
    pending: 'В процессе',
    delete: 'Отменено'
}

const TableOrders = () => {

    const orders = [
        {
            id: 1,
            address: 'ул. Ленина, 25, Москва',
            phone: '+7(999)-123-45-67',
            date: '2024-10-18',
            time: '10:30',
            service: 'Чистка ковров',
            status: STATUS.pending
        },
        {
            id: 2,
            address: 'ул. Пушкина, 10, Санкт-Петербург',
            phone: '+7(912)-456-78-90',
            date: '2024-10-15',
            time: '12:00',
            service: 'Мойка окон',
            status: STATUS.success
        },
        {
            id: 3,
            address: 'проспект Мира, 50, Казань',
            phone: '+7(915)-987-65-43',
            date: '2024-10-12',
            time: '09:00',
            service: 'Химчистка мебели',
            status: STATUS.delete
        }
    ];

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
