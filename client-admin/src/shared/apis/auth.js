import {axiosAuth} from './api.js';

//Peticion para el login. (Inicio de sesion)
export const login = async (data) => {
    return await axiosAuth.post('/auth/login', data);
}