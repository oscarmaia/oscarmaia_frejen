import { CreationAttributes } from "sequelize";
import { Ticket } from "../models";
import { ApplicationError } from "./errors";
import { StatusCodes } from "http-status-codes";
import ticketRepository from "../repositories/ticket";
import userRepository from "../repositories/users";
import { get } from "axios";

async function createTicket(data: CreationAttributes<Ticket>) {
  try {
    return await ticketRepository.createTicket(data);
  } catch (error) {
    throw new ApplicationError(StatusCodes.INTERNAL_SERVER_ERROR, "Error creating ticket");
  }
}

async function updateTicket(id: number, data: any): Promise<Ticket> {
  const ticket = await ticketRepository.getTicketById(id);
  if (!ticket) {
    throw new ApplicationError(StatusCodes.NOT_FOUND, "Ticket not found");
  }

  try {
    await ticketRepository.updateTicket(id, data);
  } catch (error) {
    throw new ApplicationError(StatusCodes.INTERNAL_SERVER_ERROR, "Error updating ticket");
  }
  const updatedTicket = await ticketRepository.getTicketById(id);
  if (!updatedTicket) {
    throw new ApplicationError(StatusCodes.INTERNAL_SERVER_ERROR, "Error retrieving updated ticket");
  }
  return updatedTicket;
}

// async function getTicketById(id: number): Promise<Ticket> {
//   const ticket = await Ticket.findByPk(id);

//   if (!ticket) {
//     throw new ApplicationError(StatusCodes.NOT_FOUND, "Ticket not found");
//   }

//   return ticket;
// }

export async function getTicketByIdAndOwner(ticketId: number, userId: number): Promise<Ticket> {
  const ticket = await ticketRepository.getTicketById(ticketId);
  if (!ticket) throw new ApplicationError(StatusCodes.NOT_FOUND, "Ticket not found");
  if (ticket.created_by != userId) {
    throw new ApplicationError(StatusCodes.UNAUTHORIZED, "You are not allowed to see this ticket");
  }
  return ticket;
}

export async function getTicketById(ticketId: number): Promise<Ticket> {
  const ticket = await ticketRepository.getTicketById(ticketId);
  if (!ticket) throw new ApplicationError(StatusCodes.NOT_FOUND, "Ticket not found");
  return ticket;
}

async function getTicketsByUser(userId: number): Promise<Ticket[]> {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new ApplicationError(StatusCodes.NOT_FOUND, "User not found");
  }
  if (user.admin) {
    return await ticketRepository.getAllTickets();
  } else {
    return await ticketRepository.getTicketsByUser(user);
  }
}

async function deleteTicket(id: number): Promise<void> {
  const ticket = await ticketRepository.getTicketById(id);
  if (!ticket) {
    throw new ApplicationError(StatusCodes.NOT_FOUND, "Ticket not found");
  }
  try {
    await ticket.destroy();
  } catch (error) {
    throw new ApplicationError(StatusCodes.INTERNAL_SERVER_ERROR, "Error deleting ticket");
  }
}

const ticketService = {
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketById,
  getTicketsByUser,
  getTicketByIdAndOwner,
};

export default ticketService;
