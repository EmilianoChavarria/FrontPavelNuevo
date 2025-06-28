import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ActivityService } from '../../services/ActivityService';
import { Calendar } from 'primereact/calendar';
import { UserService } from '../../services/UserService';
import { Dropdown } from 'primereact/dropdown';
import { Chips } from 'primereact/chips';

export const ActivityModal = ({ visible, setVisible, onSuccess, category_id }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dependenciesChips, setDependenciesChips] = useState([]);
  const [deliverablesChips, setDeliverablesChips] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await UserService.getUsers();
      setUsers(response.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error("Error al cargar los usuarios", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    start_date: Yup.date().required('Start date is required'),
    end_date: Yup.date()
      .required('End date is required')
      .min(Yup.ref('start_date'), 'End date must be after start date'),
    responsible_id: Yup.number().required('Se requiere seleccionar un responsable'),
    dependencies: Yup.string().optional(),
    deliverables: Yup.string().optional()
  });

  const formik = useFormik({
    initialValues: {
      category_id: category_id,
      name: '',
      description: '',
      start_date: null,
      end_date: null,
      responsible_id: null,
      dependencies: '',
      deliverables: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Convert chips arrays to comma-separated strings
        const dependenciesString = dependenciesChips.join(', ');
        const deliverablesString = deliverablesChips.join(', ');

        const payload = {
          ...values,
          dependencies: dependenciesString,
          deliverables: deliverablesString,
          start_date: values.start_date ? formatDate(values.start_date) : null,
          end_date: values.end_date ? formatDate(values.end_date) : null
        };

        console.log('Payload:', payload);

        const result = await ActivityService.saveActivity(payload);

        console.log('Result:', result);

        if (result.status === 200) {
          toast.success(result.message || "Actividad creada exitosamente", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored"
          });

          // Resetear el formulario y cerrar el modal
          formik.resetForm();
          setDependenciesChips([]);
          setDeliverablesChips([]);
          setVisible(false); // Asegurarse de cerrar el modal
          onSuccess(); // Llamar a la función de éxito
        } else {
          toast.error(result.message || "Error al crear la actividad", {
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

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isInvalid = (field) => formik.touched[field] && formik.errors[field];

  useEffect(() => {
    if (visible) {
      fetchUsers();
    }
  }, [visible]);

  return (
    <>
      <ToastContainer />
      <Dialog
        header="Nueva actividad"
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          formik.resetForm();
          setDependenciesChips([]);
          setDeliverablesChips([]);
        }}
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
                setDependenciesChips([]);
                setDeliverablesChips([]);
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
            <label htmlFor="name" className="font-medium">Nombre de la actividad:</label>
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

          <div className='flex items-start justify-between'>
            {/* Start Date Field */}
            <div className="flex flex-col gap-2 mb-4 w-1/2 pr-2">
              <label htmlFor="start_date" className="font-medium">Fecha de inicio:</label>
              <div className={`border border-gray-300 rounded-md ${isInvalid('start_date') ? 'border-red-500' : ''}`}>
                <Calendar
                  id="start_date"
                  name="start_date"
                  value={formik.values.start_date}
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    formik.setFieldValue('start_date', e.value);
                    formik.handleChange(e);
                  }}
                  dateFormat="dd/mm/yy"
                  showIcon
                  className="w-full h-10 "
                />
              </div>
              {isInvalid('start_date') && <small className="text-red-500 text-sm">{formik.errors.start_date}</small>}
            </div>

            {/* End Date Field */}
            <div className="flex flex-col gap-2 mb-4 w-1/2 pl-2">
              <label htmlFor="end_date" className="font-medium">Fecha de finalización:</label>
              <div className={`border border-gray-300 rounded-md ${isInvalid('end_date') ? 'border-red-500' : ''}`}>
                <Calendar
                  id="end_date"
                  name="end_date"
                  value={formik.values.end_date}
                  onChange={(e) => formik.setFieldValue('end_date', e.value)}
                  onBlur={formik.handleBlur}
                  dateFormat="dd/mm/yy"
                  showIcon
                  className="w-full h-10"
                  minDate={formik.values.start_date}
                />
              </div>
              {isInvalid('end_date') && <small className="text-red-500 text-sm">{formik.errors.end_date}</small>}
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="responsible_id" className="font-medium">Responsable:</label>
            <div className={`border border-gray-300 rounded-md ${isInvalid('responsible_id') ? 'border-red-500' : ''}`}>
              <Dropdown
                id="responsible_id"
                name="responsible_id"
                value={formik.values.responsible_id}
                onChange={(e) => {
                  formik.setFieldValue('responsible_id', e.value);
                }}
                onBlur={formik.handleBlur}
                options={users}
                optionLabel={(user) => `${user.user_name} - ${user.position_name} - ${user.departmnet_name}`}
                optionValue="id"
                placeholder="Seleccione un responsable"
                className="w-full border-none"
                loading={isLoading}
                filter
                filterBy="user_name"
                showClear
              />
            </div>
            {isInvalid('responsible_id') && <small className="text-red-500 text-sm">{formik.errors.responsible_id}</small>}
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="dependencies" className="font-medium">Dependencias:</label>
            <div className={`border border-gray-300 rounded-md ${isInvalid('dependencies') ? 'border-red-500' : ''}`}>
              <Chips
                id="dependencies"
                name="dependencies"
                value={dependenciesChips}
                onChange={(e) => setDependenciesChips(e.value)}
                onBlur={formik.handleBlur}
                separator=","
                className="w-full h-10"
              />
            </div>
            {isInvalid('dependencies') && <small className="text-red-500 text-sm">{formik.errors.dependencies}</small>}
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="deliverables" className="font-medium">Entregables:</label>
            <div className={`border border-gray-300 rounded-md ${isInvalid('deliverables') ? 'border-red-500' : ''}`}>
              <Chips
                id="deliverables"
                name="deliverables"
                value={deliverablesChips}
                onChange={(e) => setDeliverablesChips(e.value)}
                onBlur={formik.handleBlur}
                separator=","
                className="w-full h-10"
              />
            </div>
            {isInvalid('deliverables') && <small className="text-red-500 text-sm">{formik.errors.deliverables}</small>}
          </div>
        </form>
      </Dialog>
    </>
  )
}