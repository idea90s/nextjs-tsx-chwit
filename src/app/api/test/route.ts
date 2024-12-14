// end point post
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const contentType = req.headers.get("content-type") || "";

  // ตรวจสอบว่า request ส่งมาในรูปแบบ multipart/form-data หรือไม่
  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData(); // ใช้ API formData ใน Edge Runtime
    const formEntries = Object.fromEntries(formData.entries()); // แปลง FormData เป็น Object

    // console.log("FormData Entries:", formEntries);

    // กรณีมีไฟล์ใน FormData
    if (formData.get("avatar") instanceof File) {
      const file = formData.get("avatar") as File;
      console.log("Uploaded File Name:", file.name);
      console.log("Uploaded File Size:", file.size);
      console.log("Uploaded File Type:", file.type);
    }

    return new Response(JSON.stringify(formEntries), { status: 200 });
  } else {
    return new Response("Invalid Content-Type", { status: 400 });
  }
};

// end point get
export const GET = async () => {
  return new Response("Hello World", { status: 200 });
};