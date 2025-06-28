import { Dialog } from 'primereact/dialog';
import React, { useState, useEffect, useRef } from 'react';
import { SubactivityService } from '../../services/SubactivityService';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { MdBlock, MdSave } from 'react-icons/md';
import { Checkbox } from 'primereact/checkbox';

export const SubactivityModal = ({ visible, setVisible, activityId }) => {
    const [subactivities, setSubactivities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState('');
    const inputRef = useRef(null);

    const fetchSubactivities = async () => {
        setIsLoading(true);
        try {
            const data = await SubactivityService.getByActivityId(activityId);
            if (data) setSubactivities(data.subactivities);
        } catch (error) {
            console.error('Error fetching subactivities:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCommentChange = (id, newComment) => {
        setSubactivities(prev => prev.map(sub =>
            sub.id === id ? { ...sub, comment: newComment } : sub
        ));
    };

    const toggleStatus = (id) => {
        setSubactivities(prev => prev.map(sub =>
            sub.id === id
                ? {
                    ...sub,
                    status: sub.status === 'completada' ? 'no completada' : 'completada'
                }
                : sub
        ));
    };

    const handleNameClick = (id, name) => {
        setEditingId(id);
        setEditingName(name);
    };

    const handleNameChange = (e) => {
        setEditingName(e.target.value);
    };

    const saveName = (id) => {
        setSubactivities(prev => prev.map(sub =>
            sub.id === id ? { ...sub, name: editingName } : sub
        ));
        setEditingId(null);
    };

    const handleClickOutside = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target) && editingId) {
            saveName(editingId);
        }
    };

    const handleSaveChanges = async () => {
        try {
            setIsLoading(true);

            // Preparar datos para el backend
            const payload = {
                subactivities: subactivities.map(sub => ({
                    id: String(sub.id).startsWith('temp-') ? null : sub.id,
                    activity_id: activityId,
                    name: sub.name,
                    comment: sub.comment || null,
                    status: sub.status || 'no completada'
                }))
            };

            console.log('Payload para guardar subactividades:', payload);

            // Enviar al backend
            const response = await SubactivityService.saveOrUpdateSubactivity(payload);

            // Recargar datos para obtener IDs reales
            await fetchSubactivities();

            setVisible(false);
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const generateTempId = () => `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const addNewSubactivity = () => {
        const newSubactivity = {
            id: generateTempId(), // ID temporal único
            activity_id: activityId,
            name: 'Nueva subactividad',
            comment: '',
            status: 'no completada'
        };
        setSubactivities(prev => [...prev, newSubactivity]);
    };

    const deleteSubactivity = (id) => {
        setSubactivities(prev => prev.filter(sub => sub.id !== id));
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editingId, editingName]);

    useEffect(() => {
        if (editingId && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingId]);

    useEffect(() => {
        if (visible && activityId) {
            fetchSubactivities();
        }
    }, [visible, activityId]);

    return (
        <Dialog
            header="Subactividades"
            visible={visible}
            onHide={() => {
                if (!visible) return;
                setVisible(false);
            }}
            className="w-fit"
            footer={
                <div className="flex justify-between">
                    <Button
                        label="Agregar nueva"
                        className="bg-gray-500 hover:bg-gray-600 text-white px-2"
                        onClick={addNewSubactivity}
                    />
                    <Button
                        label="Guardar cambios"
                        icon={<MdSave className="mr-2" />}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2"
                        onClick={handleSaveChanges}
                        loading={isLoading}
                    />
                </div>
            }
        >
            {isLoading && !subactivities.length ? (
                <div className="flex justify-center items-center h-32">
                    <p className="text-gray-600">Cargando...</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
                        <thead className="bg-gray-50 ">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Comentario
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {subactivities.map((subactivity) => (
                                <tr key={subactivity.id}>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
                                        onClick={() => handleNameClick(subactivity.id, subactivity.name)}
                                    >
                                        {editingId === subactivity.id ? (
                                            <InputText
                                                ref={inputRef}
                                                value={editingName}
                                                onChange={handleNameChange}
                                                onBlur={() => saveName(subactivity.id)}
                                                onKeyPress={(e) => e.key === 'Enter' && saveName(subactivity.id)}
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                        ) : (
                                            subactivity.name
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${subactivity.status === 'completada'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'}`}>
                                            {subactivity.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <InputText
                                            value={subactivity.comment || ''}
                                            onChange={(e) => handleCommentChange(subactivity.id, e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap mx-auto flex items-center gap-2">
                                        <Checkbox
                                            checked={subactivity.status === 'completada'}
                                            onChange={() => toggleStatus(subactivity.id)}
                                            className={`border rounded-lg ${subactivity.status === 'completada'
                                                ? '[&>div]:border-green-500 '
                                                : '[&>div]:border-black'}`}
                                        />
                                        <Button
                                            tooltip="Eliminar subactividad"
                                            tooltipOptions={{ position: 'top' }}
                                            className="hover:text-red-500 py-1 rounded-lg h-fit"
                                            onClick={() => deleteSubactivity(subactivity.id)}
                                        >
                                            <MdBlock className="h-5 w-5" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Dialog>
    );
};