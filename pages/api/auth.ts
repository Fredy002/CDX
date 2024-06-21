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

// Generar enlace de referido
export const generateReferralLink = (username: string) => {
    return `https://dinsy.pro/auth?ref=${username}`;
};

// Obtener enlace de referido por nombre de usuario
export async function getRefLinkByUsername(username: string): Promise<string | null> {
    try {
        const [rows]: any = await db.query('SELECT refLink FROM users WHERE username = ?', [username]);
        if (rows.length > 0) {
            return rows[0].refLink;
        } else {
            return null; // No se encontró el usuario o refLink no está definido
        }
    } catch (err) {
        console.error('Error fetching refLink:', err);
        return null;
    }
}

// Probar conexión a la base de datos
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

// Configuración de CORS
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

// Manejador de la API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    cors(req, res, () => { });

    if (req.method === 'POST') {
        const { firstName, lastName, username, sponsor, level, wallet, refLink } = req.body;

        // Generar refLink si no se ha recibido desde el frontend
        const finalRefLink = refLink || generateReferralLink(username);
        const finalSponsor = sponsor || 'Master'; // Establecer sponsor como "Master" si no se proporciona desde el frontend

        try {
            const [sponsorResult]: any = await db.query('SELECT * FROM users WHERE username = ?', [sponsor]);

            if (sponsorResult.length === 0) {
                await db.query('INSERT INTO users (firstName, lastName, username, sponsor, level, wallet) VALUES (?, ?, ?, ?, ?, ?)', ["Patrocinador", "Desconocido", sponsor, "", 0, null]);
            }

            await db.query('INSERT INTO users (firstName, lastName, username, sponsor, level, wallet, refLink) VALUES (?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, username, finalSponsor, level, wallet, finalRefLink]);
            res.status(200).json({ message: 'User registered successfully', refLink: finalRefLink });
        } catch (error) {
            console.error('Failed to register user:', error);
            res.status(500).json({ message: 'Failed to register user' });
        }
    } else if (req.method === 'GET') {
        const { username, wallet } = req.query;

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
        } else if (wallet) {
            try {
                const [result]: any = await db.query('SELECT * FROM users WHERE wallet = ?', [wallet]);
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
