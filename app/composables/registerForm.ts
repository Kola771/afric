import { ref } from 'vue';
import axios from "axios";

export function registerForm() {
    const full_name = ref<string>("");
    const bibliography = ref<string>("");
    const pseudonym = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");
    const role = ref<number>(0);
    const country = ref<number>(0);

    // fonction pour s'inscrire
    async function register() {
        const payload = ref<RegisterData>({
            name: full_name.value.trim(),
            country: country.value,
            bibliography: bibliography.value.trim() ?? null,
            pseudonym: pseudonym.value.trim(),
            email: email.value.trim() ?? null,
            password: password.value,
            role: role.value,
        });

        try {
            const response = await axios.post("/users/register", payload.value);
            if (response.data.success) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
        }
    }

    return {
        full_name,
        country,
        bibliography,
        pseudonym,
        email,
        password,
        role,
        register
    };
}