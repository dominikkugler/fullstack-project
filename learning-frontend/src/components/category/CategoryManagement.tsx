import { useNavigate } from "react-router";
import UserService from "../service/UserService";
import CategoryService from "../service/CategoryService";
import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
};

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);

  // redirect to /home if user role is not ADMIN
  const isAdmin = UserService.isAdmin();

  const navigate = useNavigate();

 useEffect(() => {
  if (!isAdmin) {
    navigate("/home");
  }
}, [isAdmin, navigate]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        return;
      }
      const response = await CategoryService.getAllCategories(token);
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        return;
      }
      await CategoryService.deleteCategory(categoryId, token);
      setCategories(categories.filter(category => category.id !== categoryId));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }

  useEffect(() => { 
    fetchCategories();
  }, []);


  return (
  <div>
    <h1>Category Management</h1>
    <button className="btn btn-primary mb-3" onClick={() => navigate('/admin/category-management/create')}>
      Create New Category
    </button>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => navigate(`/admin/update-category/${category.id}`)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDeleteCategory(category.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}
