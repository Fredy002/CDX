// pages/api/getRefLink.js
// import { getUserRefLink } from '../../lib/db';

export default async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'Missing userId' });
    }

    try {
        const refLink = await getUserRefLink(userId);
        if (!refLink) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ refLink });
    } catch (error) {
        console.error('Failed to fetch refLink:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
