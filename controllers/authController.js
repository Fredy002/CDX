const ethers = require('ethers');
const pool = require('../config/db');

const registerUser = async (req, res) => {
    const { firstName, lastName, username, level, sponsor, wallet } = req.body;

    try {
        const levels = [
            { level: 0, amount: 0 },
            { level: 1, amount: 100 },
            { level: 2, amount: 500 },
            { level: 3, amount: 2000 },
            { level: 4, amount: 7000 },
            { level: 5, amount: 25000 },
            { level: 6, amount: 50000 },
            { level: 7, amount: 100000 },
        ];
        const selectedLevel = levels.find(l => l.level === level);

        if (!selectedLevel) {
            return res.status(400).json({ message: 'Invalid level selected.' });
        }

        const amount = selectedLevel.amount;
        const payments = calculatePayments(amount, sponsor);

        // Save user data to the database
        await saveUserData({ firstName, lastName, username, level, sponsor, wallet });

        // Process payments
        await processPayments(payments, wallet);

        res.status(200).json({ message: 'User registered and payments processed successfully.' });
    } catch (error) {
        console.error('Registration failed', error);
        res.status(500).json({ message: 'Registration failed. Please try again.', error });
    }
};


const calculatePayments = (amount, sponsor) => {
    const payments = [
        { wallet: '0xAFa5f9670b6809F7A200DBB4A3E8bfD056c855E8', percentage: 65 },
        { wallet: '0xcrowdpersonal', percentage: 5 },
        { wallet: '0xbuilder', percentage: 1 },
        { wallet: '0x9C6506Fd4b52c111F34599eeaF4CF6E2eE3d84Fc', percentage: sponsor.toLowerCase() === 'master' ? 11 : 4 },
        { wallet: '0xpooldinsy', percentage: 4 },
        { wallet: sponsor.toLowerCase() === 'master' ? '0x9C6506Fd4b52c111F34599eeaF4CF6E2eE3d84Fc' : sponsor, percentage: sponsor.toLowerCase() === 'master' ? 10 : 4 }
    ];

    if (sponsor.toLowerCase() !== 'master') {
        let remainingPercentage = 21 - 4;
        let currentSponsor = sponsor;
        for (let i = 0; i < 5; i++) {
            const parentSponsor = getParentSponsor(currentSponsor);
            if (!parentSponsor) break;
            payments.push({ wallet: parentSponsor, percentage: 2 });
            remainingPercentage -= 2;
            currentSponsor = parentSponsor;
        }
        payments.push({ wallet: '0xReferencias', percentage: remainingPercentage });
    }

    return payments.map(payment => ({
        ...payment,
        amount: (amount * payment.percentage) / 100
    }));
};

const processPayments = async (payments, userWallet) => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.BSC_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    for (const payment of payments) {
        if (payment.wallet === '0xcrowdpersonal') {
            await saveTemporaryPayment(userWallet, payment.amount);
            console.log(`Saved temporary payment of ${payment.amount} BNB for user ${userWallet}`);
            continue;
        }

        const tx = {
            to: payment.wallet,
            value: ethers.utils.parseEther(payment.amount.toString())
        };

        try {
            const transaction = await wallet.sendTransaction(tx);
            await transaction.wait();
            console.log(`Payment of ${payment.amount} BNB to ${payment.wallet} successful`);
        } catch (error) {
            console.error(`Payment to ${payment.wallet} failed`, error);
        }
    }
};


const getParentSponsor = (sponsor) => {
    // Aquí implementar la lógica para obtener el sponsor del sponsor desde la base de datos.

    return "dummy_sponsor"; 
};

const saveUserData = async (userData) => {
    const { firstName, lastName, username, level, sponsor, wallet } = userData;
    const query = 'INSERT INTO users (first_name, last_name, username, level, sponsor, wallet) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [firstName, lastName, username, level, sponsor, wallet];

    try {
        await pool.execute(query, values);
    } catch (error) {
        console.error('Failed to save user data', error);
        throw error;
    }
};

const saveTemporaryPayment = async (userWallet, amount) => {
    const query = 'INSERT INTO temporary_payments (user_wallet, amount) VALUES (?, ?)';
    const values = [userWallet, amount];

    try {
        await pool.execute(query, values);
    } catch (error) {
        console.error('Failed to save temporary payment', error);
        throw error;
    }
};


module.exports = { registerUser };
