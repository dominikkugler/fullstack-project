import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { useNavigate, Link } from 'react-router-dom';

type ProfileInfo = {
  name: string;
  email: string;
  role: string;
  userId: string;
};

export default function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const response = await UserService.getUserProfile(token);
      const user = response.data.myUsers;
      setProfileInfo({
        name: user.name,
        email: user.email,
        role: user.role,
        userId: user.id,
      });
    } catch (error) {
      console.error('Error fetching profile information:', error);
    }
  };

  if (!profileInfo) {
    return <div className="container mt-5 text-center">Loading profile...</div>;
  }

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow-sm" style={{ maxWidth: '540px', width: '100%' }}>
        <div className="row g-0">
          <div className="col-md-4 p-3 text-center">
            {/* Replace with user's actual avatar if available */}
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profileInfo.name)}&background=0D8ABC&color=fff&size=128`}
              className="rounded-circle img-thumbnail"
              alt="Profile"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between align-items-center">
                {profileInfo.name}
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => navigate(`/update-user/${profileInfo.userId}`)}
                >
                  Edit
                </button>
              </h5>
              <p className="card-text">
                <strong>Email:</strong> {profileInfo.email}
              </p>
              <p className="card-text">
                <strong>Role:</strong> {profileInfo.role}
              </p>

              {profileInfo.role === 'ADMIN' && (
                <p className="card-text">
                  <Link to="/admin/user-management" className="btn btn-sm btn-primary">
                    User Management
                  </Link>
                </p>
              )}

              {profileInfo.role === 'ADMIN' && (
                <p className="card-text">
                  <Link to="/admin/category-management" className="btn btn-sm btn-secondary">
                    Category Management
                  </Link>
                </p>
              )}

              <div className="border-top pt-3 mt-3 text-center">
                <Link to={`/update-user/${profileInfo.userId}`} className="btn btn-link">
                  Update Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
