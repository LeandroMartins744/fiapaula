import { NextPage } from "next";
import { Filter } from "../components/Filter";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import {ListData} from "./ListData";

type HomeProps = {
    setToken(s: string) : void
}

export const Home: NextPage<HomeProps> = ({setToken}) => {

    const sair = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        setToken('')
    }

    return (
        <>
            <Header sair={sair} />
            <Filter />
            <div className="container-Home">
                <img src="/logohome.svg" />
                <span>Você ainda não possui tarefas cadastradas!</span>
            </div>
            <Footer />
        </>
    );
}