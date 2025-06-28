import React, { useEffect, useRef, useState } from 'react'
import { ActivityDetailsModal } from './ActivityDetailsModal';

export const CardActivity = ({ activity }) => {
    const [visible, setVisible] = useState(false);
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
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
        <>
            <div className='flex justify-between items-center border border-gray-300 rounded-lg py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer dark:border-gray-700'>
                <span onClick={() => setVisible(true)}>
                    {activity.name}
                </span>
                <div className='flex items-center justify-center'>
                    <span>{activity.completion_percentage}%</span>
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
                                            // openModalFunction(category.id);

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

                                        }

                                        }
                                            target="_blank"
                                            // href={`/gantt/${project.id}`}
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Ver Gantt
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => {
                                            toggleDropdown;
                                            // deleteProject(project.id);
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
            </div>
            <ActivityDetailsModal
                visible={visible}
                setVisible={setVisible}
                activity={activity}
            />
        </>
    )
}
