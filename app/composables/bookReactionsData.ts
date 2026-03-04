import axios from "axios";

export function useBookReactions() {

    // -------------------
    // Récupérer les réactions d'un livre
    // -------------------
    async function getReactionsByBook(id_book: number, page: number = 1) {
        try {
            const res = await axios.get(`/book_reactions/book/${id_book}?page=${page}`);
            return res?.data;
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    // -------------------
    // Récupérer la réaction d'un utilisateur par rapport à un livre
    // -------------------
    async function findByUserIdAndBookId(id_user: number, id_book: number) {
        try {
            const res = await axios.get(`/book_reactions/book/${id_book}/user/${id_user}`);
            return res?.data;
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    // -------------------
    // Créer une réaction
    // -------------------
    async function createReaction(data: { id_book: number; id_user: number; label: string, emoji: string, color: string }) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.post(`/book_reactions`, data, { params: { token } });
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
    async function createDefaultReaction(data: { id_book: number; id_user: number; label: string, emoji: string, color: string }) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.post(`/book_reactions/default`, data, { params: { token } });
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
                    const res = await axios.put(`/book_reactions/${uuid}`, data, { params: { token } });
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
                    const res = await axios.delete(`/book_reactions/${id}`, { params: { token } });
                    return res?.data;
                }
            }
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    return {
        getReactionsByBook,
        findByUserIdAndBookId,
        createReaction,
        createDefaultReaction,
        updateReaction,
        deleteReaction
    }
}