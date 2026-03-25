import axios from "axios";

export function rolesData() {

    // Tous les rôles
    async function allRoles() {
        if (process.client) {
            if (localStorage.getItem('user')) {
                try {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const roles = await axios.get(`/roles`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return roles.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
    }

    // Tous les rôles dont le statut est différent d'inactif
    async function allWithoutInactifRoles() {
        if (process.client) {
            if (localStorage.getItem('user')) {
                try {
                    const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                    const roles = await axios.get(`/roles/roles-without-inactif`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return roles.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
    }

    // recherche via uuid
    async function getRoleByUuid(uuid: string) {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const role = await axios.get(`/roles/${uuid}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return role.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
    }

    // Création d'un rôle
    async function createData(data: RoleDto): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.post(`/roles`, data, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    // Modifie les informations d'un rôle
    async function updateData(uuid: string, data: RoleDto): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.put(`/roles/${uuid}`, data, {
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

    // Rend inactif un rôle
    async function inactiveFunction(uuid: string): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const res = await axios.delete(`/roles/inactive/${uuid}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return res?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    // Supprime un rôle
    async function deleteData(data: Role[]): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    for (let i = 0; i < data.length; i++) {
                        await axios.delete(`/roles/${data[i]?.uuid}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
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
        allWithoutInactifRoles,
        allRoles,
        createData,
        updateData,
        inactiveFunction,
        deleteData
    }
}