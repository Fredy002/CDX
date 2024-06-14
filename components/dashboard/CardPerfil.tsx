import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';
import { FaCoins, FaDollarSign, FaUsers, FaHome, FaMoneyBillWave } from 'react-icons/fa';
import { planes } from '@/utils/planes';

const CardPerfil = () => {
    const { user } = useAuth();

    // Verificar y mostrar datos del usuario para depuración
    console.log("Datos del usuario:", user);

    if (!user) {
        return <div className='w-full flex justify-center items-center h-96 text-white'>
            Loading...
        </div>;
    }

    // Convertir el nivel a número para asegurar la comparación correcta
    const userLevel = Number(user.level);
    const userPlan = planes.find(plan => plan.id === userLevel);

    // Validar que el plan y los tokens sean correctos
    if (!userPlan) {
        console.error(`No se encontró un plan para el nivel: ${userLevel}`);
    }

    const tokenAmount = userPlan ? userPlan.price : 'N/A';
    const contributionAmount = userPlan ? userPlan.price : 'N/A';

    // Asignar valores predeterminados si no están definidos
    const teamPool = user.sponsor || 'N/A';
    const properties = user.properties || 0;
    const earnings = user.earnings || 0;

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-3xl bg-gray-100 shadow-md mb-6 rounded-xl p-16 pb-6 pt-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex-1 mb-4 md:mb-0">
                        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaCoins className="text-yellow-500" />
                            <span>Tokens:</span>
                            <span className="ml-1">{tokenAmount}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaDollarSign className="text-green-500" />
                            <span>Contribución:</span>
                            <span className="ml-1">${contributionAmount}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaUsers className="text-blue-500" />
                            <span>Equipo Pool:</span>
                            <span className="ml-1">{teamPool}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaHome className="text-red-500" />
                            <span>Propiedades:</span>
                            <span className="ml-1">{properties}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                            <FaMoneyBillWave className="text-purple-500" />
                            <span>Ganancias:</span>
                            <span className="ml-1">${earnings}</span>
                        </div>
                    </div>
                    <div className="flex-shrink-0 text-center md:text-left m-16">
                        <Image src='/images/perfil.png' alt="Perfil" width={100} height={100} className="rounded-full" />
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
