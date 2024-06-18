'use client';

import React from 'react';

const FileUpload = () => {
    return (
        <div>
            <h2 className='text-3xl font-semibold'>Adjunto de Foto y Video</h2>
            <div className='flex flex-col py-5'>
                <span>Archivo adjunto*</span>
                <div className="flex flex-row justify-between bg-black items-center px-10 rounded-xl py-4 mt-2">
                    <span>FotoPropiedad01.jpg</span>
                    <button type="button">x</button>
                </div>
                <div className="flex flex-row justify-between bg-black items-center px-10 rounded-xl py-4 mt-2">
                    <span>FotoPropiedad01.jpg</span>
                    <button type="button">x</button>
                </div>
            </div>
            <div className='flex flex-row flex-start gap-5 items-center'>
                <button type="button" className='bg-black text-white p-3 rounded-xl'>Subir archivo</button>
                <span>Subir archivo.png,.jpg,.mp4</span>
            </div>
        </div>
    );
}

export default FileUpload;
