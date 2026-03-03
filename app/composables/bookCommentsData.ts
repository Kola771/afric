import axios from "axios";

export function useBookComments() {

    // -------------------
    // Récupérer les commentaires principaux d'un livre
    // -------------------
    async function getCommentsByBook(id_book: number, page: number = 1) {
        try {
            const res = await axios.get(`/book_comments/book/${id_book}?page=${page}`);
            return res?.data;
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    // -------------------
    // Récupérer les réponses d'un commentaire
    // -------------------
    async function getReplies(parent_id: number) {
        try {
            const res = await axios.get(`/book_comments/replies/${parent_id}`);
            return res?.data;
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    const getThreadReplies = async (id: number) => {
        const res = await axios.get(`/book_comments/${id}/thread`);
        return res?.data;
    };

    // -------------------
    // Créer un commentaire ou une réponse
    // -------------------
    async function createComment(data: { content: string; id_book: number; id_user: number; parent_id?: number }) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.post(`/book_comments`, data, { params: { token } });
                    return res?.data;
                }
            }
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    // -------------------
    // Modifier un commentaire
    // -------------------
    async function updateComment(uuid: string, content: string) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.put(`/book_comments/${uuid}`, { content }, { params: { token } });
                    return res?.data;
                }
            }
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    // -------------------
    // Supprimer un commentaire
    // -------------------
    async function deleteComment(uuid: string) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.delete(`/book_comments/${uuid}`, { params: { token } });
                    return res?.data;
                }
            }
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    return {
        getCommentsByBook,
        getReplies,
        getThreadReplies,
        createComment,
        updateComment,
        deleteComment
    }
}