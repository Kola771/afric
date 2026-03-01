import axios from "axios";

export function visitorsData() {

    async function getVisit(): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        try {
            const today = new Date().toISOString().split("T")[0];

            let visitorId = localStorage.getItem("as_visitor_id");
            let lastVisit = localStorage.getItem("as_last_visit");

            if (!visitorId) {
                visitorId = crypto.randomUUID();
                localStorage.setItem("as_visitor_id", visitorId);
            }

            // 🔥 Si nouvelle journée → envoyer au backend
            if (lastVisit !== today) {
                const response = await axios.post(`/visitors`, { visitor_id: visitorId });
                localStorage.setItem("as_last_visit", `${today}`);

                return response?.data;
            }
            return { success: false, error: "Pas d'ajout de visite" };
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }

    async function findAll() {
        try {
            const response = await axios.get(`/visitors`);

            return response?.data;
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }


    return {
        getVisit,
        findAll,
    }
}