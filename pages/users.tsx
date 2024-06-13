import { GetServerSidePropsContext } from 'next';
import React from 'react';

// Función para verificar la conexión a la base de datos
async function testConnection() {
    // Implementa la lógica para verificar la conexión aquí
    // Esta lógica debería estar en el servidor, no en el cliente
    // Puedes hacer una solicitud a tu API para verificar la conexión
    // Ejemplo:
    const res = await fetch('http://localhost:3000/api/auth');
    const data = await res.json();
    return data;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let isConnected = false;
    let message = '';

    try {
        const result = await testConnection();
        isConnected = result.message === 'Database connection successful';
        message = result.message;
    } catch (error) {
        console.error('Error processing request:', error);
        message = 'Failed to process request';
    }

    return {
        props: {
            isConnected,
            message,
        },
    };
}

const UsersPage = ({ isConnected, message }: { isConnected: boolean; message: string }) => {
    if (!isConnected) {
        return <div>Database connection failed.</div>;
    }

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};

export default UsersPage;
