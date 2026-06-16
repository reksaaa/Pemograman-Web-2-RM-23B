"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/users/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch user details");
      }
      return res.json();
    },
    enabled: !!id,
  });

  // Prefill states when query data is loaded
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setUsername(user.username || "");
      setPassword(user.password_hash || "");
    }
  }, [user]);

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await fetch(`http://localhost:3001/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedData.name,
          email: updatedData.email,
          username: updatedData.username,
          password_hash: updatedData.password,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to update user");
      }
      return res.text();
    },
    onSuccess: () => {
      // Refresh the query caches
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      alert("User updated successfully!");
      router.push("/users");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({ name, email, username, password });
  };

  if (isPending) {
    return (
      <div className="register-container">
        <div
          className="register-card"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 40px",
          }}
        >
          <div
            className="spinner"
            style={{
              width: "40px",
              height: "40px",
              borderWidth: "3px",
              marginBottom: "16px",
            }}
          ></div>
          <p className="card-subtitle">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="register-container">
        <div
          className="register-card"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 40px",
            borderColor: "var(--error)",
          }}
        >
          <div style={{ color: "var(--error)", marginBottom: "16px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-alert-triangle"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h2
            className="card-title"
            style={{ fontSize: "1.5rem", marginBottom: "8px" }}
          >
            Error Loading User
          </h2>
          <p
            className="card-subtitle"
            style={{ color: "var(--error)", marginBottom: "24px" }}
          >
            {error.message}
          </p>
          <button className="back-btn" onClick={() => router.push("/users")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Users List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="card-header">
          <h1 className="card-title">Edit User</h1>
          <p className="card-subtitle">Modify the details of user #{id}</p>
        </div>

        <form className="form-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <div className="input-container">
              <input
                className="input-field"
                type="text"
                name="name"
                id="name"
                placeholder=" "
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="field-icon"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <label className="floating-label" htmlFor="name">
                Full Name
              </label>
            </div>
          </div>

          <div className="input-wrapper">
            <div className="input-container">
              <input
                className="input-field"
                type="email"
                name="email"
                id="email"
                placeholder=" "
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="field-icon"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <label className="floating-label" htmlFor="email">
                Email Address
              </label>
            </div>
          </div>

          <div className="input-wrapper">
            <div className="input-container">
              <input
                className="input-field"
                type="text"
                name="username"
                id="username"
                placeholder=" "
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="field-icon"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
              </svg>
              <label className="floating-label" htmlFor="username">
                Username
              </label>
            </div>
          </div>

          <div className="input-wrapper">
            <div className="input-container">
              <input
                className="input-field password-field"
                type="password"
                name="password"
                id="password"
                placeholder=" "
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="field-icon"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <label className="floating-label" htmlFor="password">
                Password Hash
              </label>
            </div>
          </div>

          <button
            className="submit-btn"
            type="submit"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <>
                <span className="spinner"></span>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "24px",
          }}
        >
          <button
            className="back-btn"
            style={{ padding: "10px 16px" }}
            onClick={() => router.push("/users")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
