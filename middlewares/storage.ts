import { LoginResponse } from "../types/LoginResponse";

const keyName = 'userData'
export const setLocalStorage = (user: LoginResponse) => { 
    localStorage.setItem(keyName, JSON.stringify(user)) 
}

export const getLocalStorage = (user: LoginResponse) => { 
    return localStorage.getItem(keyName);
}