import React, { useMemo, useState } from 'react';
import main from './AuthorizationForm.module.css';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../store/slices/userSlice.js';
import {Link, useNavigate} from "react-router-dom";

const AuthorizationForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        login: '', password: ''
    });

    const { login, password } = useMemo(() => user, [user]);

    const handleInput = (key, value) => {
        setUser({
            ...user, [key]: value
        });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setError('');


        if (Object.values(user).includes('')) {
            setError('Заполните все поля');
            return;
        }

        try {

            const response = await fetch('http://127.0.0.1:8000/api/login', { // Укажите правильный URL для вашего API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.ok) {

                dispatch(logIn({ user_id: user.login }));

                if(user.login === 'adminka') {
                    navigate('/admin_panel')
                }
                else {
                    navigate('/list_of_orders')
                }
            } else {

                setError(data.message || 'Неправильный логин или пароль.');
            }
        } catch (err) {
            setError('Ошибка соединения с сервером.');
        }
    };

    return (
        <main className={main.main}>
            <form className={main.form}>
                <p>Авторизация</p>
                <span>{error}</span>
                <label>
                    Логин
                    <input
                        type="text"
                        value={login}
                        name={'login'}
                        onChange={(e) => handleInput(e.target.name, e.target.value)}
                    />
                </label>
                <label>
                    Пароль
                    <input
                        type="password"
                        value={password}
                        name={'password'}
                        onChange={(e) => handleInput(e.target.name, e.target.value)}
                    />
                </label>
                <button onClick={handleClick}>Войти</button>
            </form>
        </main>
    );
};

export default AuthorizationForm;
