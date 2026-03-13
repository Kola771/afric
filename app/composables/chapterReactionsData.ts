import axios from "axios";

export function useChapterReactions() {

    // -------------------
    // Récupérer les réactions d'un livre
    // -------------------
    async function getReactionsByChapter(id_chapter: number, page: number = 1) {
        try {
            const res = await axios.get(`/chapter_reactions/chapter/${id_chapter}?page=${page}`);
            return res?.data;
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    // -------------------
    // Récupérer la réaction d'un utilisateur par rapport à un livre
    // -------------------
    async function findByUserIdAndChapterId(id_user: number, id_chapter: number) {
        try {
            const res = await axios.get(`/chapter_reactions/chapter/${id_chapter}/user/${id_user}`);
            return res?.data;
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    // -------------------
    // Créer une réaction
    // -------------------
    async function createReaction(data: { id_chapter: number; id_user: number; label: string, emoji: string, color: string }) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.post(`/chapter_reactions`, data, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return res?.data;
                }
            }
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    // -------------------
    // Créer une réaction ou suppression
    // -------------------
    async function createDefaultReaction(data: { id_chapter: number; id_user: number; label: string, emoji: string, color: string }) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.post(`/chapter_reactions/default`, data, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return res?.data;
                }
            }
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    // -------------------
    // Modifier une réaction
    // -------------------
    async function updateReaction(uuid: string, data: { label: string, emoji: string, color: string }) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.put(`/chapter_reactions/${uuid}`, data, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return res?.data;
                }
            }
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    // -------------------
    // Supprimer une réaction
    // -------------------
    async function deleteReaction(id: number) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.delete(`/chapter_reactions/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return res?.data;
                }
            }
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    return {
        getReactionsByChapter,
        findByUserIdAndChapterId,
        createReaction,
        createDefaultReaction,
        updateReaction,
        deleteReaction
    }
}