import axios from "axios";

export function booksData() {

    async function allBooks() {
        const books = await axios.get(`/books`);
        return books.data;
    }

    async function allBooksActifs() {
        const books = await axios.get(`/books/actifs`);
        return books.data;
    }

    async function getBookByUuid(uuid: string) {
        const book = await axios.get(`/books/${uuid}`);
        return book.data;
    }

    async function countDistinctBooks() {
        try {
            const response = await axios.get(`/books/count`);

            return response?.data;
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    async function findAllPaginatedAuthor(page: number = 1, limit: number = 25, id_user: number): Promise<{  data: BookData[], total: number, totalPages: number, currentPage: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.get(`/books/authors?page=${page}&limit=${limit}&id_user=${id_user}`, {params: {token}});
                return response?.data;
            }
        }
        return { data: [], total: 0, totalPages: 0, currentPage: 0 };
    }

    async function existingData(data: any): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.post(`/books/existing`, {token, ...data});
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

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

    async function updateData(uuid: string, data: any): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.put(`/books/${uuid}`, { token, ...data });
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

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

    async function inactiveFunction(uuid: string): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const res = await axios.delete(`/books/inactive/${uuid}`, { params: { token } });
                    return res?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    async function deleteData(data: Category[]): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    for (let i = 0; i < data.length; i++) {
                        await axios.delete(`/books/${data[i]?.uuid}`, { params: { token } });
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
        countDistinctBooks,
        existingData,
        findAllPaginatedAuthor,
        allBooksActifs,
        getBookByUuid,
        createData,
        updateData,
        updateImg,
        inactiveFunction,
        deleteData,
    }
}