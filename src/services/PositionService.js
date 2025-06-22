import { URL } from "../environments/global";

export const PositionService = {
    getPositions: async () => {
        try {
            const response = await fetch(`${URL}/getPositions`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },
}