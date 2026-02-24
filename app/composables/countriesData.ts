import axios from "axios";

export function countriesData() {
    const route = useRoute();

    async function allCountries(): Promise<Country[]> {
        const countries = await axios.get(`/countries`);
        return countries.data;
    }

    async function allCountrieActifs(): Promise<Country[]> {
        const countries = await axios.get(`/countries/actifs`);
        return countries.data;
    }

    async function getCountryByUuid(uuid: string) {
        const country = await axios.get(`/countries/${uuid}`);
        return country.data;
    }

    async function createData(data: any): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.post(`/countries`, data,
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
                    const response = await axios.put(`/countries/${uuid}`, { token, ...data });
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
                    const response = await axios.put(`/countries/upload-img/${uuid}`, data,
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
                    const res = await axios.delete(`/countries/inactive/${uuid}`, { params: { token } });
                    return res?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    async function deleteData(data: Country[]): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    for (let i = 0; i < data.length; i++) {
                        await axios.delete(`/countries/${data[i]?.uuid}`, { params: { token } });
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
        getCountryByUuid,
        allCountries,
        allCountrieActifs,
        createData,
        updateData,
        updateImg,
        inactiveFunction,
        deleteData
    }
}