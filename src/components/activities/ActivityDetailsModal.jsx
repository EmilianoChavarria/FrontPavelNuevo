import { Dialog } from 'primereact/dialog';
import { ProgressBar } from 'primereact/progressbar';
import React, { useState, useEffect } from 'react';
import { CiCalendar } from 'react-icons/ci';
import { FiTarget, FiUser } from 'react-icons/fi';
import { GoClock } from 'react-icons/go';
import moment from 'moment';
import 'moment/dist/locale/es';
import { LuFileText } from 'react-icons/lu';
import { Badge } from '../UI/Badge';
import { SubactivityModal } from '../subactivities/SubactivityModal';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FaPaperPlane, FaUser } from 'react-icons/fa';
import { CommentService } from '../../services/CommentService';

moment.locale('es');

export const ActivityDetailsModal = ({ visible, setVisible, activity = {} }) => {
    console.log('ActivityDetailsModal activity:', activity);
    const [visibleSubactivities, setVisibleSubactivities] = useState(false);
    const [content, setContent] = useState('');
    const [commentsList, setCommentsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const formattedDate = moment(activity.start_date || new Date()).format('D [de] MMMM [de] YYYY');
    const formattedEndDate = moment(activity.end_date || new Date()).format('D [de] MMMM [de] YYYY');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Función para cargar comentarios desde la API
    const fetchComments = async () => {
        try {
            const data = await CommentService.getByActivity(activity.id);
            if (data) setCommentsList(data.comments);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Cargar comentarios cuando se abre el modal
    useEffect(() => {
        if (visible && activity.id) {
            fetchComments();
        }
    }, [visible, activity.id]);

    // Función para enviar comentario a la API
    const handleSubmitComment = async () => {
        if (!content.trim()) return;

        try {
            setIsSubmitting(true);

            const payload = {
                activity_id: activity.id,
                content: content
            };

            console.log('Enviando comentario:', payload);

            const response = await CommentService.saveComment(payload);

            if (response) {
                fetchComments(); 
                // Actualizar la lista de comentarios con el nuevo
                setCommentsList(prev => [response, ...prev]);
                setContent('');
                // Opcional: recargar todos los comentarios para asegurar consistencia
                // await fetchComments();
            }
        } catch (error) {
            console.error('Error al enviar comentario:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Dialog
                header={activity.name}
                visible={visible}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}
                className="w-[40vw] max-w-[1200px]"
            >
                <div className='flex flex-row items- justify-between'>
                    <div className='w-fit'>
                        {activity.description}
                        <div>
                            <div className='flex justify-between items center mt-3 mb-1'>
                                <span className='text-sm text-gray-700 dark:text-gray-400'>Progreso</span>
                                <span className='text-sm text-gray-700 dark:text-gray-400'>{activity.completion_percentage}%</span>
                            </div>
                            <ProgressBar value={activity.completion_percentage} color='#3b82f6' showValue={false} className='h-3 rounded-full'></ProgressBar>
                        </div>
                        <div className='border-t border-t-gray-300 pt-4 mt-7 flex flex-col'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Responsible */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <FiUser />
                                        <span className="text-sm font-medium">Responsable</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground ml-6">{activity.responsible_name}</p>
                                </div>

                                {/* ID */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <FiTarget />
                                        <span className="text-sm font-medium">Estatus de la actividad</span>
                                    </div>
                                    <Badge value={activity.status} status={activity.status === 'no empezado' ? 'default' : activity.status === 'en proceso' ? 'warning' : 'danger'} />
                                </div>

                                {/* Start Date */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <CiCalendar />
                                        <span className="text-sm font-medium">Fecha de Inicio</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground ml-6">{formattedDate}</p>
                                </div>

                                {/* End Date */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <GoClock />

                                        <span className="text-sm font-medium">Fecha de Finalización</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground ml-6">{formattedEndDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className='border-t border-t-gray-300 pt-4 mt-7 flex flex-col gap-y-6'>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <LuFileText />
                                    <span className="text-sm font-medium">Entregables</span>
                                </div>
                                <p className="text-sm text-muted-foreground ml-6">{activity.deliverables}</p>
                            </div>

                            {/* Dependencies */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <FiTarget />
                                    <span className="text-sm font-medium">Dependencias</span>
                                </div>
                                <p className="text-sm text-muted-foreground ml-6">{activity.dependencies}</p>
                            </div>
                        </div>
                        <div className='border-t border-t-gray-300 pt-4 mt-7 flex flex-col'>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FiTarget />
                                    <span className="text-sm font-medium">Subactividades</span>
                                </div>
                                {/* <SubactivitiesModal activityId={activity.id} activityName={activity.name} /> */}
                                <button onClick={() => {
                                    setVisibleSubactivities(true);
                                }} className='px-2 py-1 rounded-md border boder-gray-100 text-sm hover:bg-gray-100 text-black'>Ver subactividades</button>
                            </div>
                            <p className="text-sm text-muted-foreground ml-6">Gestiona las tareas específicas de esta actividad</p>
                        </div>
                    </div>

                    {/* Sección de comentarios mejorada */}
                    <div className='border-l border-l-gray-300 ml-4 pl-4 min-w-[300px] flex flex-col h-[50vh]'>
                        <h3 className='font-medium text-lg mb-4'>Comentarios</h3>

                        {/* Lista de comentarios con scroll */}
                        <div className='flex-1 overflow-y-auto mb-4 space-y-4 pr-2'>
                            {isLoading ? (
                                <p className='text-sm text-gray-500 text-center py-4'>Cargando comentarios...</p>
                            ) : commentsList.length > 0 ? (
                                commentsList.map(c => (
                                    <div key={c.id} className='flex gap-3 items-center'>
                                        <div className='h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0'>
                                            <FaUser className='text-gray-600' />
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <div className='flex justify-between items-center mb-1'>
                                                <span className='text-xs text-gray-500'>
                                                    {moment(c.created_at).format('DD MMM HH:mm')}
                                                </span>
                                            </div>
                                            <p className='text-sm bg-gray-100 p-3 rounded-lg break-words'>
                                                {c.content}
                                            </p>
                                            <div className='flex text-xs mt-1 pl-2 space-x-2'>
                                                <span className='hover:text-blue-500 cursor-pointer'>Editar</span>
                                                <span className='hover:text-red-500 cursor-pointer'>Eliminar</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className='text-sm text-gray-500 text-center py-4'>No hay comentarios aún</p>
                            )}
                        </div>

                        {/* Formulario para nuevo comentario */}
                        <div className='flex gap-2 pt-2 border-t border-gray-200'>
                            <InputText
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Escribe un comentario..."
                                className='flex-1 border border-gray-300 rounded-lg p-2'
                                onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                                disabled={isSubmitting}
                            />
                            <Button
                                icon={<FaPaperPlane />}
                                onClick={handleSubmitComment}
                                disabled={!content.trim() || isSubmitting}
                                tooltip="Enviar comentario"
                                className='bg-blue-500 text-white hover:bg-blue-600'
                                tooltipOptions={{ position: 'top' }}
                                loading={isSubmitting}
                            />
                        </div>
                    </div>
                </div>
            </Dialog>

            <SubactivityModal visible={visibleSubactivities} setVisible={setVisibleSubactivities} activityId={activity.id} />
        </>
    )
}