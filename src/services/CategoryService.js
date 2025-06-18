export const CategoryService = {
    getByProjectId: async (projectId) => {
        try {
            const response = await fetch(`${URL}/projects/${projectId}/details`);
            if (!response.ok) {
                throw new Error(`Error fetching categories: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error in CategoryService.getByProjectId:", error);
            throw error; // Re-throw the error for handling in the calling component
        }
    }
}