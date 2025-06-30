import React, { useEffect, useState } from 'react';
import { CardProject } from '../../components/projects/CardProject';
import { ProjectService } from '../../services/ProjectService';
import { ProjectCardSkeleton } from '../../components/UI/ProjectCardSkeleton';
import { ProjectModal } from '../../components/projects/ProjectModal';

export const ProjectsView = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const fetchProjects = async () => {
    try {
      const data = await ProjectService.getAll();
      if (data) setProjects(data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProject = async (projectData, projectId) => {
    try {
      let result;
      if (projectId) {
        result = await ProjectService.updateProject(projectId, projectData);
      } else {
        result = await ProjectService.saveProject(projectData);
      }
      console.log('Operation successful:', result);
      fetchProjects();
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleEditProject = (project) => {
    setProjectToEdit(project);
    setDialogVisible(true);
  };

  const handleCreateProject = () => {
    setProjectToEdit(null);
    setDialogVisible(true);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <section className=''>
        <header className='flex justify-between items-center mb-6'>
          <span className='text-xl font-semibold dark:text-white'>Listado de proyectos</span>
          <button 
            className='bg-blue-500 text-white py-2 px-4 rounded-lg' 
            onClick={handleCreateProject}
          >
            Agregar proyecto
          </button>
        </header>

        {isLoading ? (
          <main className='grid grid-cols-3 gap-6'>
            {[...Array(9)].map((_, i) => <ProjectCardSkeleton key={i} />)}
          </main>
        ) : (
          <main className='grid grid-cols-3 gap-6'>
            {projects.length > 0 ? (
              projects.map((project) => (
                <CardProject
                  key={project.id}
                  project={project}
                  onEdit={() => handleEditProject(project)}
                />
              ))
            ) : (
              <div className='col-span-3 text-center'>
                <p className='text-gray-600'>No hay proyectos disponibles.</p>
              </div>
            )}
          </main>
        )}
      </section>

      <ProjectModal
        visible={dialogVisible}
        setVisible={setDialogVisible}
        onSuccess={handleSaveProject}
        projectToEdit={projectToEdit}
      />
    </>
  );
};