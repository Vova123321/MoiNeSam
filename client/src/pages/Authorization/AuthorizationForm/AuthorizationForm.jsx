import React, {useMemo, useRef, useState} from 'react';
import main from './AuthorizationForm.module.css'

const AuthorizationForm = () => {
    const [error, setError] = useState('')

    const [user, setUser] = useState({
        login: '', password: ''
    })

    const {login, password} = useMemo(() => user, [user] )

    const handleInput = (key,value) => {
        setUser({
            ...user, [key]:value
        })
    }
    const handleClick = async (e) => {
        e.preventDefault()

        if(Object.values(user).includes('')) {
            setError('Заполните все поля')
        }
        else {
            setError('')
            alert('govno')
        }


        // fetch('https://server/api/registation')
        //     .then(response => response.json())
        //     .then(data => console.log(data))
    }

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