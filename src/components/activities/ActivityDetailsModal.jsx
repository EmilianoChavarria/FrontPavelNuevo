import { Dialog } from 'primereact/dialog';
import { ProgressBar } from 'primereact/progressbar';
import React, { useState } from 'react'
import { CiCalendar } from 'react-icons/ci';
import { FiTarget, FiUser } from 'react-icons/fi';
import { GoClock } from 'react-icons/go';
import moment from 'moment';
import 'moment/dist/locale/es';
import { LuFileText } from 'react-icons/lu';
import { Badge } from '../UI/Badge';
import { SubactivityModal } from '../subactivities/SubactivityModal';

moment.locale('es');

export const ActivityDetailsModal = ({ visible, setVisible, activity }) => {
    const [visibleSubactivities, setVisibleSubactivities] = useState(false);
    const formattedDate = moment(activity.start_date).format('D [de] MMMM [de] YYYY');
    const formattedEndDate = moment(activity.end_date).format('D [de] MMMM [de] YYYY');

    return (
        <>
            <Dialog
                header={activity.name}
                visible={visible}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}
                style={{ width: '30vw' }}
                breakpoints={{ '960px': '50vw', '641px': '50vw' }}
            >
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

            </Dialog>
            <SubactivityModal visible={visibleSubactivities} setVisible={setVisibleSubactivities} activityId={activity.id}/>
        </>
    )
}
