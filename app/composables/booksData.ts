import axios from "axios";

export function booksData() {

    // Tous les livres
    async function allBooks() {
        const books = await axios.get(`/books`);
        return books.data;
    }

    // Les livres qui ne sont ni en brouillon ou inactif
    async function allBooksActifs() {
        const books = await axios.get(`/books/actifs`);
        return books.data;
    }

    // recherche via uuid
    async function getBookByUuid(uuid: string) {
        const book = await axios.get(`/books/${uuid}`);
        return book.data;
    }

    // recherche via uuid
    async function getActiveBookByUuid(uuid: string) {
        const book = await axios.get(`/books/active/${uuid}`);
        return book.data;
    }

    // nombre de livres valides et disponibles sur la plateforme
    async function countDistinctBooks() {
        try {
            const response = await axios.get(`/books/count`);

            return response?.data;
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    // Le top des livre
    async function findTopBook(): Promise<BookData | null> {
        const response = await axios.get(`/books/top-book`);
        return response?.data;
    }

    // 5 meilleurs livres
    async function getFiveTopBooks(): Promise<BookData[]> {
        const response = await axios.get(`/books/top-five-books`);
        return response?.data;
    }

    // fonction pour ressortir aléatoirement un livre
    async function findRandom(): Promise<BookData | null> {
        const response = await axios.get(`/books/random`);
        return response?.data;
    }

    // Fonction pour ressortir 5 livres de chaque rating_age
    async function getFiveRatingAge() {
        const response = await axios.get(`/books/five-rating-age`);
        return response?.data;
    }

    // Fonction recherche (statut, rating_age, title)
    async function findAllPaginatedStatutOrRatingAge(data: { page: number, limit: number, title: string, status: string, rating_age: string[] }): Promise<{ data: BookData[], total: number, totalPages: number, currentPage: number }> {
        const response = await axios.post(`/books/search`, data);
        return response?.data;
    }

    // proposition de livres à l'utilisateur connecté sur son profil
    async function propositionsBooks(): Promise<BookData[] | []> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.get(`/books/propositions-books`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return [];
    }

    // retourne tous les livres par bond de 25 sans prise en compte de leur status
    async function findAllBooksPaginated(page: number = 1, limit: number = 25): Promise<{
        data: BookData[], total: number, totalPages: number, currentPage: number,
        countAll: number,
        countCompleted: number,
        countOngoing: number,
        countPaused: number,
        countDraft: number,
        countInactive: number
    }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.get(`/books/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return { data: [], total: 0, totalPages: 0, currentPage: 0, countAll: 0, countCompleted: 0, countOngoing: 0, countPaused: 0, countDraft: 0, countInactive: 0 };
    }

    // 
    async function findBookByUuid(uuid: string): Promise<BookData | null> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.get(`/books/book/${uuid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return null;
    }

    // fonction pour récupérer les 5 récents livres où le lecteur a réagi
    async function getBooksReactionsByIdUser(): Promise<BookData[] | []> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.get(`/books/books-reactions-by-id-user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return [];
    }

    // livres liés à un auteur
    async function findAllPaginatedAuthor(page: number = 1, limit: number = 25, id_user: number): Promise<{
        data: BookData[], total: number, totalPages: number, currentPage: number,
        countAll: number,
        countCompleted: number,
        countOngoing: number,
        countPaused: number,
        countDraft: number,
        countInactive: number
    }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.get(`/books/authors?page=${page}&limit=${limit}&id_user=${id_user}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return { data: [], total: 0, totalPages: 0, currentPage: 0, countAll: 0, countCompleted: 0, countOngoing: 0, countPaused: 0, countDraft: 0, countInactive: 0 };
    }

    // livres liés à une catégorie
    async function findAllPaginated(page: number = 1, limit: number = 25, id_category: number): Promise<{ data: BookData[], total: number, totalPages: number, currentPage: number }> {
        const response = await axios.get(`/books/categories?page=${page}&limit=${limit}&id_category=${id_category}`);
        return response?.data;
    }

    async function findAllPaginatedByAuthor(page: number = 1, limit: number = 25, id_user: number): Promise<{ data: BookData[], total: number, totalPages: number, currentPage: number }> {
        const response = await axios.get(`/books/author?page=${page}&limit=${limit}&id_user=${id_user}`);
        return response?.data;
    }

    // livres liés à une catégorie d'âge
    async function findAllPaginatedRatingAge(page: number = 1, limit: number = 25, rating_age: string): Promise<{ data: BookData[], total: number, totalPages: number, currentPage: number }> {
        const response = await axios.get(`/books/rating-age?page=${page}&limit=${limit}&rating_age=${rating_age}`);
        return response?.data;
    }

    // Vérifie si le titre existe déjà pour un livre lié à l'auteur en question
    async function existingData(data: any): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.post(`/books/existing`, data, {
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

    // Créé un livre
    async function createData(data: any): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.post(`/books`, data,
                        {
                            params: { token },
                            headers: { "Content-Type": "multipart/form-data" },
                        });
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    // Modifie le statut d'un livre
    async function updateStatus(uuid: string, data: any): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.put(`/books/change-status-book/${uuid}`, data, {
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

    // Modifie les informations d'un livre
    async function updateData(uuid: string, data: any): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.put(`/books/${uuid}`, data, {
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

    // Modifie l'image d'un livre
    async function updateImg(uuid: string, data: any): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.put(`/books/upload-img/${uuid}`, data,
                        {
                            params: { token },
                            headers: { "Content-Type": "multipart/form-data" },
                        });
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    // Rend inactif un livre
    async function inactiveFunction(uuid: string): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const res = await axios.delete(`/books/inactive/${uuid}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return res?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    // Supprime un livre
    async function deleteData(data: Category[]): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    for (let i = 0; i < data.length; i++) {
                        await axios.delete(`/books/${data[i]?.uuid}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    }
                    return { success: true, msg: 'Suppression réussie !', error: null };
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }


    return {
        allBooks,
        getFiveRatingAge,
        findAllPaginatedStatutOrRatingAge,
        countDistinctBooks,
        propositionsBooks,
        findAllBooksPaginated,
        getBooksReactionsByIdUser,
        existingData,
        getFiveTopBooks,
        findRandom,
        findTopBook,
        findAllPaginatedAuthor,
        findAllPaginatedRatingAge,
        findAllPaginatedByAuthor,
        findAllPaginated,
        allBooksActifs,
        getBookByUuid,
        getActiveBookByUuid,
        findBookByUuid,
        createData,
        updateData,
        updateImg,
        inactiveFunction,
        updateStatus,
        deleteData,
    }
}