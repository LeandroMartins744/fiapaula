import { NextPage } from "next";
import { useState } from "react"
import { executeRequest } from "../services/api";
import { LoginRequest } from "../types/LoginRequest";
import { LoginResponse } from "../types/LoginResponse";

type ModalAddProps = {
    onClose() : void
}

export const ModalAdd : NextPage<ModalAddProps> = ({onClose}) => {

    /*const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [msgError, setMsgError] = useState('');

     */



    return (
        <div className="container-modal">
            <div className="container-item">
                <p>Adicionar uma tarefa</p>
                <input placeholder="Adicionar uma tarefa" />
                <input placeholder="Data de conclusão" />

                <div className="button-modal">
                    <button className="salve-modal">Salvar</button>
                    <button className="cancel-modal" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}