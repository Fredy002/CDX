'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Alert, Stack } from '@mui/material';
import PropertyDetails from '@/components/dashboard/add-propertie/PropertyDetails';
import ListingDetails from '@/components/dashboard/add-propertie/ListingDetails';
import FileUpload from '@/components/dashboard/add-propertie/FileUpload';
import Amenities from '@/components/dashboard/add-propertie/Amenities';
import LocationDetails from '@/components/dashboard/add-propertie/LocationDetails';

type FormValues = {
  propertyTitle: string;
  description: string;
  categorySelection: string;
  price: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  kitchens: string;
  garages: string;
  garageArea: string;
  yearBuilt: string;
  flours: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
  district: string;
  mapLocation: string;
  amenities: { [key: string]: boolean };
};

type AlertType = {
  type: 'error' | 'success';
  message: string;
};

const AddPropertiePage = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    propertyTitle: '',
    description: '',
    categorySelection: '',
    price: '',
    area: '',
    bedrooms: '0',
    bathrooms: '0',
    kitchens: '0',
    garages: '0',
    garageArea: '',
    yearBuilt: '',
    flours: '0',
    address: '',
    country: '',
    city: '',
    zipCode: '',
    district: '',
    mapLocation: '',
    amenities: {},
  });

  const [alert, setAlert] = useState<AlertType | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormValues((prevState) => ({
        ...prevState,
        amenities: {
          ...prevState.amenities,
          [id]: checked,
        },
      }));
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar que todos los campos obligatorios estén completos
    const requiredFields = ['propertyTitle', 'description', 'categorySelection', 'price', 'area', 'bedrooms', 'bathrooms', 'kitchens', 'garages', 'garageArea', 'yearBuilt', 'flours', 'address', 'country', 'city', 'zipCode', 'district', 'mapLocation'];

    for (const field of requiredFields) {
      if (!formValues[field as keyof FormValues]) {
        setAlert({ type: 'error', message: `El campo ${field} es obligatorio.` });
        return;
      }
    }

    localStorage.setItem('formValues', JSON.stringify(formValues));
    console.log('Form values saved:', JSON.stringify(formValues));
    setAlert({ type: 'success', message: 'Propiedad guardada exitosamente.' });
  };

  return (
    <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-zinc-800 overflow-auto">
      <form className="my-8 flex flex-col" onSubmit={handleSubmit}>
        <PropertyDetails formValues={formValues} handleChange={handleChange} />
        <ListingDetails formValues={formValues} handleChange={handleChange} />
        <FileUpload />
        <Amenities formValues={formValues} handleChange={handleChange} />
        <LocationDetails formValues={formValues} handleChange={handleChange} />
        <button type="submit" className='bg-blue-500 text-white p-3 rounded-xl'>Guardar Propiedad</button>
      </form>
      {alert && (
        <Stack sx={{ width: '100%' }} spacing={2} className="mt-6">
          <Alert severity={alert.type}>{alert.message}</Alert>
        </Stack>
      )}
    </div>
  );
}

export default AddPropertiePage;
