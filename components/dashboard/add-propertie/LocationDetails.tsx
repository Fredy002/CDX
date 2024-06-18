'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label, LabelInputContainer } from '@/components/ui/label';

const LocationDetails = ({ formValues, handleChange }: any) => {
    return (
        <div className='flex flex-col gap-4 py-10'>
            <h2 className='text-3xl font-semibold'>Dirección y ubicación</h2>
            <LabelInputContainer>
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" placeholder="Jr. lorem 299" type="text" value={formValues.address} onChange={handleChange} />
            </LabelInputContainer>

            <div className='flex flex-row flex-wrap justify-around w-full z-50'>
                <LabelInputContainer className='flex w-auto'>
                    <Label htmlFor="country">País</Label>
                    <Input id="country" placeholder="Perú" type="text" value={formValues.country} onChange={handleChange} />
                </LabelInputContainer>

                <LabelInputContainer className='flex w-auto'>
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" placeholder="Lima" type="text" value={formValues.city} onChange={handleChange} />
                </LabelInputContainer>

                <LabelInputContainer className='flex w-auto'>
                    <Label htmlFor="zipCode">Código Postal</Label>
                    <Input id="zipCode" placeholder="12043" type="text" value={formValues.zipCode} onChange={handleChange} />
                </LabelInputContainer>

                <LabelInputContainer className='flex w-auto'>
                    <Label htmlFor="district">Distrito</Label>
                    <Input id="district" placeholder="Miraflores" type="text" value={formValues.district} onChange={handleChange} />
                </LabelInputContainer>
            </div>
            <LabelInputContainer>
                <Label htmlFor="mapLocation">Ubicación</Label>
                <Input id="mapLocation" placeholder="XC32+WD1, Moiran, N105" type="text" value={formValues.mapLocation} onChange={handleChange} />
            </LabelInputContainer>
            <div className="relative w-full h-96">
                <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12080.73732861526!2d-74.0059418!3d40.7127847!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMDA2JzEwLjAiTiA3NMKwMjUnMzcuNyJX!5e0!3m2!1sen!2sus!4v1648482801994!5m2!1sen!2sus" aria-hidden="false"></iframe>
            </div>
        </div>
    );
}

export default LocationDetails;
