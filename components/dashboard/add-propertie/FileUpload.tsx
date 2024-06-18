/* eslint-disable @next/next/no-img-element */
'use client';

import { Input } from '@/components/ui/input';
import { Label, LabelInputContainer } from '@/components/ui/label';
import React, { useState } from 'react';

type FileUploadProps = {
    formValues: {
        imageUrls: string[];
    };
    handleImageChange: (imageUrls: string[]) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ formValues, handleImageChange }) => {
    const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddImage = () => {
        if (!currentImageUrl) {
            setError('Por favor ingrese una URL de imagen válida.');
            return;
        }

        const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
        const isValidUrl = currentImageUrl.startsWith('https://');
        const isValidExtension = validImageExtensions.some(ext => currentImageUrl.endsWith(ext));

        if (!isValidUrl || !isValidExtension) {
            setError('Tipo de imagen no compatible.');
            return;
        }

        setLoading(true);
        const img = new Image();
        img.src = currentImageUrl;
        img.onload = () => {
            setLoading(false);
            handleImageChange([...formValues.imageUrls, currentImageUrl]);
            setCurrentImageUrl('');
            setError(null);
        };
        img.onerror = () => {
            setLoading(false);
            setError('No se pudo cargar la imagen. Por favor, verifique la URL.');
        };
    };

    const handleRemoveImage = (index: number) => {
        const updatedUrls = formValues.imageUrls.filter((_, i) => i !== index);
        handleImageChange(updatedUrls);
    };

    return (
        <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-zinc-800 overflow-auto">
            <h2 className='text-3xl font-semibold'>Adjunto de Foto</h2>
            <div className='flex flex-col py-5'>
                <div className="w-full flex flex-wrap gap-4">
                    {loading ? (
                        <div className="w-full h-64 flex items-center justify-center border border-gray-300 rounded-md">
                            <span>Loading ....</span>
                        </div>
                    ) : (
                        formValues.imageUrls.map((url, index) => (
                            <div key={index} className="relative w-64 h-64 border border-gray-300 rounded-md overflow-hidden">
                                <img src={url} alt={`Selected ${index}`} className='w-full h-full object-cover' />
                                <button onClick={() => handleRemoveImage(index)} className="absolute top-2 right-2 bg-red-500 text-white rounded-2xl p-1">x</button>
                            </div>
                        ))
                    )}
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
            <div className='flex flex-row flex-start gap-5 items-center py-2'>
                <Label>Cargar imagen:</Label>
                <Input type='text' value={currentImageUrl} onChange={(e) => setCurrentImageUrl(e.target.value)} />
                <button className='bg-blue-500 text-white p-2 rounded-xl' onClick={handleAddImage}>Añadir Foto</button>
            </div>
        </div>
    );
}

export default FileUpload;
