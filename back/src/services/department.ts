import { ApplicationError } from "./errors";
import { Department, User } from "../models";
import departmentRepository from "../repositories/department";

async function findDepartments(): Promise<Department[]> {
  const departments = await departmentRepository.findDepartments();
  if (!departments) {
    throw new ApplicationError(404, "Departments not found.");
  }
  return departments;
}

const departmentService = {
  findDepartments,
};

export default departmentService;
