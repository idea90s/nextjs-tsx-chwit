"use client";

import Image from "next/image";
import React, { useState } from "react";

// กำหนดโครงสร้างข้อมูลของฟอร์มที่เราจะใช้ (FormState)
type FormState = {
  full_name: string; // ชื่อเต็มของผู้ใช้งาน
  type: string; // ประเภทของกิจกรรม (เช่น online/offline)
  age: number; // อายุ (ตัวเลข)
  gender: "" | "male" | "female"; // เพศของผู้ใช้งาน
  avatar: File | null; // ไฟล์รูปภาพสำหรับ avatar
  detail: string; // รายละเอียดเพิ่มเติม
  accept: boolean; // การยอมรับข้อกำหนด (true/false)
  captcha: string; // ค่าของ captcha (ยังไม่ใช้งาน)
};

// กำหนดสถานะเริ่มต้นของฟอร์ม (initialState)
const initialState: FormState = {
  full_name: "",
  type: "",
  age: 0,
  gender: "",
  avatar: null,
  detail: "",
  accept: false,
  captcha: "",
};

export default function Event() {
  // ใช้ useState สำหรับจัดการข้อมูลฟอร์ม
  const [form, setForm] = useState(initialState); // form เก็บข้อมูลที่ผู้ใช้กรอก
  const [error, setError] = useState<string | null>(null); // เก็บข้อความ error ถ้ามีปัญหา

  // ฟังก์ชัน handleChange ใช้สำหรับจัดการการเปลี่ยนแปลงของ input ต่างๆ
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    // ใช้ setForm เพื่ออัปเดตค่าของฟอร์มในแบบ dynamic object
    setForm((prev) => ({
      ...prev,
      // ใช้การตรวจสอบประเภทของ input
      [name]:
        type === "checkbox"
          ? checked // ถ้าเป็น checkbox ใช้ checked แทน value
          : type === "file"
          ? files?.[0] || null // ถ้าเป็น file ใช้ไฟล์แรก หรือ null ถ้าไม่มี
          : name === "age"
          ? Math.min(100, Number(value)) // ถ้าเป็น age จำกัดค่าสูงสุดที่ 100
          : value, // ใช้ value ตรงๆ สำหรับ input อื่นๆ
    }));
  };

  // ฟังก์ชัน handleSubmit ใช้สำหรับจัดการเมื่อผู้ใช้กดปุ่ม Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ป้องกันไม่ให้หน้าเว็บ reload

    const formData = new FormData(); // สร้าง FormData เพื่อจัดการข้อมูลสำหรับส่งไป API

    // แปลงข้อมูลใน form เป็น key-value ของ FormData
    Object.entries(form).forEach(([key, value]) => {
      if (value instanceof File) {
        // ถ้าค่าเป็นไฟล์ ให้เพิ่มไฟล์ลงใน FormData
        formData.append(key, value, value.name || "uploaded_file");
      } else if (value !== null && value !== undefined) {
        // ถ้าเป็นค่าปกติ (string, number, boolean) แปลงเป็น string แล้วเพิ่มลงไป
        formData.append(key, String(value));
      }
    });

    try {
      // ส่งข้อมูล formData ไปยัง API ด้วย fetch
      const response = await fetch("/api/test", {
        method: "POST", // ใช้ POST method
        body: formData, // ใส่ formData ใน body
      });

      // ตรวจสอบว่าการตอบกลับสำเร็จหรือไม่
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // แปลง response เป็น JSON
      console.log("Submitted successfully:", data);

      // อัปเดต error เพื่อแสดงข้อความตอบกลับ
      setError(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error submitting form:", error);
      // แสดงข้อความ error ถ้ามีปัญหา
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="">
      {/* ส่วนแสดงรายละเอียดกิจกรรม */}
      <section className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-green-500">
          Event Handler
        </h1>
        <p className="text-white">****</p>
      </section>

      {/* ฟอร์ม */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Full Name */}
        <div className="flex flex-col">
          <label htmlFor="full_name">
            Full Name{" "}
            <span className="text-green-300">
              {JSON.stringify(form.full_name, null, 2)}
            </span>
          </label>
          <input
            type="text"
            name="full_name"
            id="full_name"
            onChange={handleChange} // เรียก handleChange เมื่อเปลี่ยนค่า
            value={form.full_name}
            className="text-black px-2 py-1 rounded bg-green-200"
          />
        </div>

        {/* Type (Dropdown) */}
        <div className="flex flex-col">
          <label htmlFor="type">
            Type{" "}
            <span className="text-green-300">
              {JSON.stringify(form.type, null, 2)}
            </span>
          </label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            value={form.type}
            className="text-black px-2 py-1 rounded bg-green-200"
          >
            <option value="">-- select type --</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* Age */}
        <div className="flex flex-col">
          <label htmlFor="age">
            Age{" "}
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
            className="text-black px-2 py-1 rounded bg-green-200"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label>
            Gender{" "}
            <span className="text-green-300">
              {JSON.stringify(form.gender, null, 2)}
            </span>
          </label>
          <div className="flex gap-2">
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleChange}
              checked={form.gender === "male"}
              className="text-black"
            />
            <label>Male</label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
              checked={form.gender === "female"}
              className="text-black"
            />
            <label>Female</label>
          </div>
        </div>

        {/* Avatar */}
        <div className="flex flex-col">
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={handleChange}
            className="text-black px-2 py-1 rounded bg-green-200"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="detail">
            Description{" "}
            <span className="text-green-300">
              {JSON.stringify(form.detail, null, 2)}
            </span>
          </label>
          <textarea
            name="detail"
            id="detail"
            onChange={handleChange}
            value={form.detail}
            className="text-black px-2 py-1 rounded bg-green-200"
          />
        </div>

        {/* Accept */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="accept"
            id="accept"
            onChange={handleChange}
            checked={form.accept}
            className="text-black"
          />
          <label htmlFor="accept">
            Accept Terms{" "}
            <span className="text-green-300">
              {JSON.stringify(form.accept, null, 2)}
            </span>
          </label>
        </div>

        <button className="bg-green-500 px-4 py-2 w-full text-black">
          Submit
        </button>
      </form>

      {/* แสดงข้อความ Error ถ้ามี */}
      <pre>{error}</pre>

      {/* แสดงรูป Avatar Preview */}
      {form.avatar && (
        <div className="mt-4 flex justify-center">
          <Image
            src={URL.createObjectURL(form.avatar)} // สร้าง URL สำหรับแสดงรูปที่อัปโหลด
            alt="avatar"
            width={400}
            height={400}
          />
        </div>
      )}
    </div>
  );
}
