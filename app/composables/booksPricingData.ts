import axios from "axios";

export function booksPricingData() {

    // -------------------
    // 
    // -------------------
    async function getBooksPricingByIdUser(page: number = 1) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.get(`/books-pricing/?page=${page}`, {
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
    // 
    // -------------------
    async function getBooksPricingByUuid(uuid: string) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.get(`/books-pricing/${uuid}`, {
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
    // Créer une configuration
    // -------------------
    async function createBooksPricing(data: any) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.post(`/books-pricing`, data, {
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
    // Modifier une configuration
    // -------------------
    async function updateBooksPricing(uuid: string, data: any) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.put(`/books-pricing/${uuid}`, data, {
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
    // Supprimer une configuration
    // -------------------
    async function deleteBooksPricing(uuid: string) {
        try {
            if (process.client) {
                if (localStorage.getItem('user')) {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const res = await axios.delete(`/books-pricing/${uuid}`, {
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
        createBooksPricing,
        getBooksPricingByIdUser,
        getBooksPricingByUuid,
        updateBooksPricing,
        deleteBooksPricing
    }
}