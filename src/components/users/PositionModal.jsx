import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import * as Yup from 'yup';

export const PositionModal = ({ visible, setVisible, onSuccess, positions }) => {
    const validationSchema = Yup.object().shape({
      title: Yup.string().required('Título es requerido'),
    });
  
    const formik = useFormik({
      initialValues: {
        title: '',
      },
      validationSchema,
      onSubmit: async (values) => {
        console.log('Submitting values:', values);
        // const result = await PositionService.savePosition(values);
        onSuccess();
        setVisible(false);
        formik.resetForm();
      }
    });
  
    const isInvalid = (field) => formik.touched[field] && formik.errors[field];
  
    return (
      <Dialog
        header="Nuevo Cargo"
        visible={visible}
        onHide={() => {
          setVisible(false);
          formik.resetForm();
        }}
        style={{ width: '30vw' }}
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
              label="Guardar"
              icon="pi pi-check"
              onClick={formik.handleSubmit}
              autoFocus
              disabled={!formik.isValid || formik.isSubmitting}
            />
          </div>
        }
      >
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="title" className="font-medium">Título:</label>
            <div className={`border border-gray-300 rounded-md ${isInvalid('title') ? 'border-red-500' : ''}`}>
              <InputText
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-3 h-10 border-none"
              />
            </div>
            {isInvalid('title') && <small className="text-red-500 text-sm">{formik.errors.title}</small>}
          </div>
        </form>
      </Dialog>
    );
  };