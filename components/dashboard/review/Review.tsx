import React from "react";
import Image from "next/image";
import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from "react-icons/io";

import { SlLike } from "react-icons/sl";
import { TbFlag3 } from "react-icons/tb";
import { RiReplyLine } from "react-icons/ri";

const Review = () => {
  return (
    <div className=" flex flex-row gap-3 w-full justify-center p-6">
      <div className=" hidden md:flex">
        <Image
          src={"/images/logo.png"}
          alt={"foto de perfil"}
          width={150}
          height={150}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div className="flex  gap-1">
            <span className="text-c2 font-semibold" >Zubayer Al Hasan</span>
            <span className="text-semibold text-zinc-400">17 Aug, 23</span>
          </div>
          <div className=" flex  gap-1">
            <span className=" hidden md:flex  text-zinc-400">(3.5 Rating)</span>
            <div className="flex flex-row  items-center gap-0.5">
              <IoIosStar className="text-amber-400"/> 
              <IoIosStar className="text-amber-400"/>
              <IoIosStar className="text-amber-400"/>
              <IoIosStarHalf className="text-amber-400"/>
              <IoIosStarOutline className="text-amber-400"/>
            </div>
          </div>
        </div>

        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur. Pellentesque sed nulla
            facili diam posuere aliquam suscipit quam.
          </p>
        </div>

        <div className="flex flex-row gap-10 w-full">
          <button className="flex flex-row gap-1 items-center text-blue-500"><SlLike size={15} />Útil</button>
          <button className="flex flex-row gap-1 items-center text-rose-500"><TbFlag3 />Flag</button>
          <button className="flex flex-row gap-1 items-center text-gray-400"><RiReplyLine />Responder</button>
        </div>
      </div>
    </div>
  );
};

export default Review;


