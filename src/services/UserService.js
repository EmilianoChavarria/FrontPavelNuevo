import { URL } from "../environments/global";

export const UserService = {
    getUsers: async () => {
        try {
            const response = await fetch(`${URL}/getAllUsers`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    saveUser: async (userData) => {
        try {
            const response = await fetch(`${URL}/saveUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error saving user:', error);
            throw error;
        }
    }
}