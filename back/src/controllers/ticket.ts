import { Response, Request, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/token";
import ticketService from "../services/ticket";
import { StatusCodes } from "http-status-codes";
import { ApplicationError } from "../services/errors";
import userRepository from "../repositories/users";
import { StatesID } from "../models/state";
import { Ticket } from "../models";

export interface CreateTicketDTO {
  description: string;
  title: string;
  observacoes?: string;
  id_state: StatesID;
}

export async function findTickets(req: AuthenticatedRequest, res: Response) {
  // TODO - Implement pagination and search

  const { page = "1", pageSize = "10", search = "", status } = req.query;

  const pageNumber = parseInt(page as string);
  const pageSizeNumber = parseInt(pageSize as string);

  const offset = (pageNumber - 1) * pageSizeNumber;
  const limit = pageSizeNumber;
  const user = req.user;
  if (!user) throw new ApplicationError(StatusCodes.INTERNAL_SERVER_ERROR, "Authenticate Request: user is null");

  const tickets = await ticketService.getTicketsByUser(user.id);
  res.status(StatusCodes.OK).send(tickets);
}
export async function findTicketById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const user = req.user;
    const { ticketId } = req.params;
    if (!user || !ticketId) res.sendStatus(StatusCodes.BAD_REQUEST);
    const ticket = await ticketService.getTicketByIdAndOwner(+ticketId!, user!.id);
    res.status(StatusCodes.OK).send(ticket);
  } catch (error) {
    next(error);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { description, title, observacoes, id_state } = req.body;
  const userJWT = req.user;
  const user = await userRepository.findById(userJWT!.id);
  if (!user) throw new ApplicationError(StatusCodes.INTERNAL_SERVER_ERROR, "Ticket Creation - User is null");
  const ticketCreated = await ticketService.createTicket({
    description,
    id_state,
    title,
    id_department: user.id_department,
    observacoes,
    updated_by: user.id,
    created_by: user.id,
  });
  res.status(StatusCodes.CREATED).send(ticketCreated);
}
