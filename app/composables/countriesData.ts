import axios from "axios";

export function countriesData() {
    const route = useRoute();

    async function allCountries() {
        const countries = await axios.get(`/countries`);
        return countries.data;
    }

    async function getCountryByUuid(uuid: string) {
        const country = await axios.get(`/countries/${uuid}`);
        return country.data;
    }

    async function createData(data: CountryDto): Promise<{ success: boolean, msg?: string, msg_error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.post(`/countries`, { token, ...data });
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, msg_error: error.message };
                }
            }
        }
        return { success: false, status: 400, msg_error: "Client-side error" };
    }

    async function updateData(data: CountryUpdateDto): Promise<{ success: boolean, msg?: string, msg_error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.put(`/countries/${data?.uuid}`, { token, ...data });
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, msg_error: error.message };
                }
            }
        }
        return { success: false, status: 400, msg_error: "Client-side error" };
    }

    async function deleteData(data: Country[]): Promise<{ success: boolean, msg?: string, msg_error?: string | null, status?: number }> {
        if (process.client) {
            if (localStorage.getItem('user')) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    for (let i = 0; i < data.length; i++) {
                        await axios.delete(`/countries/${data[i]?.uuid}`, { params: { token } });
                    }
                    return { success: true, msg: 'Suppression réussie !', msg_error: null };
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, msg_error: error.message };
                }
            }
        }
        return { success: false, status: 400, msg_error: "Client-side error" };
    }


    return {
        getCountryByUuid,
        allCountries,
        createData,
        updateData,
        deleteData
    }
}