import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // TUTOR or STUDENT
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      await UserService.register(formData, token || "");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
      });

      alert("Registration successful! You can now log in.");
      navigate("/auth/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please check your data and try again.");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="container mt-5 px-4" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Create Your Account</h2>
      <p className="text-center text-muted mb-4">
        Fill in the details below to register.
      </p>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="regName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="regName"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter your full name"
            autoComplete="name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="regEmail" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="regEmail"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="regPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="regPassword"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="Create a strong password"
            autoComplete="new-password"
          />
          <div className="form-text">
            Use at least 8 characters with a mix of letters and numbers.
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="regRole" className="form-label">
            Role
          </label>
          <select
            id="regRole"
            className="form-select"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select your role</option>
            <option value="TUTOR">Tutor</option>
            <option value="STUDENT">Student</option>
          </select>
          <div className="form-text">
            Tutors can create and manage lesson offerings. Students can book
            sessions.
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
}
