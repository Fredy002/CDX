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
        <div className="bg-transparent shadow-md rounded-xl overflow-hidden w-[400px] bg-white flex flex-col">
            <div className="relative">
                <Image
                    alt="inmueble"
                    src={inmueble.imagen}
                    quality={100}
                    width={300}
                    height={200}
                    className="object-cover w-full"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md text-red-500">
                    <FaHeart />
                </div>
            </div>
            <div className="p-4 flex-1">
                <div className='flex justify-between items-start'>
                    <div>
                        <h2 className="text-blue-900 text-xl font-semibold mb-2">{inmueble.tipo}</h2>
                        <p className="text-gray-500 mb-2">{inmueble.ubicacion}</p>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <p className="text-blue-500 font-bold text-xl">
                            {tokenPrice}
                        </p>
                    </div>
                </div>
                <p className="text-gray-700">{inmueble.descripcion}</p>
            </div>
            <div className="px-4 py-2 bg-gray-100 border-t flex justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <span>{inmueble.area}</span>
                    <span>{inmueble.habitaciones}</span>
                    <span>{inmueble.baños}</span>
                    <span>{inmueble.estacionamientos}</span>
                </div>
                <div>
                    <button className="text-gray-600" onClick={onDetailClick}>Detail</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
