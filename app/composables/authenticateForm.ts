import { ref } from 'vue';
import axios from "axios";

export function authenticateForm() {
    const email = ref<string>("");
    const password = ref<string>("");
    const router = useRouter();

    // fonction pour s'authentifier
    async function login() {
        const payload = ref<LoginData>({
            email: email.value.trim(),
            password: password.value,
        });
        console.log(payload.value)

        try {
            // const response = await axios.post("/users/login", payload.value);
            // if (!response.data.success) {
            //     console.log(response.data)
            // } else {
            //     localStorage.setItem("user", JSON.stringify(response.data.data));
            //     console.log(response.data);
            // }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            // Gérer l'erreur si nécessaire
        }
    }

    return {
        email,
        password,
        login
    };
}