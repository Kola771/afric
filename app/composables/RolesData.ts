import axios from "axios";

export function rolesData() {
    
    async function allRoles() {
        const roles = await axios.get(`/roles`);
        return roles.data;
    }

    async function getRoleByUuid(uuid: string) {
        const role = await axios.get(`/roles/${uuid}`);
        return role.data;
    }

    async function createData(data: RoleDto): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.post(`/roles`, {token, ...data});
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    async function updateData(uuid: string, data: RoleDto): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.put(`/roles/${uuid}`, { token, ...data });
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
                    const res = await axios.delete(`/roles/inactive/${uuid}`, { params: { token } });
                    return res?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    async function deleteData(data: Role[]): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    for (let i = 0; i < data.length; i++) {
                        await axios.delete(`/roles/${data[i]?.uuid}`, { params: { token } });
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
        getRoleByUuid,
        allRoles,
        createData,
        updateData,
        inactiveFunction,
        deleteData
    }
}