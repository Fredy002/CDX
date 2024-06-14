import React from 'react';
import Image from 'next/image';
import { FaHeart } from "react-icons/fa6";

const formatPriceToTokens = (price: any) => {
    const numberPrice = parseFloat(price.replace(/[^\d.-]/g, ''));
    const tokens = numberPrice / 50;

    const formatTokens = (value: number) => {
        if (value % 1 === 0) {
            return value.toFixed(0);
        } else {
            return value.toFixed(2);
        }
    }

    if (tokens >= 1000000) {
        return `${formatTokens(tokens / 1000000)} Millones Tokens`;
    } else if (tokens >= 1000) {
        return `${formatTokens(tokens / 1000)} Mil Tokens`;
    } else {
        return `${formatTokens(tokens)} Tokens`;
    }
}

const Card = ({ inmueble, onDetailClick }: { inmueble: any, onDetailClick: () => void }) => {
    const tokenPrice = formatPriceToTokens(inmueble.precio);

    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl rounded-xl overflow-hidden w-[320px] md:w-[400px] flex flex-col">
            <div className="relative">
                <Image
                    alt="inmueble"
                    src={inmueble.imagen}
                    quality={100}
                    width={300}
                    height={200}
                    className="object-cover w-full"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-br from-pink-500 to-red-500 rounded-full p-2 shadow-md text-white">
                    <FaHeart />
                </div>
            </div>
            <div className="p-4 flex-1">
                <div className="text-center">
                    <h2 className="text-cyan-400 text-xl font-semibold mb-1">{inmueble.tipo} EN VENTA</h2>
                    <p className="text-cyan-200 font-bold text-xl">{tokenPrice} / {inmueble.precio} </p>
                </div>
                <p className="text-gray-400 mb-2">{inmueble.ubicacion}</p>
                <p className="text-gray-300 mb-4">{inmueble.descripcion}</p>
                <div className="flex flex-row justify-center flex-wrap gap-2">
                    <p className="text-white text-sm font-semibold border rounded-full w-auto bg-cyan-700 p-0.5 px-2 text-center mb-2">Baños {inmueble.baños}</p>
                    <p className="text-white text-sm font-semibold border rounded-full w-auto bg-cyan-700 p-0.5 px-2 text-center mb-2">Cuartos {inmueble.habitaciones}</p>
                    <p className="text-white text-sm font-semibold border rounded-full w-auto bg-cyan-700 p-0.5 px-2 text-center mb-2">Área {inmueble.area}</p>
                </div>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 border-t flex justify-between text-sm text-gray-300">
                <div className="flex items-center gap-2">
                    <p className="text-white text-sm border rounded-full w-auto bg-gray-700 p-0.5 px-1 text-center mb-2">ROI: {inmueble.roi}%</p>
                    <p className="text-white text-sm border rounded-full w-auto bg-gray-700 p-0.5 px-1 text-center mb-2">Participantes: {inmueble.participantes}</p>
                    <p className="text-white text-sm border rounded-full w-auto bg-gray-700 p-0.5 px-1 text-center mb-2">Rent: ${inmueble.rent}</p>
                </div>
                <div>
                    <button className="text-cyan-400 hover:text-cyan-200 transition duration-300" onClick={onDetailClick}>Detail</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
