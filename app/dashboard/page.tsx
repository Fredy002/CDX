'use client';
import Card from '@/components/Card';
import DetailView from '@/components/DetailView';
import React, { useState } from 'react';
import { inmuebles } from '@/utils/inmuebles';
import CardPerfil from '@/components/dashboard/CardPerfil';

const DashboardPage = () => {
    const [selectedInmueble, setSelectedInmueble] = useState<null | typeof inmuebles[0]>(null);

    const handleCloseDetail = () => {
        setSelectedInmueble(null);
    };

    return (
        <div className="flex flex-col items-start text-black w-full min-h-screen pt-10">
            <CardPerfil />
            <div className="w-full flex flex-1 overflow-hidden">
                <div className={`flex-1 ${selectedInmueble ? 'lg:w-[60%]' : 'lg:w-full'} pb-20 flex flex-wrap justify-center gap-8 overflow-auto`}>
                    {
                        inmuebles.map((inmueble) => (
                            <Card key={inmueble.id} inmueble={inmueble} onDetailClick={() => setSelectedInmueble(inmueble)} />
                        ))
                    }
                </div>
                {selectedInmueble && (
                    <div className='flex-shrink-0 w-full lg:w-[40%] p-6 overflow-auto h-full'>
                        <DetailView inmueble={selectedInmueble} onClose={handleCloseDetail} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
