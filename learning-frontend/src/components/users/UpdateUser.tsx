import UserService from "../service/UserService";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUser() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isIdsMatch, setIsIdsMatch] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: ""
  });

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await UserService.getUserProfile(token);
        const currentUser = response.data.myUsers;
        setIsAdmin(currentUser.role === "ADMIN");
        setIsIdsMatch(String(currentUser.id) === userId);
      } catch (error) {
        console.error("Error checking permissions:", error);
      } finally {
        setLoading(false);
      }
    };
    checkPermissions();
  }, [userId]);

  useEffect(() => {
    if (!loading && !isAdmin && !isIdsMatch) {
      navigate("/profile");
    }
  }, [loading, isAdmin, isIdsMatch, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const res = await UserService.getUserById(userId || "", token);
        const user = res.data.myUsers;
        setUserData({ name: user.name, email: user.email, role: user.role });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [isIdsMatch, userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token") || "";
      await UserService.updateUser(userId || "", userData, token);
      alert("User updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) {
    return <div className="container mt-5 text-center">Checking permissions...</div>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Update User</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="updName" className="form-label">Name</label>
          <input
            type="text"
            id="updName"
            className="form-control"
            name="name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="updEmail" className="form-label">Email</label>
          <input
            type="email"
            id="updEmail"
            className="form-control"
            name="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="updRole" className="form-label">Role</label>
          {!isAdmin ? (
            <select
              id="updRole"
              className="form-select"
              name="role"
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e.target.value })}
              required
            >
              <option value="">Select Role</option>
              <option value="TUTOR">Tutor</option>
              <option value="STUDENT">Student</option>
            </select>
          ) : (
            <input
              type="text"
              id="updRole"
              className="form-control"
              name="role"
              value={userData.role}
              readOnly
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update
        </button>
      </form>
    </div>
  );
}
