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
    saveOrUpdateSubactivity: async (subactivitiesArray) => {
        try {
            const response = await fetch(`${URL}/save-or-update-by-id`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subactivitiesArray)
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error del servidor (422):", data);
                throw new Error(data.message || "Error al guardar actividad");
            }

            console.log("ActivityService.saveActivity response:", data);
            return data;
            
        } catch (error) {
            console.error('Error saving or updating subactivities:', error);
            throw error;
        }
    }

}