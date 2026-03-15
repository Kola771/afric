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

    return {
        findAuthors,
        getUsers,
        findByUuid,
        getProfile,
        propositionsAuthors,
        countUserActifs,
        countAuthorsActifs,
    }
}