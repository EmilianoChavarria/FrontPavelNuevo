import { URL } from "../environments/global";

export const CommentService = {
    getByActivity: async (id) => {
        try {
            const response = await fetch(`${URL}/getByActivity/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    },

    saveComment: async (commentData) => {
        try {
            const response = await fetch(`${URL}/saveComment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commentData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }
}