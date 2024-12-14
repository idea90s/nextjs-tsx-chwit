"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IoIosFolder } from "react-icons/io";

const menu = [
    {
      id: 0,
      name: "Chwit Info",
      url: "/",
    },
  {
    id: 1,
    name: "Event & HandleChange",
    url: "/event",
  },
  {
    id: 2,
    name: "Form JSON",
    url: "/form-json",
  },
  {
    id: 3,
    name: "FormData",
    url: "/form-data",
  },
];

export const Sidebar = () => {
  const r = useRouter();
  return (
    <ul className="space-y-2">
      {menu.map((i) => (
        <li key={i.id} className="cursor-pointer">
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
