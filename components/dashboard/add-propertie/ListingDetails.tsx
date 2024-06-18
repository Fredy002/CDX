'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label, LabelInputContainer } from '@/components/ui/label';

const ListingDetails = ({ formValues, handleChange }: any) => {
    return (
        <div className='flex flex-col py-10'>
            <h2 className='text-3xl font-semibold'>
                Detalles de la Propiedad
            </h2>
            <LabelInputContainer className='py-4'>
                <Label htmlFor="price">Precio</Label>
                <Input id="price" placeholder="Precio de la propiedad" type="text" value={formValues.price} onChange={handleChange} />
            </LabelInputContainer>

            <div className='flex flex-row gap-10 py-6'>
                <LabelInputContainer>
                    <Label htmlFor="area">Area</Label>
                    <Input id="area" placeholder="200m" type="text" value={formValues.area} onChange={handleChange} />
                </LabelInputContainer>

                <div className='flex flex-col gap-1 w-full space-y-2'>
                    <label htmlFor="bedrooms" className='text-sm font-medium text-black dark:text-white leading-none'>Habitaciones</label>
                    <select name="bedrooms" id="bedrooms" className="border border-gray-300 rounded-md px-2 py-1.5" value={formValues.bedrooms} onChange={handleChange}>
                        <option value="0">0</option>
                        <option value="1">1</option >
                        <option value="2">2</option>
                    </select>
                </div>
            </div>

            <div className='flex flex-row gap-10 py-5'>
                <div className='flex flex-col gap-2 w-[50%] space-y-2'>
                    <label htmlFor="bathrooms" className='text-sm font-medium text-black dark:text-white leading-none'>Baños</label>
                    <select name="bathrooms" id="bathrooms" className="border border-gray-300 rounded-md px-2 py-1.5" value={formValues.bathrooms} onChange={handleChange}>
                        <option value="0">0</option>
                        <option value="1">1</option >
                        <option value="2">2</option>
                    </select>
                </div>

                <div className='flex flex-col gap-2 w-[50%] space-y-2'>
                    <label htmlFor="kitchens" className='text-sm font-medium text-black dark:text-white leading-none'>Cocinas</label>
                    <select name="kitchens" id="kitchens" className="border border-gray-300 rounded-md px-2 py-1.5" value={formValues.kitchens} onChange={handleChange}>
                        <option value="0">0</option>
                        <option value="1">1</option >
                        <option value="2">2</option>
                    </select>
                </div>
            </div>

            <div className='flex flex-row gap-10 py-5'>
                <div className='flex flex-col gap-1 w-full space-y-2'>
                    <label htmlFor="garages" className='text-sm font-medium text-black dark:text-white leading-none'>Garajes</label>
                    <select name="garages" id="garages" className="border border-gray-300 rounded-md px-2 py-1.5" value={formValues.garages} onChange={handleChange}>
                        <option value="0">0</option>
                        <option value="1">1</option >
                        <option value="2">2</option>
                    </select>
                </div>
                <LabelInputContainer>
                    <Label htmlFor="garageArea">Area del Garaje</Label>
                    <Input id="garageArea" placeholder="20m" type="text" value={formValues.garageArea} onChange={handleChange} />
                </LabelInputContainer>
            </div>

            <div className='flex flex-row gap-10 py-5'>
                <LabelInputContainer>
                    <Label htmlFor="yearBuilt">Año de construcción</Label>
                    <Input id="yearBuilt" placeholder="Escribe el año" type="text" value={formValues.yearBuilt} onChange={handleChange} />
                </LabelInputContainer>

                <div className='flex flex-col gap-1 w-full space-y-2'>
                    <label htmlFor="flours" className='text-sm font-medium text-black dark:text-white leading-none'>Pisos</label>
                    <select name="flours" id="flours" className="border border-gray-300 rounded-md px-2 py-1.5" value={formValues.flours} onChange={handleChange}>
                        <option value="0">0</option>
                        <option value="1">1</option >
                        <option value="2">2</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default ListingDetails;
