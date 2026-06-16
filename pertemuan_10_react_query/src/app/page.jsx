"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const postUsers = useMutation({
    mutationFn: ({ name, email, username, password }) => {
      return fetch("http://localhost:3001/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          username,
          password_hash: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      alert("User registered successfully");
      router.push("/users");
    },
  });

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="card-header">
          <h1 className="card-title">Create Account</h1>
          <p className="card-subtitle">
            Sign up to get started with React Query
          </p>
        </div>

        <form
          className="form-form"
          onSubmit={(e) => {
            e.preventDefault();
            postUsers.mutate({ name, email, username, password });
          }}
        >
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
                Password
              </label>
            </div>
          </div>

          <button
            className="submit-btn"
            type="submit"
            disabled={postUsers.isPending}
          >
            {postUsers.isPending ? (
              <>
                <span className="spinner"></span>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="dev-helper-text">
          Already registered?{" "}
          <a
            href="/users"
            style={{
              color: "var(--primary)",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            View Users List &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
