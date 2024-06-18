import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// Configuración de la base de datos

// const db = mysql.createPool({
//     host: 'auth-db1436.hstgr.io',
//     user: 'u408348937_cdx',
//     password: 'Jorgitotuterror666',
//     database: 'u408348937_dinsy',
//     port: 3306,
// });

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

const cors = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    next();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    cors(req, res, () => { });

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
