import { NextPage } from "next";
import {Header} from "../components/Header";
import {Filter} from "../components/Filter";
import {Footer} from "../components/Footer";
import { useState } from "react";
import {LoginRequest} from "../types/LoginRequest";
import {executeRequest} from "../services/api";
import {LoginResponse} from "../types/LoginResponse";
import {TaskModel} from "../models/TaskModel";

type ListDataProps = {
    setToken(s: string) : void
}

export const ListData: NextPage<ListDataProps> = ({setToken}) => {
    const [msgError, setMsgError] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [tasks, setTasks] = useState([]);

    const sair = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        setToken('')
    }
debugger
        executeRequest('taskEndpoint', 'GET', '')
           // .then(res => res.data)
            .then(
                (data) => {
                    var x = data.data;
                    //setIsLoaded(true);
                   // setTasks(data.data);
                },
                (error) => {
                  //  setIsLoaded(true);
                   // setMsgError(error);
                });


    // if (msgError) {
    //     return <div>Error: {msgError}</div>;
    // } else if (!isLoaded) {
    //     return <div>Loading...</div>;
    // } else {
        return (
            <>
                <Header sair={sair} />
                <Filter />
                <div className="container-list">
                    {tasks.map(item => (
                        <>
                            <div className="item-list">
                                {item.finishDate ? <img src="/Check.svg" ></img> : <img src="/elipse.svg" ></img>}

                                <div className="text-list">
                                    <p className="title-list">{item.name}</p>
                                    <p className="desc-list">{item.previsionDate}</p>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                <Footer />
            </>

        );
   // }
}