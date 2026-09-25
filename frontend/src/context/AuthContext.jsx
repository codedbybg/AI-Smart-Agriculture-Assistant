import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // =================================
    // GET CURRENTLY LOGGED-IN USER
    // =================================

    const getCurrentUser = async () => {
        try {
            const storedToken = localStorage.getItem("token");

            if (!storedToken) {
                setUser(null);
                setLoading(false);
                return;
            }

            const response = await api.get("/auth/me");

            setUser(response.data.user);
        } catch (error) {
            console.error(
                "Failed to get current user:",
                error.response?.data?.message ||
                    error.message
            );

            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // =================================
    // CHECK LOGIN WHEN APP STARTS
    // =================================

    useEffect(() => {
        getCurrentUser();
    }, []);

    // =================================
    // REGISTER
    // =================================

    const register = async (
        name,
        email,
        password
    ) => {
        const response = await api.post(
            "/auth/register",
            {
                name,
                email,
                password,
            }
        );

        const { token, user } = response.data;

        localStorage.setItem("token", token);

        setUser(user);

        return response.data;
    };

    // =================================
    // LOGIN
    // =================================

    const login = async (
        email,
        password
    ) => {
        const response = await api.post(
            "/auth/login",
            {
                email,
                password,
            }
        );

        const { token, user } = response.data;

        localStorage.setItem("token", token);

        setUser(user);

        return response.data;
    };

    // =================================
    // LOGOUT
    // =================================

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// =================================
// CUSTOM HOOK
// =================================

export const useAuth = () => {
    return useContext(AuthContext);
};