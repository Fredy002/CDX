import React from "react";
import PricingCard from "@/components/dashboard/suscripcion/PricingCard";
import { planes } from "@/utils/planes";
import Link from "next/link";
import { RiUserAddFill, RiUserFollowFill, RiUserStarFill, RiUserHeartFill, RiUserReceived2Fill, RiUserSettingsFill, RiUserSharedFill } from 'react-icons/ri';

const SuscripcionPage = () => {

  const planesAux = planes.slice(0, 3);
  const temp = planes.slice(0, 4);

  return (
    <div className="flex flex-col justify-between space-y-10 h-screen overflow-auto p-10">
      <div className="flex flex-wrap md:flex-nowrap flex-row justify-between gap-6 border-solid border-white border-2 p-4 rounded-2xl">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">Plan Actual (Free)</h2>
          <p>
            Acceso limitado debido a que no está afiliado a ningún plan de DINSY.
            Adquiera un plan ahora y comience a disfrutar de los beneficios!
          </p>
        </div>

        <div className="flex items-center gap-4">
          <h3 className="text-4xl md:text-6xl">$0</h3>
          <div>
            <h2 className="text-lg font-semibold">Membresía Vitalicia</h2>
            <p>Aún no eres miembro de la comunidad de DINSY</p>
            <Link href={""} className="text-blue-400">Adquiere un plan Ahora!</Link>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full md:w-[800px] p-6 md:p-8 bg-gray-100 text-gray-800 rounded-2xl shadow-md">
          <h2 className="text-center text-2xl md:text-3xl font-semibold mb-6">Promociones Especiales</h2>
          <ul className="list-none space-y-4 text-base md:text-lg">
            <li className="flex items-center">
              <RiUserAddFill className="mr-2" />
              Se obtiene el 7% por cada referido directo (primera generación).
            </li>
            <li className="flex items-center">
              <RiUserFollowFill className="mr-2" />
              Se obtiene el 4% por cada referido indirecto de segunda generación.
            </li>
            <li className="flex items-center">
              <RiUserStarFill className="mr-2" />
              Se obtiene el 3% por cada referido indirecto de tercera generación.
            </li>
            <li className="flex items-center">
              <RiUserHeartFill className="mr-2" />
              Se obtiene el 2% por cada referido indirecto de cuarta generación.
            </li>
            <li className="flex items-center">
              <RiUserReceived2Fill className="mr-2" />
              Se obtiene el 1% por cada referido indirecto de quinta generación.
            </li>
            <li className="flex items-center">
              <RiUserSettingsFill className="mr-2" />
              Se obtiene el 1% por cada referido indirecto de sexta generación.
            </li>
            <li className="flex items-center">
              <RiUserSharedFill className="mr-2" />
              Se obtiene el 1% por cada referido indirecto de séptima generación.
            </li>
          </ul>
        </div>
      </div>

      <div className="w-[100%] flex flex-wrap justify-center gap-4">
        {temp.map((card) => {
          return <PricingCard key={card.id} planType={card} />;
        })}
      </div>

      <div
        className="w-[100%] py-6 flex flex-wrap justify-center gap-5"
        style={{ maxHeight: "calc(100vh - 70px)" }}
      >
        {planesAux.map((card) => {
          return <PricingCard key={card.id} planType={card} />;
        })}
      </div>
    </div>
  );
};

export default SuscripcionPage;
