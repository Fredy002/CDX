"use client";

import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { RiFileCopyLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';

declare const ethereum: any;

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

export default function Auth() {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        level: levels[0].level,
        sponsor: '',
    });
    const [alert, setAlert] = useState<{ type: 'success' | 'info' | 'warning' | 'error', message: string } | null>(null);
    const { setUser } = useAuth();

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [alert]);

    const handleWalletConnect = async () => {
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setWalletAddress(accounts[0]);
            localStorage.setItem('walletAddress', accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!walletAddress) {
            setAlert({ type: 'warning', message: 'Please connect your wallet first.' });
            return;
        }

        const selectedLevel = levels.find(level => level.level === Number(formData.level));

        if (!selectedLevel) {
            setAlert({ type: 'error', message: 'Invalid level selected.' });
            return;
        }

        // Simular una transacción exitosa
        try {
            await saveUserData();
            setUser({ ...formData, walletAdress: walletAddress }); // Guardar los datos del usuario en el contexto
            localStorage.setItem('user', JSON.stringify({ ...formData, walletAdress: walletAddress })); // Guardar los datos del usuario en el almacenamiento local
            setAlert({ type: 'success', message: 'Payment successful and data saved!' });
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Payment failed', error);
            setAlert({ type: 'error', message: 'Payment failed. Please try again.' });
        }
    };

    const saveUserData = async () => {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, walletAdress: walletAddress }),
        });
        if (!response.ok) {
            throw new Error('Failed to save user data');
        }
    };

    const handleCopyWalletAddress = () => {
        if (walletAddress) {
            navigator.clipboard.writeText(walletAddress);
            setAlert({ type: 'info', message: 'Wallet address copied to clipboard!' });
        }
    };

    return (
        <div className="flex justify-center items-center h-full pt-48 pb-64">
            <div className="w-full max-w-md mx-auto rounded-lg p-8 shadow-xl bg-gray-600">
                <h2 className="text-3xl font-bold text-center text-white mb-8">Create new account.</h2>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    {!showForm && (
                        <>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">Username</label>
                                <input type="text" id="username" name="username" className="w-full px-3 py-2 rounded-md bg-gray-700 text-white" required onChange={handleInputChange} />
                            </div>
                            <button type="button" onClick={() => setShowForm(true)} className="w-full px-4 py-2 my-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
                                Create account
                            </button>
                        </>
                    )}
                    {showForm && (
                        <>
                            <div>
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-300">First Name</label>
                                <input type="text" id="firstName" name="firstName" className="w-full px-3 py-2 rounded-md bg-gray-700 text-white" required onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-300">Last Name</label>
                                <input type="text" id="lastName" name="lastName" className="w-full px-3 py-2 rounded-md bg-gray-700 text-white" required onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">Username</label>
                                <input type="text" id="username" name="username" className="w-full px-3 py-2 rounded-md bg-gray-700 text-white" required onChange={handleInputChange} />
                            </div>
                            {walletAddress && (
                                <>
                                    <div>
                                        <label htmlFor="sponsor" className="block mb-2 text-sm font-medium text-gray-300">Patrocinador</label>
                                        <input type="text" id="sponsor" name="sponsor" className="w-full px-3 py-2 rounded-md bg-gray-700 text-white" onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-300">Level</label>
                                        <select id="level" name="level" className="w-full px-3 py-2 rounded-md bg-gray-700 text-white" value={formData.level} onChange={handleInputChange}>
                                            {levels.map(level => (
                                                <option key={level.level} value={level.level}>{`Level ${level.level} - $${level.amount}`}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <label htmlFor="walletAddress" className="block mb-2 text-sm font-medium text-gray-300">Wallet Address</label>
                                        <input type="text" id="walletAddress" name="walletAddress" className="w-full px-3 py-2 rounded-md bg-gray-700 text-white" value={walletAddress || ''} readOnly />
                                        <button type="button" onClick={handleCopyWalletAddress} className="absolute right-3 top-3">
                                            <RiFileCopyLine className="text-white" />
                                        </button>
                                    </div>
                                </>
                            )}
                            <button type="button" onClick={handleWalletConnect} className="w-full px-4 py-2 my-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
                                Conectar con wallet
                            </button>
                            <button type="submit" className="w-full px-4 py-2 my-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-400">
                                Register and Pay
                            </button>
                        </>
                    )}
                </form>
                <div className="mt-6 text-center">
                    <a href="#" className="text-sm text-blue-500 hover:underline">Already A Member? Log In</a>
                </div>
                {alert && (
                    <Stack sx={{ width: '100%' }} spacing={2} className="mt-6">
                        <Alert severity={alert.type}>{alert.message}</Alert>
                    </Stack>
                )}
            </div>
        </div>
    );
}
