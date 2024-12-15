// hooks/useMembers.ts
import { useState, useEffect } from "react";
import axios from "axios";

interface Member {
  id: number;
  name: string;
  age: number;
  gender: string;
  avatar: string;
  detail: string;
  accept: boolean;
}

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/member");
        setMembers(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              error.message ||
              "An unknown error occurred"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // delete
  const deleteMember = async (id: number) => {
    try {
      await fetch("/api/member", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: 1 }),
      });
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id)
      );
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return { members, loading, error };
}
