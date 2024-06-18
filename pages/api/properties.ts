import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// Configuración de la base de datos
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydatabase',
    port: 3306,
});

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
        const { user_id, propertyTitle, description, categorySelection, price, area, bedrooms, bathrooms, kitchens, garages, garageArea, yearBuilt, flours, address, country, city, zipCode, district, mapLocation, amenities } = req.body;
        try {
            // Check if user exists
            const [userResult]: any = await db.query('SELECT id FROM users WHERE id = ?', [user_id]);
            if (userResult.length === 0) {
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }

            await db.query(
                'INSERT INTO properties (user_id, propertyTitle, description, categorySelection, price, area, bedrooms, bathrooms, kitchens, garages, garageArea, yearBuilt, flours, address, country, city, zipCode, district, mapLocation, amenities) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [user_id, propertyTitle, description, categorySelection, price, area, bedrooms, bathrooms, kitchens, garages, garageArea, yearBuilt, flours, address, country, city, zipCode, district, mapLocation, JSON.stringify(amenities)]
            );
            res.status(200).json({ message: 'Property added successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to add property' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
