
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { DepartmentInterface, StateInterface, TicketInterface } from '../../interfaces';
import Ticket from '../../components/Ticket';
import { useNavigate } from 'react-router-dom';


const TicketPage: React.FC = () => {
  const { userInfo } = useAuth()
  const [tickets, setTickets] = useState<TicketInterface[]>([])
  const [states, setStates] = useState<StateInterface[]>([])
  const [departments, setDepartments] = useState<DepartmentInterface[]>([])
  async function getTickets() {
    await axios.get(`${import.meta.env.VITE_API_BASE_URL}/tickets`, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    })
      .then((res) => {
        setTickets(res.data)
      })
      .catch((err) => alert(err.response.data))
  }
  async function getStates() {
    await axios.get(`${import.meta.env.VITE_API_BASE_URL}/states`, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    })
      .then((res) => {
        setStates(res.data)
      })
      .catch((err) => alert(err.response.data))
  }
  async function getDepartments() {
    await axios.get(`${import.meta.env.VITE_API_BASE_URL}/departments`, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    })
      .then((res) => {
        setDepartments(res.data)
      })
      .catch((err) => alert(err.response.data))
  }
  useEffect(() => {

    getTickets()
    getStates()
    getDepartments()
  }, [])

  return (
    <div className="flex flex-col items-center justify-between ">
      <ul>

        {tickets.map((ticket) => {
          const deparment = departments.find((department) => department.id == ticket.id_department)
          if (!deparment) return null
          return (
            <li key={ticket.id}>
              <Ticket states={states} ticket={ticket} department={deparment} />
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default TicketPage;