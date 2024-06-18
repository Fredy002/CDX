'use client';

import React, { useEffect, useState } from 'react';
import { BottomGradient } from "@/components/ui/BottomGradient";
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';
import { Alert, Stack } from '@mui/material';
import UserInfo from '@/components/dashboard/perfil/UserInfo';
import ContactInfo from '@/components/dashboard/perfil/ContactInfo';
import SocialMediaInfo from '@/components/dashboard/perfil/SocialMediaInfo';
import AddressInfo from '@/components/dashboard/perfil/AddressInfo';

const PerfilPage = () => {
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  const { user } = useAuth();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    website: '',
    about: '',
    social1: '',
    social2: '',
    address: '',
    country: '',
    city: '',
    district: '',
    location: ''
  });

  useEffect(() => {
    if (user) {
      setFormValues({
        username: user.username || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        website: user.website || '',
        about: user.about || '',
        social1: user.social1 || '',
        social2: user.social2 || '',
        address: user.address || '',
        country: user.country || '',
        city: user.city || '',
        district: user.district || '',
        location: user.location || ''
      });
    }
  }, [user]);

  useEffect(() => {
    const address = localStorage.getItem('walletAddress');
    setWalletAddress(address);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormValues({
      username: user?.username || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      website: user?.website || '',
      about: user?.about || '',
      social1: user?.social1 || '',
      social2: user?.social2 || '',
      address: user?.address || '',
      country: user?.country || '',
      city: user?.city || '',
      district: user?.district || '',
      location: user?.location || ''
    });
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields = [
      formValues.username,
      formValues.firstName,
      formValues.lastName,
      formValues.email,
      formValues.phoneNumber,
      formValues.website,
      formValues.about,
      formValues.address,
      formValues.country,
      formValues.city,
      formValues.district,
      formValues.location
    ];

    const areFieldsFilled = requiredFields.every(field => field && field.trim() !== '');

    if (!areFieldsFilled) {
      setAlert({ type: 'error', message: 'Completa tu información faltante' });
      return;
    }

    // Handle form submission to save the changes
    console.log('Form submitted:', formValues);
    setIsEditing(false);
    setAlert({ type: 'success', message: 'Información guardada exitosamente.' });
  };

  return (
    <div className='flex justify-center h-full overflow-y-auto'>
      <div className="w-full h-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-zinc-800 overflow-y-auto">
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="text-xl text-neutral-800 dark:text-neutral-200 flex justify-start gap-4 md-gap-8">
            <div className='w-[120px] md:w[100px]'>
              <Image
                src={"/images/logo.png"}
                alt={"foto de perfil"}
                width={150}
                height={150}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <button type="button" className='text-sm md:text-xl' onClick={() => setIsEditing(true)}>
              Editar
              <BottomGradient />
            </button>
            {isEditing && (
              <>
                <button type="button" className='text-sm md:text-xl' onClick={handleCancel}>
                  Cancelar
                </button>
                <button type="submit" className='text-sm md:text-xl'>
                  Guardar
                </button>
              </>
            )}
          </div>
          <UserInfo formValues={formValues} handleChange={handleChange} isEditing={isEditing} />
          <ContactInfo formValues={formValues} handleChange={handleChange} isEditing={isEditing} />
          <SocialMediaInfo formValues={formValues} handleChange={handleChange} isEditing={isEditing} />
          <AddressInfo formValues={formValues} handleChange={handleChange} isEditing={isEditing} />
        </form>
        {alert && (
          <Stack sx={{ width: '100%' }} spacing={2} className="mt-6">
            <Alert severity={alert.type}>{alert.message}</Alert>
          </Stack>
        )}
      </div>
    </div>
  );
};

export default PerfilPage;
