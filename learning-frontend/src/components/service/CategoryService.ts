import axios from 'axios';

class CategoryService {
    static BASE_URL = 'http://localhost:8080/categories';

    // Fetch all categories
    static async getAllCategories(token: string) {
        try {
            const response = await axios.get(`${this.BASE_URL}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            throw error;
        }
    }

    // Fetch category by ID
    static async getCategoryById(categoryId: string, token: string) {
        try {
            const response = await axios.get(`${this.BASE_URL}/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Failed to fetch category:", error);
            throw error;
        }
    }

    // Create a new category
    static async createCategory(name: string, token: string) {
        try {
            const response = await axios.post(`${this.BASE_URL}`, name, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'text/plain', // just sending the name as text, not an object
                },
                transformRequest: [(data) => data] // disable serialization
            });
            return response.data;
        } catch (error) {   
            console.error("Failed to create category:", error);
            throw error;
        }
    }

    // Update an existing category
    static async updateCategory(categoryId: string, categoryData: any, token: string) {
        try {
            const response = await axios.put(`${this.BASE_URL}/${categoryId}`, categoryData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Failed to update category:", error);
            throw error;
        }
    }

    // Delete a category
    static async deleteCategory(categoryId: string, token: string) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Failed to delete category:", error);
            throw error;
        }
    }

    
}

export default CategoryService;