import React from "react";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import * as Yup from 'yup';
import { DepartmentService } from "../../services/DepartmentService";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdBlock } from "react-icons/md";
import { Tooltip } from "../UI/Tooltip";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DepartmentModal = ({ visible, setVisible, onSuccess, departments }) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Nombre es requerido'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const result = await DepartmentService.saveDepartment(values);
                
                if (result.status === 200) {
                    toast.success(result.message || "Departamento creado exitosamente", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored"
                    });
                    
                    // Esperar un poco antes de cerrar para que el usuario vea el mensaje
                    setTimeout(() => {
                        onSuccess();
                        setVisible(false);
                        formik.resetForm();
                    }, 1000);
                } else {
                    toast.error(result.message || "Error al crear el departamento", {
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

    const isInvalid = (field) => formik.touched[field] && formik.errors[field];

    return (
        <>
            <ToastContainer />
            <Dialog
                header="Nuevo Departamento"
                visible={visible}
                onHide={() => {
                    setVisible(false);
                    formik.resetForm();
                }}
                style={{ width: '30vw' }}
            >
                <form onSubmit={formik.handleSubmit} className="p-fluid">
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
                        className="bg-blue-500 px-4 py-2 rounded-lg text-white w-fit"
                        label="Guardar"
                        icon="pi pi-check"
                        onClick={formik.handleSubmit}
                        autoFocus
                        disabled={!formik.isValid || formik.isSubmitting}
                    />
                </form>
                <div className="flex flex-col">
                    {departments && departments.length > 0 ? (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Departamentos existentes:</h3>
                            <ul className="h-[200px] overflow-y-auto overflow-x-hidden">
                                {departments.map((dept) => (
                                    <li key={dept.id} className="grid grid-cols-8 items-center border-t border-b py-2 px-4 hover:bg-gray-50">
                                        <div className="col-span-6 md:col-span-7 lg:col-span-6 text-gray-900">
                                            {dept.name}
                                        </div>
                                        <div className="col-span-2 md:col-span-3 lg:col-span-2 flex justify-end space-x-2">
                                            <Tooltip text="Editar departamento">
                                                <button className="p-1 rounded-lg text-gray-500 hover:text-yellow-400 hover:bg-yellow-50 transition-colors">
                                                    <BiSolidEditAlt className="h-5 w-5" />
                                                </button>
                                            </Tooltip>
                                            <Tooltip text='Desactivar departamento'>
                                                <button className="p-1 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors">
                                                    <MdBlock className="h-5 w-5" />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-gray-500 mt-2">No hay departamentos registrados.</p>
                    )}
                </div>
            </Dialog>
        </>
    );
};