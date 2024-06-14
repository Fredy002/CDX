import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydatabase',
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
            const [sponsorResult]: any = await db.query(
                'SELECT * FROM users WHERE username = ?',
                [sponsor]
            );

            if (sponsorResult.length === 0) {
                await db.query(
                    'INSERT INTO users (firstName, lastName, username, sponsor, level, wallet) VALUES (?, ?, ?, ?, ?, ?)',
                    ["Patrocinador", "Desconocido", sponsor, "", 0, null]
                );
            }

            await db.query(
                'INSERT INTO users (firstName, lastName, username, sponsor, level, wallet) VALUES (?, ?, ?, ?, ?, ?)',
                [firstName, lastName, username, sponsor, level, wallet]
            );
            res.status(200).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to register user' });
        }
    } else if (req.method === 'GET') {
        const { wallet } = req.query;
        if (wallet) {
            try {
                const [result]: any = await db.query(
                    'SELECT * FROM users WHERE wallet = ?',
                    [wallet]
                );
                if (result.length > 0) {
                    res.status(200).json({ isRegistered: true, user: result[0] });
                } else {
                    res.status(200).json({ isRegistered: false });
                }
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Failed to check wallet registration' });
            }
        } else {
            const isConnected = await testConnection();
            if (isConnected) {
                res.status(200).json({ message: 'Database connection successful' });
            } else {
                res.status(500).json({ message: 'Database connection failed' });
            }
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
