import { ref } from 'vue';
import axios from "axios";

export function registerForm() {
    const full_name = ref<string>("");
    const categories = ref<number[]>([]);
    const bibliography = ref<string>("");
    const pseudonym = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");
    const role = ref<number>(0);
    const country = ref<number>(0);
    const router = useRouter();

    // fonction pour s'inscrire
    async function register() {
        const payload = ref<RegisterData>({
            full_name: full_name.value.trim(),
            country: country.value,
            categories: categories.value,
            bibliography: bibliography.value.trim(),
            pseudonym: pseudonym.value.trim(),
            email: email.value.trim(),
            password: password.value,
            role: role.value,
        });
        console.log(payload.value)

        try {
            // const response = await axios.post("/users/register", payload.value);
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
        full_name,
        country,
        categories,
        bibliography,
        pseudonym,
        email,
        password,
        role,
        register
    };
}