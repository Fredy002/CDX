import db, { cors } from '@/utils/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    cors(req, res, () => { });

    if (req.method === 'POST') {
        const { user_id, propertyTitle, description, categorySelection, price, area, bedrooms, bathrooms, kitchens, garages, garageArea, yearBuilt, flours, address, country, city, zipCode, district, mapLocation, amenities, imageUrls } = req.body;
        try {
            // Check if user exists
            const [userResult]: any = await db.query('SELECT id FROM users WHERE id = ?', [user_id]);
            if (userResult.length === 0) {
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }

            await db.query(
                'INSERT INTO properties (user_id, propertyTitle, description, categorySelection, price, area, bedrooms, bathrooms, kitchens, garages, garageArea, yearBuilt, flours, address, country, city, zipCode, district, mapLocation, amenities, imageUrls) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [user_id, propertyTitle, description, categorySelection, price, area, bedrooms, bathrooms, kitchens, garages, garageArea, yearBuilt, flours, address, country, city, zipCode, district, mapLocation, JSON.stringify(amenities), JSON.stringify(imageUrls)]
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
