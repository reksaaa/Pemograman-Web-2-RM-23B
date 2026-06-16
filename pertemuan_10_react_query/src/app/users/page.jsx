"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const router = useRouter();

  const { data, isPending, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/users");
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      return res.json();
    },
  });

  if (isPending) {
    return (
      <div className="users-container">
        <div
          className="users-card"
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
          <p className="card-subtitle">Loading users list...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-container">
        <div
          className="users-card"
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
            Failed to load users
          </h2>
          <p
            className="card-subtitle"
            style={{ color: "var(--error)", marginBottom: "24px" }}
          >
            {error.message}
          </p>
          <button className="back-btn" onClick={() => router.push("/")}>
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
            Back to Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <div className="users-card">
        <div className="card-header">
          <h1 className="card-title">Registered Users</h1>
          <p className="card-subtitle">
            List of users currently registered in the database
          </p>
        </div>

        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((user) => (
                  <tr key={user.id || user.username}>
                    <td>
                      <div className="user-name-cell">
                        <span className="user-avatar">
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </span>
                        {user.name}
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className="username-badge">@{user.username}</span>
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => router.push(`/users/${user.id}`)}
                      >
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
                          className="lucide lucide-edit"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "center",
                      padding: "32px",
                      color: "var(--text-muted)",
                    }}
                  >
                    No users found in the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="card-footer">
          <button className="back-btn" onClick={() => router.push("/")}>
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
            Back to Register
          </button>
        </div>
      </div>
    </div>
  );
}
