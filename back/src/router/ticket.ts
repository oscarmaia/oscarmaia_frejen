import {  Router } from "express";
import { authenticateToken } from "../middlewares/token";
import { createTicket, findTicketById, findTickets } from "../controllers/ticket";


const ticketsRouter = Router();

ticketsRouter.get("/", authenticateToken, findTickets);
ticketsRouter.get("/:ticketId", authenticateToken, findTicketById);
ticketsRouter.post("/", authenticateToken, createTicket);
export { ticketsRouter };

