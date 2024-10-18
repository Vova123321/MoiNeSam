import React from 'react';
import Header from "../../Components/Header/Header.jsx";
import AuthorizationForm from "./AuthorizationForm/AuthorizationForm.jsx";


const Authorization = () => {
    return (
        <>
            <Header page={'Регистрация'} src={'/'}/>
            <AuthorizationForm/>
        </>
    );
};

export default Authorization;