import { URL } from "../environments/global";

export const ProjectService = {
  getAll: async () => {
    try {
      const response = await fetch(`${URL}/getAll`);
      if (!response.ok) {
        throw new Error(`Error al obtener proyectos: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en ProjectService.getAll:", error);
    }
  },
  projectDetails: async (id) => {
    try {
      const response = await fetch(`${URL}/projects/${id}/details`);
      if (!response.ok) {
        throw new Error(`Error al obtener la info del proyecto: ${response.status}`);
      }
      const data = await response.json();
      // console.log("Datos del proyecto:", data);
      return data;
    } catch (error) {
      console.error("Error en ProjectService.getAll:", error);
    }
  },

  saveProject: async (projectData) => {
    try {
      const response = await fetch(`${URL}/saveProject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData)
      });

      if (!response.ok) {
        throw new Error(`Error al guardar proyecto: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error en ProjectService.saveProject:", error);
      throw error; // Re-throw the error so it can be handled by the calling component
    }
  }
};
