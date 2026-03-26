import axios from "axios";

export function usersData() {

    // 
    async function findAuthors(page: number = 1, limit: number = 25): Promise<{ data: Author[], pagination: { total: number, page: number, limit: number, currentPage: number, totalPages: number, hasNextPage: boolean } }> {
        const response = await axios.get(`/users/all-authors?page=${page}&limit=${limit}`);
        return response?.data;
    }

    // Recherche via nom et retourne les données par bond de 25
    async function getUsers(data: { page: number, limit: number, name: string }): Promise<{ data: Author[], pagination: { total: number, page: number, limit: number, currentPage: number, totalPages: number, hasNextPage: boolean } }> {
        const response = await axios.post(`/users/search`, data);
        return response?.data;
    }

    // 
    async function getAuthors(page: number, limit: number): Promise<{
        data: Author[], pagination: {
            total: number, page: number, limit: number, currentPage: number, totalPages: number, hasNextPage: boolean,
            countAllAuthors: number,
            countAllActifs: number,
            countAllInactifs: number,
            countAllBannis: number,
            countAllSuspendus: number,
            countAllCertifies: number,
            countAllBest: number,
            countAllTop: number,
            countAllStandard: number
        }
    }> {
        if (process?.client) {
            if (localStorage.getItem("user")) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.get(`/users/authors?page=${page}&limit=${limit}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return {
            data: [], pagination: {
                total: 0, page: 0, limit: 0, currentPage: 0, totalPages: 0, hasNextPage: false, countAllActifs: 0,
                countAllAuthors: 0,
                countAllInactifs: 0,
                countAllBannis: 0,
                countAllSuspendus: 0,
                countAllCertifies: 0,
                countAllBest: 0,
                countAllTop: 0,
                countAllStandard: 0
            }
        };
    }

    // 
    async function getAllUsers(page: number, limit: number): Promise<{
        data: User[], pagination: {
            total: number, page: number, limit: number, currentPage: number, totalPages: number, hasNextPage: boolean,
            countAllUsers: number,
            countAllSuperAdmins: number,
            countAllAdmins: number,
            countAllSupports: number,
            countAllAuthors: number,
            countAllReaders: number,
            countAllUsersActifs: number,
            countAllUsersInactifs: number,
            countAllUsersBanned: number,
            countAllSuspended: number,
        }
    }> {
        if (process?.client) {
            if (localStorage.getItem("user")) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.get(`/users/global?page=${page}&limit=${limit}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return {
            data: [], pagination: {
                total: 0, page: 0, limit: 0, currentPage: 0, totalPages: 0, hasNextPage: false,
                countAllUsers: 0,
                countAllSuperAdmins: 0,
                countAllAdmins: 0,
                countAllSupports: 0,
                countAllAuthors: 0,
                countAllReaders: 0,
                countAllUsersActifs: 0,
                countAllUsersInactifs: 0,
                countAllUsersBanned: 0,
                countAllSuspended: 0,
            }
        };
    }

    // Recherche via uuid
    async function findByUuid(uuid: string): Promise<{ success: boolean, data: Author | null }> {
        const response = await axios.get(`/users/${uuid}`);
        return response?.data;
    }

    // Retourne les informations de la session se trouvant dans le back
    async function getProfile(): Promise<User | null> {
        if (process?.client) {
            if (localStorage.getItem("user")) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.get('/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return null;
    }

    // Retourne le nombre total d'utilisateurs actifs
    async function countUserActifs() {
        if (process?.client) {
            if (localStorage.getItem("user")) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.get('/users/actifs', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return null;
    }

    // Retourne le nombre total d'auteurs actifs
    async function countAuthorsActifs() {
        if (process?.client) {
            if (localStorage.getItem("user")) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.get('/users/author-actifs', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return null;
    }

    // Propose des auteurs ayant ou non les certaines préférences en commum avec le lecteur
    async function propositionsAuthors() {
        if (process?.client) {
            if (localStorage.getItem("user")) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.get('/users/propositions-authors', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return null;
    }

    // Supprime le compte de l'utilisateur
    async function deleteAccount(uuid: string) {
        if (process?.client) {
            if (localStorage.getItem("user")) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.delete(`/users/delete-account/${uuid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return null;
    }

    // Suppression total du compte par les admins
    async function completeRemoval(uuid: string) {
        if (process?.client) {
            if (localStorage.getItem("user")) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.delete(`/users/complete-removal/${uuid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return null;
    }

    // 
    async function deletePersonNotLector(uuid: string, data: { status: string }) {
        if (process?.client) {
            if (localStorage.getItem("user")) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.put(`/users/delete-person-not-lector/${uuid}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return null;
    }

    // 
    async function changeStatusUser(uuid: string, data: any): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process?.client) {
            if (localStorage.getItem("user")) {
                try {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const response = await axios.put(`/users/change-status-user/${uuid}`, data, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    // 
    async function changeRoleUser(uuid: string, data: any): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process?.client) {
            if (localStorage.getItem("user")) {
                try {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const response = await axios.put(`/users/change-role-user/${uuid}`, data, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    // Modifie l'image d'un utilisateur
    async function updateImg(uuid: string, data: any): Promise<{ success: boolean, user?: any, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.put(`/users/upload-img/${uuid}`, data,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "multipart/form-data"
                            },
                        });
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    // envoie un code de validation à 6 chiffres dans la boîte mail de l'utilisateur
    async function sendCodeValidation(data: any): Promise<{ success: boolean, data?: any, msg?: string, error?: string | null, status?: number }> {
        try {
            const response = await axios.put(`/users/send-code-validation/`, data);
            return response?.data;
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    // Vérification du code de validation de l'utilisateur
    async function verifyCodeValidation(data: any): Promise<{ success: boolean, data?: any, msg?: string, error?: string | null, status?: number }> {
        try {
            const response = await axios.put(`/users/verify-code-validation/`, data);
            return response?.data;
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    // eModification du mot de passe de l'utilisateur
    async function changePassword(data: any): Promise<{ success: boolean, data?: any, msg?: string, error?: string | null, status?: number }> {
        try {
            const response = await axios.put(`/users/change-password/`, data);
            return response?.data;
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    return {
        findAuthors,
        getUsers,
        findByUuid,
        getProfile,
        getAuthors,
        getAllUsers,
        propositionsAuthors,
        countUserActifs,
        countAuthorsActifs,
        deleteAccount,
        completeRemoval,
        deletePersonNotLector,
        changeStatusUser,
        changeRoleUser,
        updateImg,
        sendCodeValidation,
        verifyCodeValidation,
        changePassword,
    }
}