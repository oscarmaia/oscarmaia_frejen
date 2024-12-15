import { Sequelize } from "sequelize";
import app, { startServer } from "../app";
import userService from "../services/user";
import supertest from "supertest";
import { Department, State, Ticket, User } from "../models";
import { CreateTicketDTO } from "../controllers/ticket";
import { generateAuthToken } from "../services/internals/token";

const db = new Sequelize("sqlite::memory");
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
const server = supertest(app);
describe("create user", () => {
  it("should craete ticket", async () => {
    const token = generateAuthToken(testUser.id, testUser.admin, testUser.name, testUser.email, testUser.id_department);
    const payload = { description: "Ticket maroto", id_state: testState.id, title: "Titulo massa" } as CreateTicketDTO;

    const response = await server.post("/tickets").set("Authorization", `Bearer ${token}`).send(payload);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(payload.title);
  });
});
