import { Response, Request } from "express";
import departmentService from "../services/department";

export async function findDepartments(req: Request, res: Response) {
  const departments = await departmentService.findDepartments();
  res.status(200).send(departments);
}
