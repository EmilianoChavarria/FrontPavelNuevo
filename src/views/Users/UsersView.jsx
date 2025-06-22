import React, { useEffect, useState } from 'react'
import { ProjectCardSkeleton } from '../../components/UI/ProjectCardSkeleton'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UserService } from '../../services/UserService';
import { Badge } from '../../components/UI/Badge';
import { MdBlock } from "react-icons/md";


export const UsersView = () => {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const statusBodyTemplate = (product) => {
        return <Badge value={product.status} status={product.status === 'activo' ? 'success' : 'danger'}></Badge>;
    };
    const actionsBodyTemplate = (product) => {
        return <div>
            <button className='hover:bg-blue-500 hover:text-white py-1 px-2 rounded-lg mr-2'>
                Editar
            </button>
            <button className='bg-red-500 text-white py-1 px-2 rounded-lg' >
                <MdBlock className='h-5 w-5' />
            </button>
        </div>;
    };


    const fectProducts = async () => {
        try {
            const data = await UserService.getUsers();
            if (data) setProducts(data.users);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fectProducts();
    }, [])

    return (
        <>
            <section>
                <header className='flex justify-between items-center mb-6'>
                    <span className='text-xl font-semibold'>Listado de personal</span>
                    <button className='bg-blue-500 text-white py-2 px-4 rounded-lg' >
                        Agregar usuario
                    </button>
                </header>


                <main >
                    <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="user_name" header="Nombre completo"></Column>
                        <Column field="email" header="Correo"></Column>
                        <Column body={statusBodyTemplate} header="Status"></Column>
                        <Column field="position_name" header="Cargo"></Column>
                        <Column field="departmnet_name" header="Departamento"></Column>
                        <Column body={actionsBodyTemplate} header="Acciones"></Column>
                    </DataTable>
                </main>

            </section>

        </>
    )
}
