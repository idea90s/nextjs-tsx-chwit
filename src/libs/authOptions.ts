import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log("Credentials received:::", credentials);

        try {
          const response = await axios.post(
            `http://localhost:8080/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Login response:", response.data);
          const user = await response.data.member;

          if (user) return user;
          return null;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(
              JSON.stringify(
                error.response?.data?.message ||
                  error.message ||
                  "An unknown error occurred"
              )
            );
          }
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, profile, user, trigger, session }) {
      // console.log(profile);
      if (user) {
        token = { ...user };
      }

      if (trigger === "update" && session?.user) {
        return { ...token, ...session.user };
      }

      // if (account?.provider === "google" && profile?.email) {
      //   const response = await axios.post(
      //     `${process.env.NEXT_PUBLIC_API_URL}/auth/check-google`,
      //     {
      //       email: profile.email,
      //       first_name: profile.name?.split(" ")[0],
      //       last_name: profile.name?.split(" ")[1],
      //     }
      //   );

      //   if (response.data.token) {
      //     const decodedToken = jwt.verify(
      //       response.data.token,
      //       process.env.NEXTAUTH_SECRET!
      //     ) as User;

      //     return { ...decodedToken, ...token }; // สร้าง session สำหรับผู้ใช้ที่มีอยู่
      //   }
      // }

      // console.log("Token:", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: token,
        };
      }
      return session;
    },
  },
};
