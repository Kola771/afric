import axios from "axios";

export function visitorsData() {

    async function getVisit(data: VisitorDto): Promise<{ success: boolean, msg?: string, error?: string | null, status?: number }> {
        try {
            const response = await axios.post(`/visitors`, data );
            return response?.data;
        } catch (error: any) {
            return { success: false, status: error.response?.status || 500, error: error.message };
        }
    }


    return {
        getVisit,
    }
}