import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CardActivity } from '../activities/CardActivity';
import { ActivityModal } from '../activities/AcivityModal';
import { CategoryModal } from './CategoryModal';

export const CategoryCard = ({ category, onActivityCreated }) => {
  const { projectId } = useParams();
  const [visible, setVisible] = useState(false);
  const [visibleAct, setVisibleAct] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownDirection, setDropdownDirection] = useState('right');
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      // Verificar la posición antes de abrir el dropdown
      checkDropdownPosition();
    }
    setIsDropdownOpen((prevState) => !prevState);
  };

  const checkDropdownPosition = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceRight = window.innerWidth - buttonRect.right;
      const dropdownWidth = 176; // Ancho aproximado del dropdown (w-44 = 176px)

      // Si no hay suficiente espacio a la derecha, mostrar a la izquierda
      if (spaceRight < dropdownWidth) {
        setDropdownDirection('left');
      } else {
        setDropdownDirection('right');
      }
    }
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
      <div className='bg-white px-4 py-6 rounded-lg hover:shadow-sm min-w-[400px] max-w-[400px] h-fit lg:min-w-[350px] lg:max-w-[350px] dark:text-white dark:bg-gray-800'>
        <header className='flex justify-between items-center mb-2' >
          <span className='text-lg font-medium '>{category.name}</span>
          <div>

            <div ref={dropdownRef} className="relative">
              <button
                ref={buttonRef}
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
                  className={`z-10 absolute ${dropdownDirection === 'right' ? 'left-0' : 'right-0'} mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconButton"
                  >
                    <li>
                      <a onClick={() => {
                        toggleDropdown;
                        // openModalFunction(category.id);
                        setVisible(true);


                      }

                      }
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Editar etapa
                      </a>
                    </li>
                    <li>
                      <a onClick={() => {
                        toggleDropdown;
                        setVisibleAct(true);
                      }

                      }
                        target="_blank"
                        // href={`/gantt/${project.id}`}
                        className="block px-4 py-2 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Registrar actividad
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
                        Eliminar etapa
                      </a>
                    </li>

                  </ul>

                </div>
              )}
            </div>
          </div>
        </header>
        <div className='px-1'>
          <span className="text-sm text-gray-500 mt-1 min-h-[40px]">{category.description}</span>
        </div>
        <div className='flex flex-col mt-7'>
          <span className='font-semibold mb-2'>
            Listado de actividades:
          </span>
          <div className='flex flex-col gap-2'>
            {category.activities.length > 0 ? (

              category.activities.map((activity) => (
                <CardActivity
                  key={activity.id}
                  categoryId={category.id}
                  activity={activity}
                />
              ))

            ) : (
              <p className="text-gray-500">No hay actividades para esta etapa.</p>
            )}


          </div>
        </div>
      </div >
      <ActivityModal
        visible={visibleAct}
        setVisible={setVisibleAct}
        category_id={category.id}
        onSuccess={() => {
          console.log(`Actividad registrada en la etapa ${category.name} con éxito.`);
          onActivityCreated(); // Llama a la función para notificar que se creó una actividad
        }}
      />

      <CategoryModal
        visible={visible}
        setVisible={setVisible}
        projectId={projectId}
        onActivityCreated={onActivityCreated}
        isEditing={true}
        category={category}
      />
    </>
  )
}
