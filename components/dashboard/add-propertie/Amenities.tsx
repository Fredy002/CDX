'use client';

import React from 'react';
import { comodidades } from '@/utils/comodidades';

const Amenities = ({ formValues, handleChange }: any) => {
    return (
        <div>
            <h2 className='text-3xl font-semibold py-10'>Seleccionar Comodidades</h2>
            <div className='flex flex-row flex-wrap gap-5 justify-center'>
                {comodidades.map((item) => (
                    <div className='w-[30%] items-center' key={item.id}>
                        <input className='mx-1' type="checkbox" id={item.item.toLowerCase().replace(/\s/g, "-")} name={item.item.toLowerCase().replace(/\s/g, "-")} checked={formValues.amenities[item.item.toLowerCase().replace(/\s/g, "-")] || false} onChange={handleChange} />
                        <label htmlFor={item.item.toLowerCase().replace(/\s/g, "-")}>{item.item}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Amenities;
