import axios from "axios";

export function userWalletsData() {

    // Retourne les informations de la session se trouvant dans le back
    async function findWalletByUserId(): Promise<Wallet | null> {
        if (process?.client) {
            if (localStorage.getItem("user")) {
                const token = JSON.parse(localStorage.getItem("user") || '{}').token;
                const response = await axios.get('/user-wallets', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response?.data;
            }
        }
        return null;
    }

    return {
        findWalletByUserId,
    }
}