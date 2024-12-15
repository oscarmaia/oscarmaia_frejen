import { Department } from "../models";

async function findDepartments() {
  return await Department.findAll();
}

const departmentRepository = {
  findDepartments,
};

export default departmentRepository;
