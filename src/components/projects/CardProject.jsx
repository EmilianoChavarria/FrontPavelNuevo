import React from 'react'
import { ProgressBar } from 'primereact/progressbar';
import { Badge } from '../UI/Badge';
import moment from 'moment';


export const CardProject = ({project}) => {
    return (
        <div className='bg-white px-4 py-6 rounded-lg'>
            <header className='flex justify-between items-center mb-2'>
                <span className='text-lg'>{project.name}</span>
                <button>asd</button>
            </header>
            <div className='px-1'>
                <span className='text-sm text-gray-700'>{project.description}</span>
                <div>
                    <div className='flex justify-between items center mt-3 mb-1'>
                        <span className='text-sm text-gray-700'>Progreso</span>
                        <span className='text-sm text-gray-700'>{project.completion_percentage}%</span>
                    </div>
                    <ProgressBar value={50} color='#3b82f6' showValue={false} className='h-3 rounded-full'></ProgressBar>
                    <div className='flex justify-between items-center mt-3'>
                        <span className='flex text-sm text-gray-600'>
                            <svg className="w-[18px] h-[18px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.9" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                            </svg>
                            {moment(project.start_date).format('ll')} - {moment(project.end_date).format('ll')}
                        </span>
                        <Badge/>
                    </div>
                </div>
            </div>

        </div>
    )
}
