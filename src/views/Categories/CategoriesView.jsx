import React, { useState } from 'react'
import { CategoryCard } from '../../components/categories/CategoryCard';

export const CategoriesView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    return (
        <>
            <section>
                <header className='flex justify-between items-center mb-6'>
                    <span className='text-xl font-semibold'>Listado de etapas del proyecto: 1</span>
                    <button className='bg-blue-500 text-white py-2 px-4 rounded-lg' onClick={() => setVisible(true)}>
                        Agregar etapa
                    </button>
                </header>

                {isLoading ? (
                    <p className='text-center text-gray-600'>Cargando proyectos...</p>
                ) : (
                    <main className='grid grid-cols-3 gap-6'>
                        <CategoryCard/>
                        <CategoryCard/>
                        <CategoryCard/>
                        <CategoryCard/>
                        {/* {projects.map((project) => (
                <CardProject
                  key={project.id}
                  project={project}
                />
              ))} */}
                    </main>
                )}
            </section>
        </>
    )
}
