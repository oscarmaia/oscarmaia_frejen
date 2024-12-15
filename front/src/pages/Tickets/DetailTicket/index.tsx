import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { DepartmentInterface, StateInterface, TicketInterface } from '../../../interfaces';


const DetailTicket: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { userInfo } = useAuth();
    const [ticket, setTicket] = useState<TicketInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [departments, setDepartments] = useState<DepartmentInterface[]>([]);
    const [states, setStates] = useState<StateInterface[]>([]);
    const navigate = useNavigate();
    useEffect(() => {

        const getStates = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/states`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
                setStates(response.data);
            } catch (error) {
                console.error('Failed to fetch departments:', error);
            }
        };


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

        const getTicketById = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/tickets/${id}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
                setTicket(response.data);
            } catch (error) {
                alert(error.response.data);
                console.error('Failed to fetch ticket:', error);
            } finally {
                setLoading(false);
            }
        };
        getTicketById();
    }, [id, userInfo.token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!ticket) {
        navigate("/ticekts");
    }
    else {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-full max-w-2xl p-6 bg-white rounded shadow-md">
                    <h2 className="mb-4 text-2xl font-bold">{ticket.title}</h2>
                    <p className="mb-2"><strong>Description:</strong> {ticket.description}</p>
                    <p className="mb-2"><strong>Department:</strong> {departments.find((dep) => dep.id == userInfo.id_department)?.title}</p>
                    <p className="mb-2"><strong>State:</strong> {ticket.id_state}</p>
                    <p className="mb-2"><strong>Created By - ID:</strong> {ticket.created_by}</p>
                    <p className="mb-2"><strong>Updated By - ID:</strong> {ticket.updated_by}</p>
                    <p className="mb-2"><strong>Created At:</strong> {new Date(ticket.created_at).toLocaleString()}</p>
                    <p className="mb-2"><strong>Updated At:</strong> {new Date(ticket.updated_at).toLocaleString()}</p>
                    {ticket.observacoes && <p className="mb-2"><strong>Observations:</strong> {ticket.observacoes}</p>}
                </div>
            </div>
        );
    }
};

export default DetailTicket;