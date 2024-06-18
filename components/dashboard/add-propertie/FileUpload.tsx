'use client';

import { Input } from '@/components/ui/input';
import { Label, LabelInputContainer } from '@/components/ui/label';
import React, { useState } from 'react';


const FileUpload = () => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleImageChange = () => {
        setLoading(true);
        const img = new Image();
        img.src = currentImageUrl;
        img.onload = () => {
            setLoading(false);
            setImageUrls((prevUrls) => [...prevUrls, currentImageUrl]);
            setCurrentImageUrl('');
        };
    };

    const handleRemoveImage = (index: number) => {
        setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
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
                        imageUrls.map((url, index) => (
                            <div key={index} className="relative w-64 h-64 border border-gray-300 rounded-md overflow-hidden">
                                <img src={url} alt={`Selected ${index}`} className='w-full h-full object-cover' />
                                <button onClick={() => handleRemoveImage(index)} className="absolute top-2 right-2 bg-red-500 text-white rounded-2xl p-1">x</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className='flex flex-row flex-start gap-5 items-center py-2'>
                <Label>Cargar imagen:</Label>
                <Input type='text' value={currentImageUrl} onChange={(e) => setCurrentImageUrl(e.target.value)} />
                <button className='bg-blue-500 text-white p-2 rounded-xl' onClick={handleImageChange}>Añadir Foto</button>
            </div>
            <div className='flex justify-center py-4'>
                <button className='bg-blue-500 text-white p-3 rounded-xl' onClick={() => console.log('Imágenes a subir:', imageUrls)}>Subir Fotos</button>
            </div>
        </div>
    );
}

export default FileUpload;
