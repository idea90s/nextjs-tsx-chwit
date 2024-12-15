"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IoIosFolder } from "react-icons/io";

const menu = [
  {
    name: "Chwit Info",
    url: "/",
  },
  {
    name: "Event Handler",
    url: "/event",
  },
  {
    name: "Fetch Data",
    url: "/fetch-data",
  },
];

export const Sidebar = () => {
  const r = useRouter();
  return (
    <ul className="space-y-2">
      {menu.map((i, index) => (
        <li key={index} className="cursor-pointer">
          <button
            onClick={() => r.push(`${i.url}`)}
            className="flex items-center gap-2"
          >
            <IoIosFolder size={20} className="text-green-500" />
            {i.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
