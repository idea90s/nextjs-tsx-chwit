"use server";

import dbPool from "@/db/connection";
import { type NextRequest } from 'next/server'

export async function GET() {
  try {
    const [rows] = await dbPool.query("SELECT * FROM member");
    return new Response(JSON.stringify(rows), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(`Database error :: ${error}`, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // distructuring body
    const { name, age, gender, avatar, detail, accept } = body;

    const [rows] = await dbPool.query(
      "INSERT INTO `member`(`name`, `age`, `gender`, `avatar`, `detail`, `accept`) VALUES (?)",
      [[name, age, gender, avatar, detail, accept]]
    );

    console.log(rows);

    return new Response(JSON.stringify(rows), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(`Database error :: ${error}`, { status: 500 });
  }
}

// delete member from id
export async function DELETE(req: NextRequest) {
  try {
    // const body = await req.json();
    // const { id } = body;

    const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')


    const [rows] = await dbPool.query("DELETE FROM member WHERE id = ?", [id]);
    return new Response(JSON.stringify(rows), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(`Database error :: ${error}`, { status: 500 });
  }
}
