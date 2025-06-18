import React, { useEffect, useState } from 'react'
import { CardProject } from '../../components/projects/CardProject'
import { ProjectService } from '../../services/ProjectService'

export const ProjectsView  = () => {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProjects = async () => {
    const data = await ProjectService.getAll()
    console.log(data.projects)
    if (data) setProjects(data.projects)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <>
      <section>
        <header className='flex justify-between items-center mb-6'>
          <span className='text-xl font-semibold'>Listado de proyectos</span>
          <button className='bg-blue-500 text-white py-2 px-4 rounded-lg'>Agregar proyecto</button>
        </header>

        {isLoading ? (
          <p className='text-center text-gray-600'>Cargando proyectos...</p>
        ) : (
          <main className='grid grid-cols-3 gap-6'>
            {projects.map((project) => (
              <CardProject key={project.id} project={project} />
            ))}
          </main>
        )}
      </section>
    </>
  )
}
