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

    return {
        pseudonym,
        password,
        login
    };
}