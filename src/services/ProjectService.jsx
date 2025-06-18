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
  }
};
