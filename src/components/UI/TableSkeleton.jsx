import { Skeleton } from 'primereact/skeleton'
import React from 'react'

export const TableSkeleton = () => {
    return (
        <div className='h-fit bg-white rounded-lg px-4 py-6 flex justify-between items-center'>
            <div className='flex flex-col justify-between items-start mb-4'>
                <Skeleton width="11rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
            </div>
            <div className='flex flex-col justify-between items-start mb-4'>
                <Skeleton width="11rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
            </div>
            <div className='flex flex-col justify-between items-start mb-4'>
                <Skeleton width="11rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
            </div>
            <div className='flex flex-col justify-between items-start mb-4'>
                <Skeleton width="11rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
            </div>
            <div className='flex flex-col justify-between items-start mb-4'>
                <Skeleton width="11rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
            </div>
            <div className='flex flex-col justify-between items-start mb-4'>
                <Skeleton width="11rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
                <Skeleton width="8rem" className="mb-8"></Skeleton>
            </div>


        </div>
    )
}
