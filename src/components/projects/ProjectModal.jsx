import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

export const ProjectModal = ({ 
  visible, 
  setVisible, 
  onSuccess, 
  projectToEdit 
}) => {
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
      name: projectToEdit?.name || '',
      description: projectToEdit?.description || '',
      start_date: projectToEdit?.start_date ? new Date(projectToEdit.start_date) : null,
      end_date: projectToEdit?.end_date ? new Date(projectToEdit.end_date) : null
    },
    validationSchema,
    onSubmit: async (values) => {
      const formattedValues = {
        ...values,
        start_date: moment(values.start_date).format('YYYY-MM-DD'),
        end_date: moment(values.end_date).format('YYYY-MM-DD')
      };
      
      try {
        await onSuccess(formattedValues, projectToEdit?.id);
        formik.resetForm();
        setVisible(false);
      } catch (error) {
        console.error('Error:', error);
      }
    },
    enableReinitialize: true
  });

  const isInvalid = (field) => formik.touched[field] && formik.errors[field];

  return (
    <Dialog
      header={projectToEdit ? "Editar proyecto" : "Nuevo proyecto"}
      visible={visible}
      onHide={() => {
        setVisible(false);
        formik.resetForm();
      }}
      className="dark:bg-gray-800 dark:text-white"
      style={{ width: '30vw' }}
      breakpoints={{ '960px': '50vw', '641px': '50vw' }}
      footer={
        <div>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => {
              setVisible(false);
              formik.resetForm();
            }}
            className="p-button-text"
          />
          <Button
            label={projectToEdit ? "Actualizar" : "Guardar"}
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
  );
};