import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// Configuración de la base de datos
const db = mysql.createPool({
    host: 'auth-db1436.hstgr.io',
    user: 'u408348937_cdx',
    password: 'Jorgitotuterror666',
    database: 'u408348937_dinsy',
    port: 3306,
});

// Función para verificar la conexión a la base de datos
async function testConnection() {
    try {
        const connection = await db.getConnection();
        await connection.ping();
        connection.release();
        return true;
    } catch (error) {
        console.error('Database connection failed:', error);
        return false;
    }
}

// Función para manejar la inserción de usuarios y verificación de patrocinadores
async function handlePostRequest(body: any) {
    const { firstName, lastName, username, sponsor, level, wallet } = body;

    // Verificar si el patrocinador existe
    const [sponsorResult]: any = await db.query(
        'SELECT * FROM users WHERE username = ?',
        [sponsor]
    );

    if (sponsorResult.length === 0) {
        // Si el patrocinador no existe, créalo
        await db.query(
            'INSERT INTO users (firstName, lastName, username, sponsor, level, wallet) VALUES (?, ?, ?, ?, ?, ?)',
            ["Patrocinador", "Desconocido", sponsor, "", 0, null]
        );
    }

    await db.query(
        'INSERT INTO users (firstName, lastName, username, sponsor, level, wallet) VALUES (?, ?, ?, ?, ?, ?)',
        [firstName, lastName, username, sponsor, level, wallet]
    );

    return { message: 'User registered successfully' };
}

// Manejador de la API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const body = JSON.parse(req.body);
            const response = await handlePostRequest(body);
            res.status(200).json(response);
        } catch (error) {
            console.error('Error processing POST request:', error);
            res.status(500).json({ message: 'Failed to process POST request' });
        }
    } else if (req.method === 'GET') {
        try {
            const isConnected = await testConnection();
            if (isConnected) {
                res.status(200).json({ message: 'Database connection successful' });
            } else {
                res.status(500).json({ message: 'Database connection failed' });
            }
        } catch (error) {
            console.error('Error processing GET request:', error);
            res.status(500).json({ message: 'Failed to process GET request' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
