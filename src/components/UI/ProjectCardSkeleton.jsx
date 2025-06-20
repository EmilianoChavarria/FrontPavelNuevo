import React from 'react'
import { Skeleton } from 'primereact/skeleton';

export const ProjectCardSkeleton = () => {
    return (
        <div className='h-[12.5rem] bg-white rounded-lg px-4 py-6 '>
            <header className='flex justify-between items-center mb-4'>
                <Skeleton width="10rem" className="mb-2"></Skeleton>
                <Skeleton width="2rem" height="2rem" ></Skeleton>
            </header>
            <div className='px-1'>
                <Skeleton className="mb-4"></Skeleton>
                <div>
                    <div className='flex justify-between items center mt-3 mb-1'>
                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                    </div>
                    <Skeleton className="mb-4"></Skeleton>

                    <div className='flex justify-between items-center mt-3'>
                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                        <Skeleton width="7rem" className="mb-2"></Skeleton>
                    </div>
                </div>
            </div>

        </div>
    )
}
