import axios from "axios";

export function chaptersData() {

    async function allChapters() {
        const chapters = await axios.get(`/chapters`);
        return chapters.data;
    }

    async function getChapterByUuid(uuid: string) {
        const chapter = await axios.get(`/chapters/${uuid}`);
        return chapter.data;
    }

    async function findAllPaginated(page: number = 1, limit: number = 25, id_book: number): Promise<{ data: ChapterData[], total: number, totalPages: number, currentPage: number }> {
        const response = await axios.get(`/chapters/paginated?page=${page}&limit=${limit}&id_book=${id_book}`);
        return response?.data;
    }

    async function createData(data: ChapterDto): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.post(`/chapters`, { token, ...data });
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    async function updateData(uuid: string, data: ChapterDto): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.put(`/chapters/${uuid}`, { token, ...data });
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

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
        allChapters,
        findAllPaginated,
        createData,
        updateData,
        deleteData
    }
}