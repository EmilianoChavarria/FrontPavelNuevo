import React from 'react'

export const Navbar = () => {
    return (
        <div className='bg-yellow-500'>
            <div className='bg-blue-500 mx-auto max-w-7xl'>
                <div className='flex justify-between items-center'>
                    <span>Proyectos</span>
                    <button className='bg-green-800 text-white px-4 py-2 rounded-lg'>Personal</button>

                </div>
            </div>
        </div>
    )
}
