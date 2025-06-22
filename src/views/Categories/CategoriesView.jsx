import React, { useEffect, useState } from 'react'
import { CategoryCard } from '../../components/categories/CategoryCard';
import { useParams } from 'react-router-dom';
import { ProjectService } from '../../services/ProjectService';
import { CategoryModal } from '../../components/categories/CategoryModal'; // Importa el nuevo componente

export const CategoriesView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const { projectId } = useParams();
    const [categories, setCategories] = useState([]);
    // TODO: Queda pendiente el editar
    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const data = await ProjectService.projectDetails(projectId);
            if (data) setCategories(data.categories);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [projectId]);

    return (
        <>
            <section>
                <header className='flex justify-between items-center mb-6'>
                    <span className='text-xl font-semibold'>Listado de etapas del proyecto: {categories.name}</span>
                    <button 
                        className='bg-blue-500 text-white py-2 px-4 rounded-lg' 
                        onClick={() => setVisible(true)}
                    >
                        Agregar etapa
                    </button>
                </header>

                {isLoading ? (
                    <p className='text-center text-gray-600'>Cargando etapas del proyecto...</p>
                ) : (
                    <main className='flex overflow-x-auto gap-4 pb-4'>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <CategoryCard
                                    key={category.id}
                                    category={category}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No hay etapas para este proyecto.</p>
                        )}
                    </main>
                )}
            </section>
            
            {/* Usar el componente modal separado */}
            <CategoryModal 
                visible={visible} 
                setVisible={setVisible} 
                projectId={projectId}
                onSuccess={fetchCategories} // Pasar la función para actualizar la lista
            />
        </>
    )
}