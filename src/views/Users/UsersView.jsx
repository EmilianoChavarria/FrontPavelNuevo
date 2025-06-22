import React, { useEffect, useState } from 'react'
import { ProjectCardSkeleton } from '../../components/UI/ProjectCardSkeleton'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UserService } from '../../services/UserService';
import { Badge } from '../../components/UI/Badge';
import { MdBlock } from "react-icons/md";
import { Tooltip } from '../../components/UI/Tooltip';
import { BiSolidEditAlt } from "react-icons/bi";
import { UserModal } from '../../components/users/UserModal';
import { TableSkeleton } from '../../components/UI/TableSkeleton';

export const UsersView = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    const statusBodyTemplate = (product) => (
        <Badge value={product.status} status={product.status === 'activo' ? 'success' : 'danger'} />
    );

    const actionsBodyTemplate = (product) => (
        <div className="flex items-center">
            <Tooltip text="Editar usuario">
                <button className="hover:text-yellow-400 py-1 rounded-lg mr-2">
                    <BiSolidEditAlt className="h-5 w-5" />
                </button>
            </Tooltip>
            <Tooltip text="Desactivar usuario">
                <button className="hover:text-red-500 py-1 rounded-lg">
                    <MdBlock className="h-5 w-5" />
                </button>
            </Tooltip>
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
            <section>
                <header className="flex justify-between items-center mb-6">
                    <span className="text-xl font-semibold">Listado de personal</span>
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
                        <div className="text-center text-gray-500 mt-10">
                            <p className="text-lg">No hay usuarios registrados.</p>
                        </div>
                    ) : (
                        <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="user_name" header="Nombre completo" />
                            <Column field="email" header="Correo" />
                            <Column body={statusBodyTemplate} header="Status" />
                            <Column field="position_name" header="Cargo" />
                            <Column field="departmnet_name" header="Departamento" />
                            <Column body={actionsBodyTemplate} header="Acciones" />
                        </DataTable>
                    )}
                </main>
            </section>

            <UserModal
                visible={visible}
                setVisible={setVisible}
                // onSuccess={fetchUsers}
            />
        </>
    );
};
