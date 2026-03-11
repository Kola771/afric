import axios from "axios";

export function categoriesData() {

    async function allCategories() {
        const categories = await axios.get(`/categories`);
        return categories.data;
    }

    async function allCategorieActifs() {
        const categories = await axios.get(`/categories/actifs`);
        return categories.data;
    }

    async function bestCategories() {
        const categories = await axios.get(`/categories/best-categories`);
        return categories.data;
    }

    async function getCategoryByUuid(uuid: string) {
        const category = await axios.get(`/categories/${uuid}`);
        return category.data;
    }

    async function createData(data: any): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.post(`/categories`, data,
                        {
                            params: { token },
                            headers: { "Content-Type": "multipart/form-data" },
                        });
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    async function updateData(uuid: string, data: any): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.put(`/categories/${uuid}`, { token, ...data });
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    async function updateImg(uuid: string, data: any): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.put(`/categories/upload-img/${uuid}`, data,
                        {
                            params: { token },
                            headers: { "Content-Type": "multipart/form-data" },
                        });
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    async function inactiveFunction(uuid: string): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const res = await axios.delete(`/categories/inactive/${uuid}`, { params: { token } });
                    return res?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    async function deleteData(data: Category[]): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    for (let i = 0; i < data.length; i++) {
                        await axios.delete(`/categories/${data[i]?.uuid}`, { params: { token } });
                    }
                    return { success: true, msg: 'Suppression réussie !', error: null };
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }


    return {
        allCategories,
        bestCategories,
        allCategorieActifs,
        getCategoryByUuid,
        createData,
        updateData,
        updateImg,
        inactiveFunction,
        deleteData,
    }
}