import db, { cors } from '@/utils/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    cors(req, res, () => { });

    if (req.method === 'POST') {
        const { user_id, email, phoneNumber, website, about, social1, social2, address, country, city, district, location } = req.body;
        try {
            // Check if user exists
            const [userResult]: any = await db.query('SELECT id FROM users WHERE id = ?', [user_id]);
            if (userResult.length === 0) {
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }

            // Update or insert user details
            await db.query(`
                INSERT INTO user_details (user_id, email, phoneNumber, website, about, social1, social2, address, country, city, district, location)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                email = VALUES(email),
                phoneNumber = VALUES(phoneNumber),
                website = VALUES(website),
                about = VALUES(about),
                social1 = VALUES(social1),
                social2 = VALUES(social2),
                address = VALUES(address),
                country = VALUES(country),
                city = VALUES(city),
                district = VALUES(district),
                location = VALUES(location)`,
                [user_id, email, phoneNumber, website, about, social1, social2, address, country, city, district, location]
            );
            res.status(200).json({ message: 'User details updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to update user details' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
