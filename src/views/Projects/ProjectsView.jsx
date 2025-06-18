import React from 'react'
import { CardProject } from '../../components/projects/CardProject'

export const ProjectsView = () => {
    return (
        <>
            <section>
                <header className='flex justify-between items-center mb-6'>
                    <span className='text-xl font-semibold'>Listado de proyectos</span>
                    <button className='bg-blue-500 text-white py-2 px-4 rounded-lg'>Agregar proyecto</button>
                </header>
                <main className='grid grid-cols-3 gap-6'>
                    <CardProject/>
                    <CardProject/>
                    <CardProject/>
                    <CardProject/>
                </main>
            </section>
        </>
    )
}
