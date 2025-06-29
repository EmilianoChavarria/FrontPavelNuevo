import React, { useEffect, useState } from 'react';
import { CardProject } from '../../components/projects/CardProject';
import { ProjectService } from '../../services/ProjectService';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { Skeleton } from 'primereact/skeleton';
import { ProjectCardSkeleton } from '../../components/UI/ProjectCardSkeleton';



export const ProjectsView = () => {

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    // TODO: Queda pendiente el editar  
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        start_date: Yup.date().required('Start date is required'),
        end_date: Yup.date()
            .required('End date is required')
            .min(Yup.ref('start_date'), 'End date cannot be before start date')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            start_date: '',
            end_date: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            const formattedValues = {
                ...values,
                start_date: moment(values.start_date).format('YYYY-MM-DD'),
                end_date: moment(values.end_date).format('YYYY-MM-DD')
            };
            const result = await ProjectService.saveProject(formattedValues);
            console.log('Submitted values:', formattedValues);
            console.log('Project saved successfully:', result);
            fetchProjects()
            setVisible(false);
            formik.resetForm();
        }
    });

    const isInvalid = (field) => formik.touched[field] && formik.errors[field];


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

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <>
            <section className=''>
                <header className='flex justify-between items-center mb-6'>
                    <span className='text-xl font-semibold dark:text-white'>Listado de proyectos</span>
                    <button className='bg-blue-500 text-white py-2 px-4 rounded-lg' onClick={() => setVisible(true)}>
                        Agregar proyecto
                    </button>
                </header>

                {isLoading ? (
                    <main className='grid grid-cols-3 gap-6'>
                        <ProjectCardSkeleton />
                        <ProjectCardSkeleton />
                        <ProjectCardSkeleton />
                        <ProjectCardSkeleton />
                        <ProjectCardSkeleton />
                        <ProjectCardSkeleton />
                        <ProjectCardSkeleton />
                        <ProjectCardSkeleton />
                        <ProjectCardSkeleton />
                    </main>
                ) : (
                    <main className='grid grid-cols-3 gap-6 '>
                        {projects.length > 0 ? (

                            projects.map((project) => (
                                <CardProject
                                    key={project.id}
                                    project={project}
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
            <Dialog
                header="Nuevo proyecto"
                visible={visible}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                    formik.resetForm();
                }}
                className="dark:bg-gray-800 dark:text-white"
                style={{ width: '30vw' }}
                breakpoints={{ '960px': '50vw', '641px': '50vw' }}
                footer={
                    <div>
                        <Button
                            label="Cancel"
                            icon="pi pi-times"
                            onClick={() => {
                                setVisible(false);
                                formik.resetForm();
                            }}
                            className="p-button-text"
                        />
                        <Button
                            label="Save"
                            icon="pi pi-check"
                            onClick={formik.handleSubmit}
                            autoFocus
                            disabled={!formik.isValid || formik.isSubmitting}
                        />
                    </div>
                }
            >
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    {/* Name Field */}
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="name" className="font-medium">Nombre del Proyecto:</label>
                        <div className={`border border-gray-300 rounded-md ${isInvalid('name') ? 'border-red-500' : ''}`}>
                            <InputText
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full pl-3 h-10 border-none"
                            />
                        </div>
                        {isInvalid('name') && <small className="text-red-500 text-sm">{formik.errors.name}</small>}
                    </div>

                    {/* Description Field */}
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="description" className="font-medium">Descripción:</label>
                        <div className={`border border-gray-300 rounded-md ${isInvalid('description') ? 'border-red-500' : ''}`}>
                            <InputText
                                id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full pl-3 h-10 border-none"
                            />
                        </div>
                        {isInvalid('description') && <small className="text-red-500 text-sm">{formik.errors.description}</small>}
                    </div>
                    <div className='flex justify-between items-center gap-4'>

                        {/* Start Date Field */}
                        <div className="w-45% flex flex-col gap-2 mb-4">
                            <label htmlFor="start_date" className="font-medium">Fecha de Inicio:</label>
                            <div className={`border border-gray-300 rounded-md ${isInvalid('start_date') ? 'border-red-500' : ''}`}>
                                <Calendar
                                    id="start_date"
                                    name="start_date"
                                    value={formik.values.start_date}
                                    onChange={(e) => formik.setFieldValue('start_date', e.value)}
                                    onBlur={formik.handleBlur}
                                    dateFormat="yy-mm-dd"
                                    showIcon
                                    inputClassName="w-full pl-3 h-10 border-none"
                                    className="w-full"
                                />
                            </div>
                            {isInvalid('start_date') && <small className="text-red-500 text-sm">{formik.errors.start_date}</small>}
                        </div>

                        {/* End Date Field */}
                        <div className="w-45% flex flex-col gap-2 mb-4">
                            <label htmlFor="end_date" className="font-medium">Fecha de Finalización:</label>
                            <div className={`border border-gray-300 rounded-md ${isInvalid('end_date') ? 'border-red-500' : ''}`}>
                                <Calendar
                                    id="end_date"
                                    name="end_date"
                                    value={formik.values.end_date}
                                    onChange={(e) => formik.setFieldValue('end_date', e.value)}
                                    onBlur={formik.handleBlur}
                                    dateFormat="yy-mm-dd"
                                    showIcon
                                    minDate={formik.values.start_date}
                                    inputClassName="w-full pl-3 h-10 border-none"
                                    className="w-full"
                                />
                            </div>
                            {isInvalid('end_date') && <small className="text-red-500 text-sm">{formik.errors.end_date}</small>}
                        </div>
                    </div>

                </form>
            </Dialog>
        </>
    );
};