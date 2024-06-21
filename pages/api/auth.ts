import { NextApiRequest, NextApiResponse } from 'next';
<<<<<<< HEAD
import mysql from 'mysql';

=======
import mysql from 'mysql2/promise';
>>>>>>> 29865f9d1eec8b31b6dd5e2fa72845171d7770c8

// Configuración de la base de datos
const db = mysql.createPool({
    host: 'auth-db1436.hstgr.io',
    user: 'u408348937_cdx',
    password: 'Jorgitotuterror666',
    database: 'u408348937_dinsy',
    port: 3306,
});

<<<<<<< HEAD
export const generateReferralLink = (username: string) => {
    return `https://dinsy.pro/auth?ref=${username}`;
};

export async function getRefLinkByUsername(username: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
        db.query('SELECT refLink FROM users WHERE username = ?', [username], (err, rows) => {
            if (err) {
                console.error('Error fetching refLink:', err);
                resolve(null);
            } else {
                if (rows.length > 0) {
                    resolve(rows[0].refLink);
                } else {
                    resolve(null); // No se encontró el usuario o refLink no está definido
                }
            }
        });
    });
=======
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
>>>>>>> 29865f9d1eec8b31b6dd5e2fa72845171d7770c8
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
<<<<<<< HEAD
        const { firstName, lastName, username, sponsor, level, wallet, refLink } = req.body;

        // Generar refLink si no se ha recibido desde el frontend
        const finalRefLink = refLink || generateReferralLink(username);
        const finalSponsor = sponsor || 'Master'; // Establecer sponsor como "Master" si no se proporciona desde el frontend

        try {
            db.query(
                'INSERT INTO users (firstName, lastName, username, sponsor, level, wallet, refLink) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [firstName, lastName, username, finalSponsor, level, wallet, finalRefLink],
                (err, result) => {
                    if (err) {
                        console.error('Failed to register user:', err);
                        res.status(500).json({ message: 'Failed to register user' });
                    } else {
                        res.status(200).json({ message: 'User registered successfully', refLink: finalRefLink });
                    }
                }
            );
        } catch (error) {
            console.error('Error inserting user:', error);
            res.status(500).json({ message: 'Failed to register user' });
        }
    } else if (req.method === 'GET') {
        const { username } = req.query;
        if (username) {
            try {
                const refLink = await getRefLinkByUsername(username as string);
                if (refLink) {
                    res.status(200).json({ refLink });
                } else {
                    const generatedLink = generateReferralLink(username as string);
                    res.status(200).json({ refLink: generatedLink });
                }
            } catch (error) {
                console.error('Error fetching refLink:', error);
                res.status(500).json({ message: 'Failed to fetch refLink' });
            }
        } else {
            res.status(400).json({ message: 'Missing username' });
=======
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
>>>>>>> 29865f9d1eec8b31b6dd5e2fa72845171d7770c8
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
