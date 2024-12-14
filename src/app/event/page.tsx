"use client";

import React, { useState } from "react";

export default function Event() {
  // form
  const [form, setForm] = useState({
    full_name: "",
    age: 0,
    email: "",
    accept: false,
    captcha: "",
  });

  //   handle Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type, files } = e.target;

    if (type === "number" && name === "age") {
      // กรองตัวเลขที่เกิน 3 หลัก
      if (!/^\d{1,3}$/.test(value)) return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="">
      {/* Detail Section */}
      <section className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-green-500">Event Detail</h1>
        <p className="text-white">
          This section provides details about the event. You can add more
          information here as needed.
        </p>
      </section>

      {/* form */}
      <form className="space-y-3">
        {/* input text */}
        <div className="flex flex-col">
          <label htmlFor="full_name">
            full_name{" "}
            <span className="text-green-300">
              {JSON.stringify(form.full_name, null, 2)}
            </span>
          </label>
          <input
            type="text"
            name="full_name"
            id="full_name"
            onChange={handleChange}
            value={form.full_name}
            className="text-black px-2 py-1 rounded bg-green-200"
          />
        </div>

        {/* input number */}
        <div className="flex flex-col">
          <label htmlFor="age">
            age{" "}
            <span className="text-green-300">
              {JSON.stringify(form.age, null, 2)}
            </span>
          </label>
          <input
            type="number"
            name="age"
            id="age"
            onChange={handleChange}
            value={form.age}
            className="text-black px-2 py-1 rounded bg-green-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </form>
    </div>
  );
}
