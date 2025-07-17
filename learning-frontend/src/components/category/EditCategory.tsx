import React, { useEffect, useState } from 'react';
import CategoryService from '../service/CategoryService';
import UserService from '../service/UserService';
import { useParams, useNavigate } from 'react-router-dom';

type Category = { id: string; name: string };

export default function EditCategory() {
  const [category, setCategory] = useState<Category>({ id: '', name: '' });
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!UserService.isAdmin()) {
      navigate('/home');
      return;
    }
    if (categoryId) {
      const token = localStorage.getItem('token');
      if (!token) return console.error('No token found');
      CategoryService.getCategoryById(categoryId, token)
        .then(response => setCategory(response))
        .catch(() => alert('Failed to fetch category data'));
    }
  }, [categoryId, navigate]);

  const handleSave = () => {
    const token = localStorage.getItem('token');
    if (!token) return console.error('No token found');
    CategoryService.updateCategory(categoryId!, category, token)
      .then(() => {
        alert('Category updated successfully');
        navigate('/admin/category-management');
      })
      .catch(() => alert('Failed to update category'));
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h1 className="mb-4">Edit Category</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">Category ID</label>
          <input
            type="text"
            className="form-control"
            id="categoryId"
            value={category.id}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={category.name}
            onChange={e => setCategory({ ...category, name: e.target.value })}
            placeholder="Enter category name"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/admin/category-management')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
