/**
 * CategoriesView.jsx
 * Vista que muestra las etapas (categorías) asociadas a un proyecto específico.
 * Permite agregar nuevas etapas mediante un modal.
 */

import React, { useEffect, useState } from 'react'
import { CategoryCard } from '../../components/categories/CategoryCard'
import { useParams } from 'react-router-dom'
import { ProjectService } from '../../services/ProjectService'
import { CategoryModal } from '../../components/categories/CategoryModal'

export const CategoriesView = () => {
    // Estado para manejar la carga
    const [isLoading, setIsLoading] = useState(false)

    // Estado para mostrar/ocultar el modal de creación
    const [visible, setVisible] = useState(false)

    // Obtiene el ID del proyecto desde la URL
    const { projectId } = useParams()

    // Guarda la lista de categorías del proyecto
    const [categories, setCategories] = useState([])

    /**
     * Función para obtener los detalles del proyecto, incluidas sus categorías (etapas).
     */
    const fetchCategories = async () => {
        setIsLoading(true)
        try {
            const data = await ProjectService.projectDetails(projectId)
            if (data) setCategories(data.categories)
                
        } catch (error) {
            console.error('Error fetching project details:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Ejecuta la carga de categorías cuando cambia el ID del proyecto
    useEffect(() => {
        fetchCategories()
    }, [projectId])

    return (
        <>
            <section className=''>
                {/* Encabezado de la vista con botón para agregar una nueva categoría */}
                <header className='flex justify-between items-center mb-6'>
                    <span className='text-xl font-semibold dark:text-white'>
                        Listado de etapas del proyecto
                    </span>
                    <button 
                        className='bg-blue-500 text-white py-2 px-4 rounded-lg' 
                        onClick={() => setVisible(true)}
                    >
                        Agregar etapa
                    </button>
                </header>

                {/* Contenido principal: muestra loader, lista o mensaje vacío */}
                {isLoading ? (
                    <p className='text-center text-gray-600'>Cargando etapas del proyecto...</p>
                ) : (
                    <main className='flex overflow-x-auto gap-4 pb-4'>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <CategoryCard
                                    key={category.id}
                                    category={category}
                                    onActivityCreated={fetchCategories}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No hay etapas para este proyecto.</p>
                        )}
                    </main>
                )}
            </section>

            {/* Modal para agregar una nueva categoría */}
            <CategoryModal 
                visible={visible} 
                setVisible={setVisible} 
                projectId={projectId}
                onSuccess={fetchCategories} 
            />
        </>
    )
}
