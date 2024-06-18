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
                <Input id="price" placeholder="Precio de la propiedad" type="number" value={formValues.price} onChange={handleChange} />
            </LabelInputContainer>

            <div className='flex flex-row gap-10 py-6'>
                <LabelInputContainer>
                    <Label htmlFor="area">Área</Label>
                    <Input id="area" placeholder="200m" type="number" value={formValues.area} onChange={handleChange} />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="bedrooms">Habitaciones</Label>
                    <Input id="bedrooms" placeholder="0" type="number" value={formValues.bedrooms} onChange={handleChange} />
                </LabelInputContainer>
            </div>

            <div className='flex flex-row gap-10 py-5'>
                <LabelInputContainer>
                    <Label htmlFor="bathrooms">Baños</Label>
                    <Input id="bathrooms" placeholder="0" type="number" value={formValues.bathrooms} onChange={handleChange} />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="kitchens">Cocinas</Label>
                    <Input id="kitchens" placeholder="0" type="number" value={formValues.kitchens} onChange={handleChange} />
                </LabelInputContainer>
            </div>

            <div className='flex flex-row gap-10 py-5'>
                <LabelInputContainer>
                    <Label htmlFor="garages">Garajes</Label>
                    <Input id="garages" placeholder="0" type="number" value={formValues.garages} onChange={handleChange} />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="garageArea">Área del Garaje</Label>
                    <Input id="garageArea" placeholder="20m" type="number" value={formValues.garageArea} onChange={handleChange} />
                </LabelInputContainer>
            </div>

            <div className='flex flex-row gap-10 py-5'>
                <LabelInputContainer>
                    <Label htmlFor="yearBuilt">Año de construcción</Label>
                    <Input id="yearBuilt" placeholder="Escribe el año" type="number" value={formValues.yearBuilt} onChange={handleChange} />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label htmlFor="flours">Pisos</Label>
                    <Input id="flours" placeholder="0" type="number" value={formValues.flours} onChange={handleChange} />
                </LabelInputContainer>
            </div>
        </div>
    );
}

export default ListingDetails;
