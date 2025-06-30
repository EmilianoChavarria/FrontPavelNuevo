import { URL } from "../environments/global";

export const ActivityService = {
    saveActivity: async (activity) => {
        try {
            const response = await fetch(`${URL}/saveActivity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activity)
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error del servidor (422):", data); 
                throw new Error(data.message || "Error al guardar actividad");
            }

            console.log("ActivityService.saveActivity response:", data);
            return data;

        } catch (error) {
            console.error("Error en ActivityService.saveActivity:", error);
            throw error;
        }
    },
    updateActivity: async (id, activity) => {
        try {
            const response = await fetch(`${URL}/updateActivity/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activity)
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error del servidor (422):", data); 
                throw new Error(data.message || "Error al guardar actividad");
            }

            console.log("ActivityService.saveActivity response:", data);
            return data;

        } catch (error) {
            console.error("Error en ActivityService.saveActivity:", error);
            throw error;
        }
    }
}