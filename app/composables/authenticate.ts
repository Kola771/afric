import axios from "axios";

export function authenticate() {
    const router = useRouter();

    async function connectUser() {
        if (process.client) {
            if (!localStorage.getItem('user')) {
                if (!["/register", "/forget-password", "/login"].includes(router.currentRoute?.value?.fullPath)) {
                    window.location.href = "/login";
                }
            }
        }
    }

    async function authorizePage() {
        if (process.client) {
            if (localStorage.getItem('user')) {
                if (["/register", "/forget-password", "/login"].includes(router.currentRoute?.value?.fullPath)) {
                    window.history.back();
                }
            }
        }
    }

    async function authorizeRolePage() {
        if (process.client) {
            const user = await toConnectUser();
            if (user && !["super-admin", "admin", "support"].includes(user.role.toLowerCase())) {
                window.history.back();
            }
        }
    }

    // Récupérons les informations de l'utilisateur connecté
    async function toConnectUser() {
        if (process.client) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem("user") || '{}');
            } else {
                return null;
            }
        }
    }

    // Récupérons toutes les données basées sur un profil
    async function dataProfil() {
        if (process.client) {
            const token = JSON.parse(localStorage.getItem("user") || '{}').token;
            return await axios.get(`/users/profil}`, {
                params: { token: token }
            });
        }
    }

    // Suppression du compte utilisateur connecté
    async function deleteAccountUserConnect() {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const userUuid = JSON.parse(localStorage.getItem("user") || '{}').uuid;
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                return await axios.delete(`/users/user-delete/${userUuid}`, {
                    params: { token }
                });
            }
        }
    }

    // Déconnexion du compte utilisateur connecté
    async function logout() {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    localStorage.removeItem("user");
                    localStorage.removeItem("register_author");
                    localStorage.removeItem("register_email");
                    window.location.href = "/";
                return await axios.delete(`/users/logout`, {
                    params: { token }
                });
            }
        }
    }

    return {
        connectUser,
        logout,
        authorizePage,
        authorizeRolePage,
        toConnectUser,
        dataProfil,
        deleteAccountUserConnect,
    }
}