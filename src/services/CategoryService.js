import { URL } from "../environments/global";

export const CategoryService = {
  saveCategory: async (categoryData) => {
    try {
      const response = await fetch(`${URL}/saveCategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData)
      });

      if (!response.ok) {
        throw new Error(`Error al guardar categoría: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error en CategoryServices.saveCategory:", error);
      throw error;
    }
  }
}