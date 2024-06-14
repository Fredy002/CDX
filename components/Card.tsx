import React from 'react';
import Image from 'next/image';
import { FaHeart } from "react-icons/fa6";
import AddPropertiePage from '../app/dashboard/add-propertie/page';

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
        <div className="bg-transparent shadow-md rounded-xl overflow-hidden w-[320px] h-auto md:w-[400px] md:h-auto bg-white flex flex-col">
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
                <div >

                        <h2 className="text-blue-900 text-xl text-center font-semibold mb-1">{inmueble.tipo} EN VENTA</h2>
                        <p className="text-blue-500 font-bold  text-center text-xl">{tokenPrice} / {inmueble.precio} </p>
                                      
                </div>
                
                <p className="text-gray-500  mb-2">{inmueble.ubicacion}</p>
                <p className="text-gray-700 mb-4">{inmueble.descripcion}</p>

                <div className='flex flex-row justify-center flex-wrap gap-2'>
                    <p className="text-white text-sm text-semibold border rounded-full w-auto bg-gray-500 p-0.5 px-2 text-center mb-2">  baños {inmueble.baños} </p>
                    <p className="text-white text-sm text-semibold border rounded-full w-auto bg-gray-500 p-0.5 px-2 text-center mb-2"> cuartos {inmueble.habitaciones}  </p>
                    <p className="text-white text-sm text-semibold border rounded-full w-auto bg-gray-500 p-0.5 px-2 text-center mb-2">  area {inmueble.area} </p>

                    
                </div>
                
                
            </div>
            <div className="px-4 py-2 bg-gray-100 border-t flex justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                <p className="text-black text-sm border rounded-full w-auto bg-gray-200 p-0.5 px-1 text-center mb-2">  ROI: {inmueble.roi}% </p>
                <p className="text-black text-sm border rounded-full w-auto bg-gray-200 p-0.5 px-1 text-center mb-2">  PARTICIPANTES: {inmueble.participantes} </p>
                <p className="text-black text-sm border rounded-full w-auto bg-gray-200 p-0.5 px-1 text-center mb-2">  RENT: ${inmueble.rent} </p>
                    
                </div>
                <div>
                    <button className="text-gray-600" onClick={onDetailClick}>Detail</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
