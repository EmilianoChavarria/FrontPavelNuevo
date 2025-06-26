import { URL } from "../environments/global";

export const DepartmentService = {
    getDepartments: async () => {
        try {
            const response = await fetch(`${URL}/getDepartments`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching departments:', error);
            throw error;
        }
    },
    saveDepartment: async (department) => {
        try {
            const response = await fetch(`${URL}/saveDepartment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(department),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error saving department:', error);
            throw error;
        }
    },
}