import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'auth-db1436.hstgr.io' || 'localhost',
    user: 'u408348937_cdx' || 'root',
    password: 'Jorgitotuterror666' || 'root',
    database: 'u408348937_dinsy' || 'mydatabase',
    port: 3306,
});

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { firstName, lastName, username, sponsor, level, wallet } = req.body;
        try {
            // Check if the sponsor exists
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

            const [result] = await db.query(
                'INSERT INTO users (firstName, lastName, username, sponsor, level, wallet) VALUES (?, ?, ?, ?, ?, ?)',
                [firstName, lastName, username, sponsor, level, wallet]
            );
            res.status(200).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to register user' });
        }
    } else if (req.method === 'GET') {
        const isConnected = await testConnection();
        if (isConnected) {
            res.status(200).json({ message: 'Database connection successful' });
        } else {
            res.status(500).json({ message: 'Database connection failed' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
