
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';


export interface UserPayload {
    name: string,
    email: string,
    password: string,
    id_department: number | string
}


const Profile: React.FC = () => {
    const { userInfo, login } = useAuth();
    const [name, setName] = useState(userInfo.name);
    const [password, setPassword] = useState('');
    const [id_department, setIdDepartment] = useState(userInfo.id_department);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/${userInfo.id}`, {
                name,
                password,
                id_department
            }, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            const updatedUserInfo = {
                ...userInfo,
                name: response.data.name,
                id_department: response.data.id_department
            };
            login(updatedUserInfo);
            alert('Profile updated successfully!');
        } catch (error) {
            alert('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };
    async function getDepartments() {
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/departments`)
            .then((res) => {
                setDepartments(res.data)
                console.log(res)
            })
            .catch((err) => alert(err.response.data))
    }
    useEffect(() => {
        getDepartments()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h2 className="mb-6 text-2xl font-bold">Perfil</h2>
            <form onSubmit={handleUpdateProfile} className="flex flex-col w-full max-w-sm p-6 bg-white rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 mt-1 border rounded focus:border-blue-600"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 mt-1 border rounded focus:border-blue-600"
                    />
                    <div className="mb-4">
                        <label htmlFor="sector" className="block text-gray-700">Sector:</label>
                        <select
                            id="sector"
                            value={id_department}
                            onChange={(e) => setIdDepartment(+e.target.value)}
                            required
                            className="w-full p-2 mt-1 border rounded focus:border-blue-600"
                        >
                            {departments.map((department: { id: number, title: string }) => (
                                <option key={department.id} value={department.id}>
                                    {department.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="flex items-center justify-center h-12 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    {loading ? 'Updating...' : 'Atualizar Perfil'}
                </button>
            </form>
        </div>
    );
};
export default Profile;