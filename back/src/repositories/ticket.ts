import { CreationAttributes } from "sequelize";
import { Ticket, User } from "../models";

import { StatusCodes } from "http-status-codes";
import { ApplicationError } from "../services/errors";

// export type TicketCreationAttributes = Omit<InferCreationAttributes<Ticket>, "id" | "created_at" | "updated_at">;

async function createTicket(data: CreationAttributes<Ticket>) {
  return await Ticket.create(data);
}

async function updateTicket(id: number, data: any): Promise<[affectedCount: number]> {
  return await Ticket.update(data, { where: { id } });
}

async function getTicketById(id: number): Promise<Ticket | null> {
  return await Ticket.findByPk(id);
}

async function getTicketsByUser(user: User): Promise<Ticket[]> {
  return await Ticket.findAll({
    where: { created_by: user.id, id_department: user.id_department },
  });
}

async function getAllTickets(): Promise<Ticket[]> {
  return await Ticket.findAll();
}

async function deleteTicket(id: number): Promise<void> {
  await Ticket.destroy({ where: { id } });
}

const ticketRepository = {
  createTicket,
  deleteTicket,
  updateTicket,
  getTicketsByUser,
  getAllTickets,
  getTicketById,
};
export default ticketRepository;
