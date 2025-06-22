import { URL } from "../environments/global";

export const RoleService = {
    getRoles: async () => {
        try {
            const response = await fetch(`${URL}/getRoles`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching roles:', error);
            throw error;
        }
    },
}