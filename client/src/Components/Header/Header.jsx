import React from 'react';
import header from './Header.module.css'
import logo from '../../assets/logo.png'
import { useSelector, useDispatch} from "react-redux";
import { logIn, logOut} from "../../store/slices/userSlice.js";
import { useNavigate } from "react-router-dom";

const Header = ({page, src}) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(logOut())
        navigate('/authorization')
    }

    return (
        <header className={header.header}>
            {user.loggedIn ? (
                <div className={header.left}>
                    <img src={logo} alt=""/>
                    <span>Пользователь: {user.name}</span>
                    <button className={header.exit} onClick={handleClick}>Выйти</button>
                </div>
            ) : (
                <div className={header.left}>
                    <img src={logo} alt=""/>
                </div>
            )}
            {user.loggedIn ? (
                user.name === 'adminka' ? (
                    <div className={header.right}>
                    </div>
                ) : (
                    <div className={header.right}>
                        <a href="/create_order">Сделать заказ</a>
                        <a href="/list_of_orders">История заказов</a>
                    </div>
                )
            ) : (
                <div className={header.right}>
                    <a href={src}>{page}</a>
                </div>
            )}

        </header>
    );
};

export default Header;