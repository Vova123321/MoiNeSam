import React, { useState } from 'react';
import styles from './CreateOrderForm.module.css';

const CreateOrderForm = () => {
    const [formData, setFormData] = useState({
        address: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        otherService: ''
    });

    const services = [
        'Общий клининг',
        'Генеральная уборка',
        'Послестроительная уборка',
        'Химчистка ковров и мебели',
        'Иная услуга'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Форма успешно отправлена!");
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Выбор заказа</h2>
            <form onSubmit={handleSubmit} className={styles.orderForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="address">Адрес</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Введите адрес"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phone">Номер телефона</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Введите номер телефона"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="date">Дата проведения услуги</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="time">Время проведения услуги</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="service">Выбор услуги</label>
                    <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Выберите услугу</option>
                        {services.map((service, index) => (
                            <option key={index} value={service}>{service}</option>
                        ))}
                    </select>
                </div>


                {formData.service === 'Иная услуга' && (
                    <div className={styles.formGroup}>
                        <label htmlFor="otherService">Введите нужную услугу</label>
                        <input
                            type="text"
                            id="otherService"
                            name="otherService"
                            value={formData.otherService}
                            onChange={handleChange}
                            placeholder="Введите вашу услугу"
                        />
                    </div>
                )}

                <button type="submit" className={styles.submitButton}>Отправить заказ</button>
            </form>
        </div>
    );
};

export default CreateOrderForm;
