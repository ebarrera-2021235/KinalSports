//Hook para manejar la autenticacion del usuario utilizando Zustand
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as loginRequest } from '../../../shared/apis'
import { showError } from '../../../shared/utils/toast';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            expireAt: null,
            loading: false,
            error: null,
            isLoadingAuth: true,
            isAuthenticated: false,
            //Funcion para verificiar el token y el rol del usuario 
            checkAuth: () => {
                const token = get().token;
                const role = get().user?.role;
                const isAdmin = role === 'ADMIN_ROLE';
                // Si hay un token pero el rol no es admin, limpiar la autenticación y mostrar error
                if (token && !isAdmin) {
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        expireAt: null,
                        isLoadingAuth: true,
                        isAuthenticated: false,
                        error: "No tienes permiso para acceder a esta aplicación",
                    })
                    return;
                }
                set({
                    isLoadingAuth: false,
                    isAuthenticated: Boolean(token) && isAdmin,

                })
            },

            //Funcion para cerrar sesión
            logout: () => {
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    expireAt: null,
                    isAuthenticated: false,
                })
            },

            //Funcion para iniciar sesión
            login: async ({ emailOrUsername, password }) => {
                try {
                    set({ loading: true, error: null });

                    const { data } = await LoginRequest({ emailOrUsername, password });

                    const role = data?.userDetails?.role;
                    if (role !== "ADMIN_ROLE") {
                        const message = "No tienes permiso para acceder a esta aplicación";

                        set({
                            user: null,
                            token: null,
                            refreshToken: null,
                            expireAt: null,
                            isLoadingAuth: true,
                            isAuthenticated: false,
                            error: "No tienes permiso para acceder a esta aplicación",
                        });

                        showError(message);
                        return {succes: false, error: message };
                    }

                    set({
                        user: data.userDetails,
                        token: data.accessToken,
                        refreshToken: data.refreshToken,
                        expireAt: data.expiresIn,
                        isAuthenticated: true,
                        loading: false,
                    })
                    return {succes: true};
                } catch (err) {
                    const message = err.response?.data?.message || "Error al iniciar sesión";
                    set({ error: message, loading: false });
                    return { succes: false, error: message };
                }
            }
        }),
        {name: 'auth-KS-IN6AM'},
    ),
);