import React, { useState, useEffect } from 'react';
import { FaUserCog, FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(() => {
        // Check for saved preference or use system preference
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) return JSON.parse(savedMode);
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // Apply dark mode class to document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className='bg-white shadow-sm p-4 lg:px-10 dark:bg-gray-800 dark:text-white transition-colors duration-300'>
            <div className='mx-auto max-w-7xl'>
                <div className='flex justify-between items-center'>
                    <span 
                        onClick={() => navigate('/')} 
                        className='text-2xl font-semibold hover:text-blue-500 hover:cursor-pointer lg:text-xl dark:hover:text-blue-400'
                    >
                        Sistema de Gestión de Proyectos
                    </span>
                    
                    <div className='flex items-center gap-4'>
                        <button 
                            onClick={toggleDarkMode}
                            className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
                            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
                        </button>
                        
                        <button 
                            onClick={() => navigate('/users')} 
                            className='bg-green-800 text-white px-4 py-2 rounded-lg flex items-center lg:text-md hover:bg-green-700 transition-colors'
                        >
                            <FaUserCog className="mr-2 h-5 w-5" />
                            Gestión del personal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};