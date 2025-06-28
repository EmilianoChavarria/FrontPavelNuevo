import { URL } from "../environments/global";

export const SubactivityService = {
    getByActivityId: async (activityId) => {
        try {
            const response = await fetch(`${URL}/getSubactivitiesByActivity/${activityId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching subactivities:', error);
            throw error;
        }
    },
}