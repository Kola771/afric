import axios from "axios";

export function notificationsData() {

    async function getNotifications(page: number, limit: number, id_user: number): Promise<{ data: any[], total: number, totalPages: number, countNoRead: number, currentPage: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const categories = await axios.get(`/notifications/all?id_user=${id_user}&page=${page}&limit=${limit}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return categories.data;
                } catch (error: any) {
                    return { data: [], total: 0, totalPages: 0, countNoRead: 0, currentPage: 0 };
                }
            }
        }
        return { data: [], total: 0, totalPages: 0, countNoRead: 0, currentPage: 0 };
    }

    // M
    async function updateData(id: number, id_user: number, data: any): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.put(`/notifications/${id}/${id_user}`, data, {
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

    return {
        getNotifications,
        updateData,
    }
}