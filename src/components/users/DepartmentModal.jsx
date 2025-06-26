import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import * as Yup from 'yup';

export const DepartmentModal = ({ visible, setVisible, onSuccess, departments }) => {
    console.log('Departments:', departments);
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Nombre es requerido'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log('Submitting values:', values.name);
            const result = await DepartmentService.saveDepartment(values);
            onSuccess();
            // setVisible(false);
            formik.resetForm();
        }
    });

    const isInvalid = (field) => formik.touched[field] && formik.errors[field];

    return (
        <Dialog
            header="Nuevo Departamento"
            visible={visible}
            onHide={() => {
                setVisible(false);
                formik.resetForm();
            }}
            style={{ width: '30vw' }}
        >
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="name" className="font-medium">Nombre:</label>
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
                <Button
                className="bg-blue-500 px-4 py-2 rounded-lg text-white"
                    label="Guardar"
                    icon="pi pi-check"
                    onClick={formik.handleSubmit}
                    autoFocus
                    disabled={!formik.isValid || formik.isSubmitting}
                />
            </form>
            <div className="flex flex-col">
                {
                    departments && departments.length > 0 ? (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Departamentos existentes:</h3>
                            <ul className="list-disc pl-5">
                                {departments.map((dept) => (
                                    <li key={dept.id} className="text-gray-700">{dept.name}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-gray-500 mt-2">No hay departamentos registrados.</p>
                    )
                }

            </div>
        </Dialog>
    );
};