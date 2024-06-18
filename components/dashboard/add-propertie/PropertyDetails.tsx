'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label, LabelInputContainer } from '@/components/ui/label';

const PropertyDetails = ({ formValues, handleChange }: any) => {
    return (
        <div className="flex flex-col space-y-1 md:space-y-0 md:space-x-2 mb-4 gap-8">
            <h2 className='text-3xl font-semibold'>Vista</h2>
            <LabelInputContainer>
                <Label htmlFor="propertyTitle">Titulo Propiedad</Label>
                <Input id="propertyTitle" placeholder="Nombre de la propiedad" type="text" value={formValues.propertyTitle} onChange={handleChange} />
            </LabelInputContainer>

            <LabelInputContainer>
                <Label htmlFor="description">Descripcion</Label>
                <Input id="description" placeholder="Escribe acerca de tu propiedad" type="text" value={formValues.description} onChange={handleChange} />
            </LabelInputContainer>

            <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-2 w-[50%]">
                    <label htmlFor="categorySelection">Categoría</label>
                    <select name="categorySelection" id="categorySelection" className="border border-gray-300 rounded-md px-2 py-1" value={formValues.categorySelection} onChange={handleChange}>
                        <option value="houses">Casas</option>
                        <option value="apartments">Departamentos</option>
                        <option value="condos">Condominios</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetails;
