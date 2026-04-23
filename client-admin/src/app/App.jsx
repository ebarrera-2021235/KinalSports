//Primero se importan dependencias o librerias (completas o desestructuradas)
//Luego librerias o dependencias de terceros
//componentes o funciones propias del proyectof< 
import {useEffect} from 'react' //Este hook funciona para disparar efectos secundarios en componentes funcionales.
import {Toaster} from 'react-hot-toast'
import { AppRoutes } from './routes/AppRoutes.jsx' 
import {useAuthStore} from '../features/auth/store/authStore.js'

export const App = () => {
    const checkAuth = useAuthStore(state => state.checkAuth);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    return (
        <>
        <Toaster
            position='top-center'
            toastOptions={{
                style: {
                    fonFamily: 'inherit',
                    fontWeight: '600',
                    fontSize: '1rem',
                    borderRadius: '8px'
                }
            }}
        />
        <AppRoutes />

        </>
    )
}

