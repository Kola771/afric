import axios from "axios";

export function feedData() {

    // 🔥 récupérer le feed
    async function getFeed(page: number = 1) {
        if (process.client) {
            try {
                const res = await axios.get(`/feed?page=${page}`);
                return res.data;
            } catch (error: any) {
                return {
                    success: false,
                    status: error.response?.status || 500,
                    error: error.message
                };
            }
        }
    }

    return {
        getFeed
    }
}