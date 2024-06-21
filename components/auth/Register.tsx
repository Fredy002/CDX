<<<<<<< HEAD
=======
"use client";

>>>>>>> 29865f9d1eec8b31b6dd5e2fa72845171d7770c8
import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { RiFileCopyLine } from 'react-icons/ri';
<<<<<<< HEAD
import Web3 from 'web3'; // Asegúrate de tener web3 instalado y configurado correctamente

const web3 = new Web3(Web3.givenProvider);

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

const Register = ({ setShowForm }: { setShowForm: (show: boolean) => void }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    level: '1',
    sponsor: '', // Sponsor se manejará internamente en el estado local
  });
  const [alert, setAlert] = useState<{ type: 'success' | 'info' | 'warning' | 'error', message: string } | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState(false);
  const [requestingAccounts, setRequestingAccounts] = useState(false);
  const [bnbUsdPrice, setBnbUsdPrice] = useState<number | null>(null);

  useEffect(() => {
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
      setIsWalletConnected(true);
    }

    // Lógica para manejar el parámetro ref del referido
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref');
    if (refParam) {
      setFormData(prevData => ({ ...prevData, sponsor: refParam }));
    }
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
    fetchBnbPriceInUsd();
  }, [alert]);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined' && !requestingAccounts) {
        setRequestingAccounts(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        localStorage.setItem('walletAddress', accounts[0]);
        setIsWalletConnected(true);
        setAlert({ type: 'success', message: 'Wallet connected successfully!' });
      } else {
        throw new Error('MetaMask (or other Web3 provider) is not installed or already processing a request.');
      }
    } catch (error) {
      console.error(error);
      setAlert({ type: 'error', message: 'Failed to connect wallet. Please try again.' });
    } finally {
      setRequestingAccounts(false);
    }
  };  

  const handleCopyWalletAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setAlert({ type: 'info', message: 'Wallet address copied to clipboard!' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchBnbPriceInUsd = async () => {
    const apiKey = 'AVWJC6CCGPMXHPPH6SDHAYGED74QP7TXCW'; // tu clave de API de BscScan
    const url = `https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch BNB price: Network response was not ok.');
      }
      const data = await response.json();
      if (data.status === '1') {
        setBnbUsdPrice(parseFloat(data.result.ethusd)); // Actualizar el estado con el precio en USD de BNB
      } else {
        throw new Error('Failed to fetch BNB price: Invalid response from BscScan.');
      }
    } catch (error) {
      console.error('Failed to fetch BNB price:', error);
      setAlert({ type: 'error', message: 'Failed to fetch BNB price. Please try again later.' });
    }
  };  
  

  const bnbToWei = (bnbAmount: number): string => {
    // Convertir BNB a Wei usando la librería web3.js
    const weiAmount = web3.utils.toWei(String(bnbAmount), 'ether');
    return weiAmount;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletAddress) {
      setAlert({ type: 'warning', message: 'Please connect your wallet first.' });
      return;
    }

    if (!bnbUsdPrice) {
      setAlert({ type: 'error', message: 'BNB price not available. Please try again later.' });
      return;
    }

    const selectedLevel = levels.find(level => level.level === Number(formData.level));

    if (!selectedLevel) {
      setAlert({ type: 'error', message: 'Invalid level selected.' });
      return;
    }

    try {
      const amountInBnb = selectedLevel.amount / bnbUsdPrice;
      const amountInWei = bnbToWei(amountInBnb);
      await handlePayment(amountInWei);
      await registerUser();
    } catch (error) {
      console.error('Payment or registration failed', error);
      setAlert({ type: 'error', message: 'Payment or registration failed. Please try again.' });
    }
  };

  const handlePayment = async (amount: string) => {
    try {
      if (typeof window.ethereum === 'undefined' || !walletAddress) {
        throw new Error('MetaMask (or other Web3 provider) is not installed or wallet address not set');
      }
      
      const transactionParameters = {
        from: walletAddress,
        to: '0xAFa5f9670b6809F7A200DBB4A3E8bfD056c855E8', // Replace with recipient wallet address
        value: amount,
      };
  
      const transactionHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
  
      console.log('Transaction sent:', transactionHash);
      setAlert({ type: 'success', message: 'Payment successful!' });
    } catch (error) {
      console.error('Payment failed', error);
      setAlert({ type: 'error', message: 'Payment failed. Please try again.' });
      throw error;
    }
  };
  

  const registerUser = async () => {
    try {
      const refLink = `https://dinsy.pro/auth?ref=${formData.username}`;

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, wallet: walletAddress, refLink }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify({ ...formData, walletAddress }));
        setAlert({ type: 'success', message: 'Registration successful and data saved!' });
        // Redirect to dashboard on successful registration
        window.location.href = '/dashboard';
      } else {
        const errorData = await response.json();
        setAlert({ type: 'error', message: 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('Registration failed', error);
      setAlert({ type: 'error', message: 'Registration failed. Please try again.' });
    }
  };
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r pt-44 pb-14">
      <div className="w-full max-w-lg mx-auto rounded-lg p-8 shadow-xl bg-gray-700 bg-opacity-90 backdrop-blur-lg">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Create an Account</h2>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-300">First Name</label>
            <input type="text" id="firstName" name="firstName" className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500" required onChange={handleInputChange} />
            <div>
              <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-300">Last Name</label>
              <input type="text" id="lastName" name="lastName" className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500" required onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">Username</label>
              <input type="text" id="username" name="username" className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500" required onChange={handleInputChange} />
            </div>
            {!isWalletConnected && (
              <button
                type="button"
                onClick={connectWallet}
                className="w-full px-4 py-2 my-2 rounded-md text-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                disabled={connectingWallet}
              >
                {connectingWallet ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
            {isWalletConnected && (
              <>
                <div>
                  <label htmlFor="sponsor" className="block mb-2 text-sm font-medium text-gray-300">Sponsor</label>
                  <input type="text" id="sponsor" name="sponsor" className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500" value={formData.sponsor} onChange={handleInputChange} readOnly />
                </div>
                <div>
                  <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-300">Level</label>
                  <select id="level" name="level" className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500" value={formData.level} onChange={handleInputChange}>
                    {levels.map(level => (
                      <option key={level.level} value={level.level}>{`Level ${level.level} - $${level.amount}`}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <label htmlFor="walletAddress" className="block mb-2 text-sm font-medium text-gray-300">Wallet Address</label>
                  <input type="text" id="walletAddress" name="walletAddress" className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500" value={walletAddress || ''} readOnly />
                  <button type="button" onClick={handleCopyWalletAddress} className="absolute right-3 top-3 text-blue-500 hover:text-blue-300">
                    <RiFileCopyLine size={20} />
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 my-2 rounded-md text-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Register and Pay
                </button>
              </>
            )}
            {alert && (
              <Stack sx={{ width: '100%' }} spacing={2} className="mt-6">
                <Alert severity={alert.type}>{alert.message}</Alert>
              </Stack>
            )}
          </div>
        </form>
          <div className="mt-6 text-center">
            <a href="#" className="text-lg text-blue-400 hover:text-blue-600 transition duration-300" onClick={() => setShowForm(false)}>
              Already have an account? Log in
            </a>
          </div>
        </div>
      </div>
  );
};

export default Register;
=======
import { useAuth } from '@/app/context/AuthContext';

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

export default function Register({ setShowForm }: { setShowForm: (show: boolean) => void }) {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
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

        try {
            await saveUserData();
            setUser({ ...formData, walletAddress }); // Guardar los datos del usuario en el contexto
            localStorage.setItem('user', JSON.stringify({ ...formData, walletAddress })); // Guardar los datos del usuario en el almacenamiento local
            setAlert({ type: 'success', message: 'Registration successful and data saved!' });
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Registration failed', error);
            setAlert({ type: 'error', message: 'Registration failed. Please try again.' });
        }
    };

    const saveUserData = async () => {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, wallet: walletAddress }),
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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r pt-44 pb-14">
            <div className="w-full max-w-lg mx-auto rounded-lg p-8 shadow-xl bg-gray-700 bg-opacity-90 backdrop-blur-lg">
                <h2 className="text-4xl font-bold text-center text-white mb-8">Crea una cuenta</h2>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-300">First Name</label>
                        <input type="text" id="firstName" name="firstName" className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500" required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-300">Last Name</label>
                        <input type="text" id="lastName" name="lastName" className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500" required onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">Username</label>
                        <input type="text" id="username" name="username" className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500" required onChange={handleInputChange} />
                    </div>
                    {walletAddress && (
                        <>
                            <div>
                                <label htmlFor="sponsor" className="block mb-2 text-sm font-medium text-gray-300">Patrocinador</label>
                                <input type="text" id="sponsor" name="sponsor" className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500" onChange={handleInputChange} />
                            </div>
                            <div>
                                <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-300">Level</label>
                                <select id="level" name="level" className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500" value={formData.level} onChange={handleInputChange}>
                                    {levels.map(level => (
                                        <option key={level.level} value={level.level}>{`Level ${level.level} - $${level.amount}`}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative">
                                <label htmlFor="walletAddress" className="block mb-2 text-sm font-medium text-gray-300">Wallet Address</label>
                                <input type="text" id="walletAddress" name="walletAddress" className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500" value={walletAddress || ''} readOnly />
                                <button type="button" onClick={handleCopyWalletAddress} className="absolute right-3 top-3 text-blue-500 hover:text-blue-300">
                                    <RiFileCopyLine size={20} />
                                </button>
                            </div>
                        </>
                    )}
                    <button type="button" onClick={handleWalletConnect} className="w-full px-4 py-2 my-2 rounded-md text-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
                        Conectar con wallet
                    </button>
                    <button type="submit" className="w-full px-4 py-2 my-2 rounded-md text-lg font-medium bg-green-600 text-white hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105">
                        Register and Pay
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <a href="#" className="text-lg text-blue-400 hover:underline hover:text-blue-100 transition duration-300" onClick={() => setShowForm(false)}>
                        Tienes una cuenta? Inicia sesión
                    </a>
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
>>>>>>> 29865f9d1eec8b31b6dd5e2fa72845171d7770c8
