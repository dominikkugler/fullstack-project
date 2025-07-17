import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../service/UserService';
import categoryService from '../service/CategoryService';

export default function CreateCategory() {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const categoryName = formData.get('categoryName') as string;
        // the name is passed like this: {"name":"Test3"} so we need to convert it to the expected format
        if (!categoryName) {
            alert('Category name is required');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        categoryService.createCategory(categoryName, token)
            .then(() => {
                alert('Category created successfully');
                navigate('/admin/category-management');
            })
            .catch(() => alert('Failed to create category'));
    };

    useEffect(() => {
        if (!userService.isAdmin()) {
            navigate('/home');
        }
    }, [navigate]);

    return (
        <div>
            <h1>Create Category</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">Category Name</label>
                    <input type="text" className="form-control" id="categoryName"  name="categoryName" placeholder="Enter category name" />
                </div>
                <button type="submit" className="btn btn-primary">Create Category</button>
            </form>
        </div>
    )
}
