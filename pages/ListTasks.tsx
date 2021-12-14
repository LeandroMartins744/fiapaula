import type { NextPage } from 'next' 
import { useEffect, useState } from 'react';
import { Home } from '../containers/Home';
import { Login} from '../containers/Login'
import {ListData} from "../containers/ListData";

const ListTasks: NextPage = () => {
  const [accessToken, setToken] = useState('');
  useEffect(() => {
    if(typeof window !== 'undefined'){
        const token = localStorage.getItem('accessToken');
        if(token){
          setToken(token);
        }
    }
  }, [])

  return (
    accessToken ? <ListData setToken={setToken} /> : <Login setToken={setToken}/>
  )
}

export default ListTasks