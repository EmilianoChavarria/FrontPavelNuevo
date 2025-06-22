import { useFormik } from 'formik';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { UserService } from '../../services/UserService';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { DepartmentService } from '../../services/DepartmentService';
import { PositionService } from '../../services/PositionService';
import { RoleService } from '../../services/RolesService';

export const UserModal = ({ visible, setVisible, onSuccess }) => {
    // Datos de ejemplo para departamentos (deberías reemplazarlos con tus datos reales)

    const [departments, setDepartments] = useState([]);
    const [positions, setPositions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [isLoading1, setIsLoading1] = useState(true)
    const [isLoading2, setIsLoading2] = useState(true)


    const fecthDepartments = async () => {
        try {
            const data = await DepartmentService.getDepartments();
            if (data) setDepartments(data.departments);
        } catch (error) {
            console.error('Error fetching departments:', error);
        } finally {
            setIsLoading(false);
        }
    }
    const fecthPositions = async () => {
        try {
            const data = await PositionService.getPositions();
            if (data) setPositions(data.positions);
        } catch (error) {
            console.error('Error fetching positions:', error);
        } finally {
            setIsLoading1(false);
        }
    }
    const fecthRoles = async () => {
        try {
            const data = await RoleService.getRoles();
            if (data) setRoles(data.roles);
        } catch (error) {
            console.error('Error fetching roles:', error);
        } finally {
            setIsLoading2(false);
        }
    }


    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
            .email('Debe ser un email válido')
            .required('Email es requerido'),
        department_id: Yup.string().required('Department is required'),
        position_id: Yup.string().required('Position is required'),
        role_id: Yup.string().required('Role is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            department_id: '',
            position_id: '',
            role_id: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log('Submitted values:', values);
            const result = await UserService.saveUser(values);
            console.log('User saved successfully:', result);
            onSuccess();
            setVisible(false);
            formik.resetForm();
        }
    });

    const isInvalid = (field) => formik.touched[field] && formik.errors[field];

    useEffect(() => {
        fecthDepartments();
        fecthPositions();
        fecthRoles();
    }, []);

    return (
        <Dialog
            header="Nuevo Usuario"
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
                {/* Name Field */}
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="name" className="font-medium">Nombre completo:</label>
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

                {/* Email Field */}
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="email" className="font-medium">Email:</label>
                    <div className={`border border-gray-300 rounded-md ${isInvalid('email') ? 'border-red-500' : ''}`}>
                        <InputText
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full pl-3 h-10 border-none"
                        />
                    </div>
                    {isInvalid('email') && <small className="text-red-500 text-sm">{formik.errors.email}</small>}
                </div>

                {/* Department Field */}
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="department_id" className="font-medium">Departamento:</label>
                    <div className={`border border-gray-300 rounded-md ${isInvalid('department_id') ? 'border-red-500' : ''}`}>
                        <Dropdown
                            id="department_id"
                            name="department_id"
                            value={formik.values.department_id}
                            onChange={(e) => {
                                formik.setFieldValue('department_id', e.value);
                            }}
                            onBlur={formik.handleBlur}
                            options={departments}
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Seleccione un departamento"
                            className="w-full border-none"
                            loading={isLoading ? true : false}
                        />
                    </div>
                    {isInvalid('department_id') && <small className="text-red-500 text-sm">{formik.errors.department_id}</small>}
                </div>
                {/* Position Field */}
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="position_id" className="font-medium">Cargo:</label>
                    <div className={`border border-gray-300 rounded-md ${isInvalid('position_id') ? 'border-red-500' : ''}`}>
                        <Dropdown
                            id="position_id"
                            name="position_id"
                            value={formik.values.position_id}
                            onChange={(e) => {
                                formik.setFieldValue('position_id', e.value);
                            }}
                            onBlur={formik.handleBlur}
                            options={positions}
                            optionLabel="title"
                            optionValue="id"
                            placeholder="Seleccione un departamento"
                            className="w-full border-none"
                            loading={isLoading1 ? true : false}
                        />
                    </div>
                    {isInvalid('position_id') && <small className="text-red-500 text-sm">{formik.errors.position_id}</small>}
                </div>
                {/* Position Field */}
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="role_id" className="font-medium">Rol:</label>
                    <div className={`border border-gray-300 rounded-md ${isInvalid('role_id') ? 'border-red-500' : ''}`}>
                        <Dropdown
                            id="role_id"
                            name="role_id"
                            value={formik.values.role_id}
                            onChange={(e) => {
                                formik.setFieldValue('role_id', e.value);
                            }}
                            onBlur={formik.handleBlur}
                            options={roles}
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Seleccione un departamento"
                            className="w-full border-none"
                            loading={isLoading2 ? true : false}
                        />
                    </div>
                    {isInvalid('role_id') && <small className="text-red-500 text-sm">{formik.errors.role_id}</small>}
                </div>

            </form>
        </Dialog>
    );
};