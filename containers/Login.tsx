import React, {  useState } from 'react'
import { setLocalStorage } from '../middlewares/storage';
import api from '../service/api';
import { LoginResponse } from '../types/LoginResponse';

export const Login = () => {

    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");

    const cl = () => {
        api.post('login', { login: login, password: pass })
        .then(
            (result) => {
                const data = result.data as LoginResponse
                setLocalStorage(data);
            },
            (error) => {
                alert(error.response.data.error); 
            }
        )
    };

    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo"/>
            <div className="input">
                <img src="/mail.svg" alt="Informe seu usuário"/>
                <input  placeholder="Usuário" type="email" onChange={e => setLogin(e.target.value)} />
            </div>
            <div className="input">
                <img src="/lock.svg" alt="Informe sua senha"/>
                <input placeholder="Senha" type="password" onChange={e => setPass(e.target.value)} />
            </div>
            <button onClick={() => cl()}>Login</button>
        </div>
    )
}
