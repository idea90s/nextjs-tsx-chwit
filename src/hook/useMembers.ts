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

  return { members, loading, error };
}