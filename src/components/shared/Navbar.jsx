import React, { use } from 'react'
import { FaUserCog } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {

    const navigate = useNavigate();


    return (
        <div className='bg-white shadow-sm p-4'>
            <div className='mx-auto max-w-7xl'>
                <div className='flex justify-between items-center'>
                    <span className='text-2xl font-semibold'>Sistema de Gestión de Proyectos</span>
                    <button onClick={() => {
                        navigate('/users');
                    }} className='bg-green-800 text-white px-4 py-2 rounded-lg flex'>
                        <FaUserCog className="mr-2 h-5 w-5" />
                        Gestión del personal
                    </button>

                </div>
            </div>
        </div>
    )
}
