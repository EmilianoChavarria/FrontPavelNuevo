import React, { useEffect, useRef, useState } from 'react'
import { ProgressBar } from 'primereact/progressbar';
import { TimeBadge } from '../UI/TimeBadge';
import { Menu } from 'primereact/menu';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


export const CardProject = ({ project }) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const getProjectStatus = () => {
        const today = moment();
        const endDate = moment(project.end_date);
        const completion = parseFloat(project.completion_percentage);

        if (completion === 100) {
            return 'completado';
        }

        if (today.isAfter(endDate)) {
            return 'atrasado';
        }

        return 'en proceso';
    };


    useEffect(() => {


        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };



    }, []);

    return (

        <div className='bg-white px-4 py-6 rounded-lg hover:shadow-sm dark:text-white dark:bg-gray-800'>
            <header className='flex justify-between items-center mb-2'>
                <span className='text-lg font-medium hover:text-blue-600 hover:cursor-pointer' onClick={() => {
                    navigate(`/project/${project.id}/stages`);
                }}>{project.name}</span>
                <div>

                    <div ref={dropdownRef} className="aboslute">
                        <button
                            id="dropdownMenuIconButton"
                            onClick={toggleDropdown}
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-600 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 4 15"
                            >
                                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                            </svg>
                        </button>

                        {/* Menú desplegable */}
                        {isDropdownOpen && (
                            <div
                                id="dropdownDots"
                                className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconButton"
                                >
                                    <li>
                                        <a onClick={() => {
                                            toggleDropdown;
                                            openModalFunction(project.id);

                                        }

                                        }
                                            href="#"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Editar información
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => {
                                            toggleDropdown;
                                            navigate(`/gantt/${project.id}`);
                                        }

                                        }
                                            target="_blank"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Ver Gantt
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => {
                                            toggleDropdown;
                                            deleteProject(project.id);
                                        }
                                        }
                                            href="#"
                                            className="text-red-600 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Eliminar proyecto
                                        </a>
                                    </li>

                                </ul>

                            </div>
                        )}
                    </div>
                </div>
            </header>
            <div className='px-1'>
                <span className='text-sm text-gray-700 dark:text-gray-400'>{project.description}</span>
                <div>
                    <div className='flex justify-between items center mt-3 mb-1'>
                        <span className='text-sm text-gray-700 dark:text-gray-400'>Progreso</span>
                        <span className='text-sm text-gray-700 dark:text-gray-400'>{project.completion_percentage}%</span>
                    </div>
                    <ProgressBar value={project.completion_percentage} color='#3b82f6' showValue={false} className='h-3 rounded-full'></ProgressBar>
                    <div className='flex justify-between items-center mt-3'>
                        <span className='flex text-sm text-gray-600 dark:text-gray-400'>
                            <svg className="w-[18px] h-[18px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.9" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                            </svg>
                            {moment(project.start_date).format('ll')} - {moment(project.end_date).format('ll')}
                        </span>
                        <TimeBadge status={getProjectStatus()} />
                    </div>
                </div>
            </div>

        </div>
    )
}
