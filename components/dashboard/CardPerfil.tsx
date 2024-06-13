import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';
import { FaCoins, FaDollarSign, FaUsers, FaHome, FaMoneyBillWave } from 'react-icons/fa';

const CardPerfil = () => {
    const { user } = useAuth();

    if (!user) {
        return <div className='w-full flex justify-center items-center h-96 text-white'>
            Loading...
        </div>; // O algún componente de carga apropiado
    }

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-3xl bg-gray-100 p-6 shadow-md mb-6 rounded-xl">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex-1 mb-4 md:mb-0">
                        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaCoins className="text-yellow-500" />
                            <span>Tokens:</span>
                            <span className="ml-1">{user.tokens}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaDollarSign className="text-green-500" />
                            <span>Contribución:</span>
                            <span className="ml-1">${user.contribution}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaUsers className="text-blue-500" />
                            <span>Equipo Pool:</span>
                            <span className="ml-1">${user.teamPool}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaHome className="text-red-500" />
                            <span>Propiedades:</span>
                            <span className="ml-1">{user.properties}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaMoneyBillWave className="text-purple-500" />
                            <span>Ganancias:</span>
                            <span className="ml-1">${user.earnings}</span>
                        </div>
                    </div>
                    <div className="flex-shrink-0 text-center md:text-left">
                        <Image src={user.profileImage} alt="Perfil" width={100} height={100} className="rounded-full" />
                        <div className="mt-4">
                            <div className="text-sm text-gray-600">Link de referido:</div>
                            <div className="text-blue-500 break-all">{user.referralLink}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardPerfil;
