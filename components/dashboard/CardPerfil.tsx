import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';
import { FaCoins, FaDollarSign, FaUsers, FaHome, FaMoneyBillWave } from 'react-icons/fa';
import { planes } from '@/utils/planes';

const CardPerfil = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="w-full flex justify-center items-center mb-10">
                <div className="w-96 flex justify-center items-center h-96 bg-gradient-to-br from-gray-800 to-[#0E0548] text-cyan-400 text-2xl font-semibold animate-pulse rounded-2xl">
                    Loading...
                </div>
            </div>
        );
    }

    // Convertir el nivel a número para asegurar la comparación correcta
    const userLevel = Number(user.level);
    const userPlan = planes.find(plan => plan.id === userLevel);

    const tokenAmount = userPlan ? userPlan.price : 'N/A';
    const contributionAmount = userPlan ? userPlan.price : 'N/A';

    // Asignar valores predeterminados si no están definidos
    const teamPool = user.sponsor || 'N/A';
    const properties = user.properties || 0;
    const earnings = user.earnings || 0;

    return (
        <div className="w-full flex justify-center">
            <div className="w-[300px] md:w-[600px] max-w-3xl bg-gradient-to-br from-[#2F2D8E] to-[#0E0548] shadow-2xl mb-6 rounded-xl p-8 pb-6 pt-6 transform transition-transform duration-300 items-center justify-center flex">
                <div className="flex flex-col items-center md:flex-row md:justify-between">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <Image src='/images/perfil.png' alt="Perfil" width={100} height={100} className="rounded-full border-4 border-cyan-400 mx-auto md:mx-0" />
                        <div className="mt-4">
                            <div className="text-sm text-gray-400">Link de referido:</div>
                            <div className="text-cyan-400 break-all">{user.referralLink}</div>
                        </div>
                    </div>
                    <div className="flex-1 md:ml-8">
                        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaCoins className="text-yellow-500" />
                            <span className="text-cyan-400">Tokens:</span>
                            <span className="ml-1 text-white">{tokenAmount}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaDollarSign className="text-green-500" />
                            <span className="text-cyan-400">Contribución:</span>
                            <span className="ml-1 text-white">${contributionAmount}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaUsers className="text-blue-500" />
                            <span className="text-cyan-400">Equipo Pool:</span>
                            <span className="ml-1 text-white">{teamPool}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaHome className="text-red-500" />
                            <span className="text-cyan-400">Propiedades:</span>
                            <span className="ml-1 text-white">{properties}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaMoneyBillWave className="text-purple-500" />
                            <span className="text-cyan-400">Ganancias:</span>
                            <span className="ml-1 text-white">${earnings}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardPerfil;
