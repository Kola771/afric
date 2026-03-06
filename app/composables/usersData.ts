import axios from "axios";

export function usersData() {

    async function findAuthors(page: number = 1, limit: number = 25): Promise<{ data: Author[], pagination : {total: number, page: number, limit: number, currentPage: number, totalPages: number, hasNextPage: boolean} }> {
        const response = await axios.get(`/users/all-authors?page=${page}&limit=${limit}`);
        return response?.data;
    }

    async function findByUuid(uuid: string): Promise<{ success: boolean, data: Author | null }> {
        const response = await axios.get(`/users/${uuid}`);
        return response?.data;
    }

    return {
        findAuthors,
        findByUuid,
    }
}