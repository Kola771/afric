import axios from "axios";

export function useFollowers() {

    // -------------------
    // Créer un follower
    // -------------------
    async function createFollower(data: { follower: { id: number }, following: { id: number } }) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.post(`/followers`, data, { params: { token } });
                    return res?.data;
                }
            }
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    // -------------------
    // Supprimer un follower
    // -------------------
    async function deleteFollow(followingId: number, followerId: number) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.delete(`/followers/${followingId}/${followerId}`, { params: { token } });
                    return res?.data;
                }
            }
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    return {
        createFollower,
        deleteFollow
    }
}