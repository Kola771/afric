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

    return {
        saveRead,
    }
}