import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { DepartmentInterface, TicketInterface } from '../../../interfaces';

const CreateTicket: React.FC = () => {
    const { userInfo } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [id_department, setIdDepartment] = useState<number | undefined>(userInfo.id_department);
    const [departments, setDepartments] = useState<DepartmentInterface[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/departments`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
                setDepartments(response.data);
            } catch (error) {
                console.error('Failed to fetch departments:', error);
            }
        };

        getDepartments();
    }, [userInfo.token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/tickets`, {
                title,
                description,
                id_department,
                observacoes,
                id_state: "PENDENTE",
                created_by: userInfo.id,
                updated_by: userInfo.id,

            } as TicketInterface, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            alert('Ticket created successfully!');
            setTitle('');
            setDescription('');
            setObservacoes('');
            setIdDepartment(userInfo.id_department);
        } catch (error) {
            console.error('Failed to create ticket:', error);
            alert('Failed to create ticket.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
            <h2 className="mb-6 text-2xl font-bold">Criar Ticket</h2>
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm p-6 bg-white rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 mt-1 border rounded focus:border-blue-600"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full p-2 mt-1 border rounded focus:border-blue-600"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">Observações:</label>
                    <textarea
                        id="description"
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        className="w-full p-2 mt-1 border rounded focus:border-blue-600"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="department" className="block text-gray-700">Department:</label>
                    <select
                        id="department"
                        value={id_department ?? ''}
                        onChange={(e) => setIdDepartment(Number(e.target.value))}
                        required
                        disabled={userInfo.admin ? false : true}
                        className="w-full p-2 mt-1 border rounded focus:border-blue-600"
                    >
                        <option value="" disabled>Select a department</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" disabled={loading} className="flex items-center justify-center h-12 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                    {loading ? 'Criando...' : 'Criar Ticket'}
                </button>
            </form>
        </div>
    );
};

export default CreateTicket;