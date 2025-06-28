import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UserService } from '../../services/UserService';
import { Badge } from '../../components/UI/Badge';
import { MdBlock } from "react-icons/md";
import { Tooltip } from '../../components/UI/Tooltip';
import { BiSolidEditAlt } from "react-icons/bi";
import { UserModal } from '../../components/users/UserModal';
import { TableSkeleton } from '../../components/UI/TableSkeleton';
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css"; // icons
import { Button } from 'primereact/button';

export const UsersView = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    const statusBodyTemplate = (product) => (
        <Badge value={product.status} status={product.status === 'activo' ? 'success' : 'danger'} />
    );

    const actionsBodyTemplate = (product) => (
        <div className="flex items-center">
            
                <Button  tooltip="Editar usuario" tooltipOptions={{ position: 'top' }} className="hover:text-yellow-400 py-1 rounded-lg mr-2 h-fit">
                    <BiSolidEditAlt className="h-5 w-5" />
                </Button>
            
            
                <Button tooltip="Desactivar usuario" tooltipOptions={{ position: 'top' }} className="hover:text-red-500 py-1 rounded-lg h-fit">
                    <MdBlock className="h-5 w-5" />
                </Button>
            
        </div>
    );

    const fetchUsers = async () => {
        try {
            const data = await UserService.getUsers();
            if (data) setProducts(data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <section className="p-4">
                <header className="flex justify-between items-center mb-6">
                    <span className="text-xl font-semibold dark:text-white">Listado de personal</span>
                    <button
                        onClick={() => setVisible(true)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Agregar usuario
                    </button>
                </header>

                <main>
                    {isLoading ? (
                        <TableSkeleton />
                    ) : products.length === 0 ? (
                        <div className="text-center text-gray-500 mt-10 dark:text-gray-400">
                            <p className="text-lg">No hay usuarios registrados.</p>
                        </div>
                    ) : (
                        <div className="card dark:bg-gray-800">
                            <DataTable 
                                value={products} 
                                tableStyle={{ minWidth: '50rem' }}
                                className="p-datatable-sm"
                                paginator 
                                rows={10}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
                            >
                                <Column field="user_name" header="Nombre completo" sortable />
                                <Column field="email" header="Correo" sortable />
                                <Column body={statusBodyTemplate} header="Status" sortable />
                                <Column field="position_name" header="Cargo" sortable />
                                <Column field="departmnet_name" header="Departamento" sortable />
                                <Column body={actionsBodyTemplate} header="Acciones" />
                            </DataTable>
                        </div>
                    )}
                </main>
            </section>

            <UserModal
                visible={visible}
                setVisible={setVisible}
                onSuccess={fetchUsers}
            />
        </>
    );
};