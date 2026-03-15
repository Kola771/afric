import axios from "axios";

export function useChapterReads() {

    // -------------------
    // Sauvegarder la lecture d'un chapitre
    // -------------------
    async function saveRead(data: { id_book: number; id_user: number | null; id_chapter: number; reading_time: string }) {
        try {
            let visitorId = localStorage.getItem("as_visitor_id");

            if (!visitorId) {
                visitorId = crypto.randomUUID();
                localStorage.setItem("as_visitor_id", visitorId);
            }
            // 🔥 Si nouvelle journée → envoyer au backend
            const res = await axios.post(`/chapter_reads`, { visitor_id: visitorId, ...data });
            return res?.data;
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    // retourne les chapitres récemment lus par le lecteur
    async function getChapterRead(): Promise<ChapterReadData[] | []> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.get(`/chapter_reads/recently`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return [];
    }

    // retourne le nombre de lecture par semaine
    async function getReadsByWeek(data: {start: string, end: string}): Promise<any> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.post(`/chapter_reads/reads-by-week`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return [];
    }

    return {
        saveRead,
        getChapterRead,
        getReadsByWeek,
    }
}