import React, { useEffect, useRef, useState } from 'react'

export const CategoryCard  = ({ project }) => {


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
    <div className='bg-white px-4 py-6 rounded-lg hover:shadow-sm'>
      <header header className='flex justify-between items-center mb-2' >
        <span className='text-lg font-medium hover:text-blue-600 hover:cursor-pointer'>Inicial</span>
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

                    }

                    }
                      target="_blank"
                      href={`/gantt/${project.id}`}
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
        <span className="text-sm text-gray-500 mt-1 min-h-[40px]">asdsad</span>
      </div>
    </div >
  )
}
