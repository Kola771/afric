import { ref } from 'vue';
import axios from "axios";

export function authForm() {
    const pseudonym = ref<string>("");
    const password = ref<string>("");

    // fonction pour s'authentifier
    async function login() {
        const payload = ref<LoginData>({
            pseudonym: pseudonym.value.trim(),
            password: password.value,
        });

        try {
            const response = await axios.post("/auth/login", payload.value);
            if (response.data.success) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
            }
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
        }
    }

    // fonction pour ses données personnelles
    async function changePersonalData(uuid: string, data: any): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        if (process.client) {
            try {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                try {
                    const response = await axios.put(`/users/change-personal-data/${uuid}`, data, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    return response?.data;
                } catch (error: any) {
                    return { success: false, status: error.response?.status || 500, error: error.message };
                }
            } catch (error) {
                console.error('Erreur lors de la connexion :', error);
            }
        }
        return { success: false, status: 400, error: "Client-side error" };
    }

    return {
        pseudonym,
        password,
        login,
        changePersonalData,
    };
}