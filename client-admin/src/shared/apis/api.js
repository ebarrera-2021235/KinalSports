//Aca en este archivo se configura para poder conectarnos a cualquiera de los servicios.
import axios from 'axios';
import {useAuthStore} from "../../features/auth/store/authStore.js";

//Crear instancia de axios para cada servicio.
const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL, //URL del servicio de autenticacion
    timeout: 5000, //Tiempo de espera para la respuesta
    headers: {
        'Content-Type' : 'application/json' //Tipo de contenido que se espera
    }
});

//Instancia para el servicio de administracion
const axiosAdmin = axios.create({
    baseURLL: import.meta.env.VITE_AUTH_URL, //URL del servicio de administracion
    timeout: 5000, //Tiempo de espera para la respuesta
    headers: {
        'Content-Type' : 'application/json' //Tipo de contenido que se espera
    }
});

axiosAdmin.interceptors.request.use((config) => {
    config._axiosClient = "admin"; //Agregamos una propiedad personalizada para identificar la instancia
    const token = useAuthStore.getState().token; //Obtenemos el token del store de autenticacion
    if(token){
        config.headers.Authorization = `Bearer ${token}`; //Agregamos el token al header de autorizacion
    }
    return config;
})

export { axiosAuth, axiosAdmin }; //Exportamos las instancias para que puedan ser utilizadas en otros archivos. 