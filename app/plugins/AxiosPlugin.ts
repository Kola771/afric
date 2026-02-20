import axios, { AxiosError, type AxiosResponse } from "axios";

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig();
    // Configuration de base pour que les requêtes soient acceptées par le backend
    axios.defaults.baseURL = `${config.public.apiBackendUrl}`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    axios.defaults.withCredentials = false;
    axios.defaults.withXSRFToken = true;

    // Ajoutez un délai d'attente de 100 secondes (100000 ms)
    axios.defaults.timeout = 100000; // 100 secondes

    /**
     * Intercepteur de réponse
     * On vérifie si l'utilisateur est toujours connecté
     */
    axios.interceptors.response.use(
        (res) => res,
        async (error: AxiosError) => {
            const router = useRouter();
            if (error.response) {
                // Vérifiez le statut de la réponse
                if ([401, 419].includes(error.response.status)) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("searchData");
                    window.location.href = "/login";
                }
            } else if (error.code === 'ECONNABORTED') {
                // Gérer les erreurs de timeout
                console.error('La connexion a été interrompue (timeout).');
            }
            return Promise.reject(error); // Relancer l'erreur pour la gestion ultérieure
        }
    );
});