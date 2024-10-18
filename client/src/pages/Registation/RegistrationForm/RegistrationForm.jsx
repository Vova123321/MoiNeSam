import React, {useMemo, useState} from 'react';
import main from './RegistrationForm.module.css'

const RegistrationForm = () => {
    const [error, setError] = useState('')

    const [user, setUser] = useState(
        {
            login: '', email: '', phone: '', fullName: '', password: ''
        })

    const {login,password,fullName,phone,email} = useMemo(() => user, [user])

    const handleInput = (key,value) => {
        setUser({
            ...user, [key]:value
        })
    }

    const handleClick = async (e) => {
        e.preventDefault()


        if(Object.values(user).includes('')) {
            setError('Заполните все поля!')
        }

        // fetch('https://server/api/registation')
        //     .then(response => response.json())
        //     .then(data => console.log(data))

    }
    return (
        <main className={main.main}>
            <form className={main.form}>
                <p>Регистрация</p>
                <span>{error}</span>
                <label>
                    Логин
                    <input
                        name={'login'}
                        placeholder={'Ivanov6969'}
                        minLength={3}
                        value={login}
                        onChange={(e) => handleInput(e.target.name, e.target.value)}
                        type="text"/>
                </label>
                <label>
                    Пароль
                    <input
                        name={'password'}
                        placeholder={'qwerty123'}
                        minLength={6}
                        value={password}
                        onChange={(e) => handleInput(e.target.name, e.target.value)}
                        type="password"/>
                </label>
                <label>
                    ФИО
                    <input
                        name={'fullName'}
                        placeholder={'Иванов 69'}
                        value={fullName}
                        onChange={(e) => handleInput(e.target.name, e.target.value)}
                        type="text"/>
                </label>
                <label>
                    Телефон
                    <input
                        name={'phone'}
                        placeholder={'7(XXX)-XXX-XX-XX'}
                        minLength={11}
                        value={phone}
                        onChange={(e) => handleInput(e.target.name, e.target.value)}
                        type="phone"/>
                </label>
                <label>
                    E-mail
                    <input
                        name={'email'}
                        placeholder={'ivanov69@mail.ru'}
                        value={email}
                        onChange={(e) => handleInput(e.target.name, e.target.value)}
                        type="email"/>
                </label>
                <button onClick={handleClick}>Зарегистрироваться</button>
            </form>
        </main>
    );
};

export default RegistrationForm;