import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * ข้อมูลเพิ่มเติมใน User Object
   */
  interface User extends DefaultUser {
    member_id: string; // รหัสสมาชิก
    member_code: string;
    email: string;
  }

  /**
   * เพิ่มข้อมูลใน JWT
   */
  interface Session {
    user: {
      member_id: string; // รหัสสมาชิก
      member_code: string;
      email: string;
    } & DefaultSession["user"];
  }

  /**
   * เพิ่มข้อมูลใน JWT Token
   */
  interface JWT {
    member_id: string; // รหัสสมาชิก
    member_code: string;
    email: string;
  }
}
