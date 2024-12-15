import { CreationAttributes, ForeignKey, Sequelize } from "sequelize";
import { startServer } from "../app";
import ticketService from "./ticket";
import State from "../models/state";
import Department from "../models/department";
import User from "../models/user";
import { ApplicationError } from "./errors";
import { StatusCodes } from "http-status-codes";
import { Ticket } from "../models";
import ticketRepository from "../repositories/ticket";

// Create in-memory SQLite database with logging configuration
const db = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: console.log,
  define: {
    timestamps: true,
  },
});

let testUser: User;
let testDepartment: Department;
let testState: State;

beforeEach(async () => {
  await startServer(db);

  testDepartment = await Department.create({
    title: "Test Department",
  });

  testState = await State.create({
    id: "PENDENTE",
    title: "Pendente",
  });

  testUser = await User.create({
    name: "Test User",
    email: "test@test.com",
    password: "password123",
    id_department: testDepartment.id,
  });
});

describe("Ticket Service", () => {
  const createTicketPayload = (): CreationAttributes<Ticket> => ({
    title: "Test Ticket",
    description: "Test Description",
    created_by: testUser.id,
    updated_by: testUser.id,
    id_state: testState.id,
    id_department: testDepartment.id,
    observacoes: undefined,
  });

  it("should create a ticket", async () => {
    const ticketPayload = createTicketPayload();
    console.log("Ticket Payload:", ticketPayload);
    const ticket = await ticketService.createTicket(ticketPayload);

    expect(ticket).toBeDefined();
    expect(ticket.title).toBe(ticketPayload.title);
    expect(ticket.description).toBe(ticketPayload.description);
    expect(ticket.created_by).toBe(ticketPayload.created_by);
    expect(ticket.id_department).toBe(ticketPayload.id_department);
    expect(ticket.id_state).toBe(ticketPayload.id_state);
  });

  it("should delete a ticket", async () => {
    const ticketPayload = createTicketPayload();
    const createdTicket = await ticketService.createTicket(ticketPayload);

    const ticketBeforeDeletion = await ticketService.getTicketById(createdTicket.id);
    expect(ticketBeforeDeletion).toBeDefined();
    expect(ticketBeforeDeletion.id).toBe(createdTicket.id);

    await ticketService.deleteTicket(createdTicket.id);

    await expect(ticketService.getTicketById(createdTicket.id)).rejects.toEqual(
      new ApplicationError(StatusCodes.NOT_FOUND, "Ticket not found")
    );
  });
  it("should update a ticket", async () => {
    const ticketPayload = createTicketPayload();
    const createdTicket = await ticketService.createTicket(ticketPayload);

    const updatedData = { title: "Updated Ticket Title" };
    const updatedTicket = await ticketService.updateTicket(createdTicket.id, updatedData);

    expect(updatedTicket).toBeDefined();
    expect(updatedTicket?.title).toBe(updatedData.title);
  });

  it("should get a ticket by ID", async () => {
    const ticketPayload = createTicketPayload();
    const createdTicket = await ticketService.createTicket(ticketPayload);

    const fetchedTicket = await ticketService.getTicketById(createdTicket.id);

    expect(fetchedTicket).toBeDefined();
    expect(fetchedTicket.id).toBe(createdTicket.id);
    expect(fetchedTicket.title).toBe(createdTicket.title);
  });

  it("should get tickets by user", async () => {
    const ticketPayload = createTicketPayload();
    await ticketService.createTicket(ticketPayload);

    const tickets = await ticketService.getTicketsByUser(testUser.id);

    expect(tickets).toBeDefined();
    expect(tickets.length).toBeGreaterThan(0);
    expect(tickets[0]!.created_by).toBe(testUser.id);
  });
});
afterAll(async () => {
  await db.close();
});
