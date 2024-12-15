import React from 'react';
import { DepartmentInterface, StateInterface, TicketInterface } from '../interfaces';
import { useNavigate } from 'react-router-dom';


interface TicketProps {
    ticket: TicketInterface;
    states: StateInterface[];
    department: DepartmentInterface;
}

const Ticket: React.FC<TicketProps> = ({ ticket, states, department }) => {
    const criadoEm = new Date(ticket.created_at);
    const atualizadoEm = new Date(ticket.created_at);
    const state = states.find((state) => state.id === ticket.id_state)
    const navigate = useNavigate()


    const getStateClass = (stateId: StateInterface) => {
        switch (stateId.id) {
            case "PENDENTE":
                return 'bg-yellow-300';
            case "TRATAMENTO":
                return 'bg-blue-400';
            case "FINALIZADO":
                return 'bg-green-500';
            case "RECUSADO":
                return 'bg-red-500';
            default:
                return 'bg-gray-100';
        }
    };
    const stateClass = getStateClass(state!);
    return (

        <div onClick={() => navigate(`/tickets/${ticket.id}`)} className={`flex flex-col hover:cursor-pointer justify-between w-full p-5 m-5 gap-1 rounded shadow-md min-h-32 max-w-1x1 ${stateClass}`}>
            <div className='flex justify-between border-b-2 border-black'>
                <h3 className="font-bold text">Título: {ticket.title}</h3>
                <span>{state?.title}</span>
            </div>
            <div className='flex justify-between border-b-2 border-black'>
                <span>criado em:</span>
                <span>{criadoEm.toLocaleDateString()}</span>
            </div>
            <div className='flex justify-between border-b-2 border-black'>
                <span>atualizado em:</span>
                <span>{atualizadoEm.toLocaleDateString()}</span>
            </div>
            <div className='flex justify-between border-b-2 border-black'>
                <span>departamento: {department.title}</span>
            </div>
        </div>

    );
};

export default Ticket;