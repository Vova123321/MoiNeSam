import React, {useMemo, useState} from 'react';
import main from './RegistrationForm.module.css';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../store/slices/userSlice.js';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

const RegistrationForm = () => {

    const dispatch = useDispatch(); // Инициализация dispatch
    const navigate = useNavigate(); // Инициализация navigate

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [user, setUser] = useState({
        login: '', email: '', phone: '', fullName: '', password: ''
    });

    const {login, password, fullName, phone, email} = useMemo(() => user, [user]);

    const handleInput = (key, value) => {
        setUser({
            ...user, [key]: value
        });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // Проверка на заполненность всех полей
        if (Object.values(user).includes('')) {
            setError('Заполните все поля!');
            return;
        }

        try {
            // Отправка POST запроса
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.ok) {
                setError('')
                setMessage('Пользователь успешно зарегистрирован!');
                dispatch(logIn({name: user.login}))

                if(user.login === 'adminka') {
                    navigate('/admin_panel')
                }
                else {
                    navigate('/list_of_orders');
                }

            } else {
                setError(data.message || 'Произошла ошибка при регистрации.');
            }
        } catch (err) {
            setError('Ошибка соединения с сервером.');
        }
    };

    return (
        <main className={main.main}>
            <form className={main.form}>
                <p>Регистрация</p>
                <span>{error}</span>
                <span>{message}</span>
                <label>
                    Логин
                    <input
                        name="login"
                        placeholder="Ivanov6969"
                        minLength={3}
                        value={login}
                        onChange={(e) => handleInput(e.target.name, e.target.value)}
                        type="text"
                    />
                </label>
                <label>
                    Пароль
                    <input
                        name="password"
                        placeholder="qwerty123"
                        minLength={6}
                        value={password}
                        onChange={(e) => handleInput(e.target.name, e.target.value)}
                        type="password"
                    />
                </label>
                <label>
                    ФИО
                    <input
                        name="fullName"
                        placeholder="Иванов 69"
                        value={fullName}
                        onChange={(e) => handleInput(e.target.name, e.target.value)}
                        type="text"
                    />
                </label>
                <label>
                    Телефон
                    <input
                        name="phone"
                        placeholder="7(XXX)-XXX-XX-XX"
                        minLength={11}
                        maxLength={11}
                        value={phone}
                        onChange={(e) => handleInput(e.target.name, e.target.value)}
                        type="phone"
                    />
                </label>
                <label>
                    E-mail
                    <input
                        name="email"
                        placeholder="ivanov69@mail.ru"
                        value={email}
                        onChange={(e) => handleInput(e.target.name, e.target.value)}
                        type="email"
                    />
                </label>
                <button onClick={handleClick}>Зарегистрироваться</button>
            </form>
        </main>
    );
};

export default RegistrationForm;
