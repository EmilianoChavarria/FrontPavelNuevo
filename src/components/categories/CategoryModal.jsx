import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { CategoryService } from '../../services/CategoryService';

export const CategoryModal = ({ visible, setVisible, projectId, onSuccess }) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            project_id: projectId
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log('Submitted values:', values);
            const result = await CategoryService.saveCategory(values);
            console.log('Category saved successfully:', result);
            onSuccess();
            setVisible(false);
            formik.resetForm();
        }
    });

    const isInvalid = (field) => formik.touched[field] && formik.errors[field];

    return (
        <Dialog
            header="Nueva etapa"
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
    );
};