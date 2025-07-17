import axios from "axios";

class UserService {
    static BASE_URL = "http://localhost:8080";

    // Login and Registration methods

    static async login(email: string, password: string) {
        try {
            const response  = await axios.post(`${this.BASE_URL}/auth/login`, {email, password})
            return response.data;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    static async register(userData: any, token: string) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/register`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    }

    // User management methods

    static getAllUsers(token: string) {
        try {
            return axios.get(`${this.BASE_URL}/admin/get-all-users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Failed to fetch users:", error);
            throw error;
        }
    }

    static getUserById(userId: string, token: string) {
        try {
            return axios.get(`${this.BASE_URL}/all/get-users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Failed to fetch user:", error);
            throw error;
        }
    }

    static getUserProfile(token: string) {
        try {
            return axios.get(`${this.BASE_URL}/all/get-profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            throw error;
        }
    }

    static updateUser(userId: string, userData: any, token: string) {
        try {
            return axios.put(`${this.BASE_URL}/all/update-user/${userId}`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Failed to update user:", error);
            throw error;
        }
    }

    static deleteUser(userId: string, token: string) {
        try {
            return axios.put(`${this.BASE_URL}/admin/delete-user/${userId}`,
            {}, // pusty obiekt jako body !!! 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        } catch (error) {
            console.error("Failed to delete user:", error);
            throw error;
        }
    }

    // Authentication methods

    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
    }

    static isAuthenticated() {
        const token = localStorage.getItem("token");
        return !!token;
    }

    static getRole() {
        return localStorage.getItem("role");
    }

    static isAdmin() {
        const role = this.getRole();
        return role === "ADMIN";
    }

    // replace with isTutor and isStudent
    static isTutor() {
        const role = this.getRole();
        return role === "TUTOR";
    }

    static isStudent() {
        const role = this.getRole();
        return role === "STUDENT";
    }

}

export default UserService;