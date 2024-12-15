import axios from 'axios';
import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    userInfo: UserProviderInfo;
    login: (userInfo: UserProviderInfo) => void;
    logout: () => void;
    loading: boolean
}

interface UserProviderInfo {
    name: string;
    email: string;
    token: string;
    id: number;
    admin?: boolean;
    id_department?: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState<UserProviderInfo>({ email: '', name: "", token: '', id: 0, id_department: 0 });
    const [loading, setLoading] = useState(true)
    console.log("auth provider initialized")

    const login = (userInfo: UserProviderInfo) => {
        setIsAuthenticated(true);
        setUserInfo(userInfo)
        localStorage.setItem("token", userInfo.token)
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserInfo({ email: "", name: "", token: "", id: 0, id_department: 0 });
        setLoading(false)
        localStorage.clear();
    };

    useEffect(() => {
        async function checkToken() {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/validate`, { headers: { Authorization: `Bearer ${token}` } })
                    .then(response => {
                        const userInfo = {
                            name: response.data.name,
                            email: response.data.email,
                            token: token,
                            id: response.data.id,
                            id_department: response.data.id_department,
                        };
                        setIsAuthenticated(true);
                        setUserInfo(userInfo);
                        setLoading(false)
                    })
                    .catch(() => {
                        localStorage.removeItem('token');
                        logout();
                    });
            }
            else {
                logout();
            }
        }
        checkToken()
    }, [])


    return (
        <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export { AuthProvider, AuthContext, useAuth };