import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import ProfilePage from './components/users/ProfilePage';
import Home from './Home';
import UpdateUser from './components/users/UpdateUser';
import UsersManagement from './components/users/UsersManagement';
import CategoryManagement from './components/category/CategoryManagement';
import EditCategory from './components/category/EditCategory';
import CreateCategory from './components/category/CreateCategory';

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <div className="d-flex flex-column min-vh-100">
        <main className="d-flex flex-grow-1 align-items-center justify-content-center">
          <div
            className="d-flex flex-column align-items-center justify-content-center w-100"
            style={{ maxWidth: '100%', marginBottom: '300px'}}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegistrationPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin/user-management" element={<UsersManagement />} />
              <Route path="/update-user/:userId" element={<UpdateUser />} />
              <Route path="/admin/category-management" element={<CategoryManagement />} />
              <Route path="/admin/update-category/:categoryId" element={<EditCategory />} />
              <Route path="/admin/category-management/create" element={<CreateCategory />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
