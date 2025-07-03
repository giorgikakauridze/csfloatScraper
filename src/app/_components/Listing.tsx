"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SuccessIcon } from "./sucess-icon";

const Listing = ({ item }: { item: any }) => {
  const [clicked, setClicked] = React.useState(false);
  return (
    <Link
      href={item.profileUrl.split("inventory")[0]}
      target="_blank"
      onClick={() => setClicked(true)}
      className={`rounded-xl ${item.online ? "bg-blue-600" : ""} ${
        clicked && "opacity-50"
      }  items-center flex p-4 justify-between shadow-md bg-white/20 dark:bg-black/20 backdrop-blur-xs`}
    >
      <div className="w-[15svh] min-w-[15svh] max-w-[15svh]">
        {item.itemImage && (
          <img src={item.itemImage} alt="avatar" width={80} height={80} />
        )}
      </div>
      <h2
        className={`flex gap-2 w-[45svh] min-w-[45svh] max-w-[45svh] text-lg font-semibold ${
          item.name.includes("★") && !clicked
            ? "text-[#b253f5]"
            : !clicked
            ? "text-white"
            : "text-[#d4cece77]"
        }`}
      >
        {item.name}
        <span
          className={`text-xl   ${
            item.name.includes("★") && !clicked
              ? "text-[#b253f5]"
              : !clicked
              ? "text-white"
              : "text-[#d4cece77]"
          }`}
        >
          {item.floatLabel}
        </span>
      </h2>

      <div className="flex gap-3 items-center w-[15svh] min-w-[15svh] max-w-[15svh]">
        <span className="text-gray-400">
          {item.float.split(" ")[0].slice(0, 7)}
        </span>
      </div>
      <div className="w-[15svh] min-w-[15svh] max-w-[15svh]">
        <span className="text-gray-400 ">
          {item.historyCount > 0 ? item.historyCount : <SuccessIcon />}
        </span>
      </div>
      <div className="w-[15svh] min-w-[15svh] max-w-[15svh]">
        <img
          src={
            item.avatarUrl ||
            "https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg"
          }
          alt="avatar"
          className={`${
            item.online ? "border-4 border-[rgb(85,136,184)]" : " "
          } rounded-md`}
          width={60}
          height={60}
        />
      </div>
    </Link>
  );
};

export default Listing;
