"use client";

import React, { useState } from "react";
import { useMembers } from "@/hook/useMembers";

export default function FetchData() {
  // use hook members
  const { members, loading, error } = useMembers();

  
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="text-white">
      <section className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-green-500">Fetch Data</h1>
        {loading && <p>Loading data...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && members.length > 0 && (
          <ul>
            {members.map((member) => (
              <li key={member.id} className="mb-2 border-b border-gray-600 pb-2">
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Age:</strong> {member.age}</p>

                <button
                  onClick={() => toggleExpand(member.id)}
                  className="text-blue-400 hover:underline"
                >
                  {expanded[member.id] ? "Hide Details" : "Show Details"}
                </button>

                {expanded[member.id] && (
                  <div className="mt-2">
                    <p><strong>Gender:</strong> {member.gender}</p>
                    <p><strong>Avatar:</strong> {member.avatar}</p>
                    <p><strong>Detail:</strong> {member.detail}</p>
                    <p><strong>Accept:</strong> {member.accept ? "Yes" : "No"}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && members.length === 0 && (
          <p>No members found.</p>
        )}
      </section>
    </div>
  );
}