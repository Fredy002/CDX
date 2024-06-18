import mysql from 'mysql2/promise';

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

export async function testConnection() {
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

export const cors = (req: any, res: any, next: Function) => {
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

export default db;
