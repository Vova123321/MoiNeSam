import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './CreateOrderForm.module.css';

const CreateOrderForm = () => {
    const userName = useSelector((state) => state.user.user_id);
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

    const handleSubmit = async (e) => {
        e.preventDefault();


        const filteredFormData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== undefined && value !== "")
        );

        const dataToSend = { ...filteredFormData, user_id: userName };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error("Failed to send the form data");
            }

            const data = await response.json();
            console.log("Server Response:", data);
            alert("Форма успешно отправлена!");
        } catch (error) {
            console.error("Error:", error);
            alert("Произошла ошибка при отправке формы.");
        }
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
