import axios from "axios";

export function chaptersData() {

    // Tous les chapitres
    async function allChapters() {
        const chapters = await axios.get(`/chapters`);
        return chapters.data;
    }

    // nombre de chapitres valides disponibles
    async function countDistinctChapters() {
        const chapter = await axios.get(`/chapters/count`);
        return chapter.data;
    }

    // recherche via uuid
    async function getChapterByUuid(uuid: string) {
        const chapter = await axios.get(`/chapters/${uuid}`);
        return chapter.data;
    }

    // retourne par bond de 25 les chapitres valides liés à un livre
    async function findAllPaginated(page: number = 1, limit: number = 25, id_book: number): Promise<{ data: ChapterData[], total: number, totalPages: number, currentPage: number }> {
        const response = await axios.get(`/chapters/paginated?page=${page}&limit=${limit}&id_book=${id_book}`);
        return response?.data;
    }

    // création d'un chapitre
    async function createData(data: ChapterDto): Promise<{ data: any, success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.post(`/chapters`, data, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return response?.data;
                } catch (error: any) {
                    return { data: null, success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { data: null, success: false, status: 400, error: "Client-side error" };
    }

    // création de plusieurs chapitres à la fois
    async function createManyData(data: ChapterDto[]): Promise<{ success: boolean, msg?: string, errors?: string | any[] | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.post(`/chapters/create-many`, data, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, errors: error.message };
                }
            }
        }
        return { success: false, status: 400, errors: "Client-side error" };
    }

    // Modification d'un chapitre
    async function updateData(uuid: string, data: ChapterDto): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.put(`/chapters/${uuid}`, data, {
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

    // Supprime un chapitre
    async function deleteData(uuid: string): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    await axios.delete(`/chapters/${uuid}`, { params: { token } });
                    return { success: true, msg: 'Suppression réussie !', error: null };
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }


    return {
        getChapterByUuid,
        countDistinctChapters,
        allChapters,
        findAllPaginated,
        createData,
        createManyData,
        updateData,
        deleteData
    }
}