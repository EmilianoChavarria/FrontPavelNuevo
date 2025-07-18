import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { CategoryService } from '../../services/CategoryService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CategoryModal = ({ 
  visible, 
  setVisible, 
  projectId, 
  onSuccess, 
  isEditing = false, 
  category 
}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required')
  });

  const formik = useFormik({
    initialValues: {
      name: category?.name || '',
      description: category?.description || '',
      project_id: projectId
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let result;
        
        if (isEditing && category) {
          // Modo edición
          result = await CategoryService.updateCategory(category.id, values);
          console.log('Updating category:', category.id, values);
        } else {
          // Modo creación
          result = await CategoryService.saveCategory(values);
        }

        if (result.status === 200) {
          toast.success(result.message || (isEditing ? "Etapa actualizada exitosamente" : "Etapa creada exitosamente"), {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored"
          });

          setTimeout(() => {
            onSuccess(); // Esto llamará a fetchCategories en el componente padre
            setVisible(false);
            formik.resetForm();
          }, 1000);
        } else {
          toast.error(result.message || (isEditing ? "Error al actualizar la etapa" : "Error al crear la etapa"), {
            position: "top-right",
            autoClose: 3000,
            theme: "colored"
          });
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error("Ocurrió un error inesperado", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored"
        });
      }
    }
  });

  // Resetear el formulario cuando cambia el modo (edición/creación) o la categoría
  useEffect(() => {
    if (visible) {
      formik.resetForm({
        values: {
          name: category?.name || '',
          description: category?.description || '',
          project_id: projectId
        }
      });
    }
  }, [visible, isEditing, category]);

  const isInvalid = (field) => formik.touched[field] && formik.errors[field];

  return (
    <>
      <ToastContainer />
      <Dialog
        header={isEditing ? "Editar etapa" : "Nueva etapa"}
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          formik.resetForm();
        }}
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
              label={isEditing ? "Actualizar" : "Guardar"}
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
            <label htmlFor="name" className="font-medium">Nombre de la etapa:</label>
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
        </form>
      </Dialog>
    </>
  );
};