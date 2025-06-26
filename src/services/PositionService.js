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
            console.error('Error fetching positions:', error);
            throw error;
        }
    },
    savePosition: async (position) => {
        try {
            const response = await fetch(`${URL}/savePosition`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(position),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error saving position:', error);
            throw error;
        }
    },
}