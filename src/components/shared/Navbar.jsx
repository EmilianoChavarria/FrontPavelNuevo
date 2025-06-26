import React, { use } from 'react'
import { FaUserCog } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {

    const navigate = useNavigate();


    return (
        <div className='bg-white shadow-sm p-4 lg:px-10 dark:text-white dark:bg-gray-800'>
            <div className='mx-auto max-w-7xl'>
                <div className='flex justify-between items-center'>
                    <span onClick={() => {
                      navigate('/');
                    }} className='text-2xl font-semibold hover:text-blue-500 hover:cursor-pointer lg:text-xl'>Sistema de Gestión de Proyectos</span>
                    <button onClick={() => {
                        navigate('/users');
                    }} className='bg-green-800 text-white px-4 py-2 rounded-lg flex lg:text-md'>
                        <FaUserCog className="mr-2 h-5 w-5" />
                        Gestión del personal
                    </button>

                </div>
            </div>
        </div>
    )
}
