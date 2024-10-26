import React from 'react';
import header from './Header.module.css'
import logo from '../../assets/logo.png'
import { useSelector, useDispatch} from "react-redux";
import { logIn, logOut} from "../../store/slices/userSlice.js";
import {Link, useNavigate} from "react-router-dom";

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
                    <span>Пользователь: {user.user_id}</span>
                    <button className={header.exit} onClick={handleClick}>Выйти</button>
                </div>
            ) : (
                <div className={header.left}>
                    <img src={logo} alt=""/>
                </div>
            )}
            {user.loggedIn ? (
                user.user_id === 'adminka' ? (
                    <div className={header.right}>
                    </div>
                ) : (
                    <div className={header.right}>
                        <Link to={'/create_order'}>Сделать заказ</Link>
                        <Link to={"/list_of_orders"}>История заказов</Link>
                    </div>
                )
            ) : (
                <div className={header.right}>
                    <Link to={src}>{page}</Link>
                </div>
            )}

        </header>
    );
};

export default Header;