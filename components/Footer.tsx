import moment from "moment";
import { NextPage } from "next";
import {useState} from "react";
import {ModalAdd} from "../containers/ModalAdd";
type FooterProps = {
}

export const Footer : NextPage<FooterProps> = ({ }) => {
    const [showModal, setPostModal] = useState(false)

    return (
        <div className="container-footer">
            <button onClick={() => setPostModal(true)}><img src="/add.svg" alt="Adiciona Tarefa"/> Adicionar uma tarefa</button>
            <span>© Copyright {moment().year()}. Todos os d
              reitos reservados.</span>

            {showModal ? <ModalAdd onClose={() => setPostModal(false)} />: null }
        </div>

    );
}