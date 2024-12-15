import { Department, State, Ticket, User } from "../../models";
import { StatesID } from "../../models/state";
import userService from "../user";
import { faker } from "@faker-js/faker";

export async function populateDatabaseWithDummyData() {
  const dev = await Department.create({ title: "Desenvolvimento" });
  const sup = await Department.create({ title: "Suporte" });
  const fin = await Department.create({ title: "Financeiro" });
  const admin = await userService.createUser({
    name: "Admin",
    email: "frejen@gmail.com",
    password: "password",
    admin: true,
    id_department: 2,
  });
  const oscar = await userService.createUser({
    name: "Oscar Maia",
    email: "oscarfgmaia@gmail.com",
    password: "password",
    id_department: 1,
  });
  const user = await userService.createUser({
    name: "User Suporte",
    email: "user@gmail.com",
    password: "password",
    id_department: 3,
  });
  await State.create({ id: "PENDENTE", title: "Pendente" });
  await State.create({ id: "TRATAMENTO", title: "Em tratamento" });
  await State.create({ id: "FINALIZADO", title: "Finalizado" });
  await State.create({ id: "RECUSADO", title: "Recusado" });
  for (let i = 0; i < 20; i++) {
    let rand: number | StatesID = Math.floor(Math.random() * 4) + 1;

    switch (rand) {
      case 1:
        rand = "PENDENTE";
        break;
      case 2:
        rand = "TRATAMENTO";
        break;
      case 3:
        rand = "FINALIZADO";
        break;
      case 4:
        rand = "RECUSADO";
        break;
      default:
        rand = "PENDENTE";
        break;
    }
    async function createTicket(user: User, rand: StatesID) {
      await Ticket.create({
        description: faker.person.jobDescriptor(),
        id_state: rand,
        title: faker.person.jobTitle(),
        created_by: user.id,
        updated_by: user.id,
        id_department: user.id_department,
        observacoes: rand === "RECUSADO" ? faker.person.jobArea() : undefined,
      });
    }
    const rand2 = Math.floor(Math.random() * 3) + 1;
    switch (rand2) {
      case 1:
        await createTicket(admin, rand);
        break;
      case 2:
        await createTicket(oscar, rand);
        break;
      case 3:
        await createTicket(user, rand);
        break;
      default:
    }
  }
}
