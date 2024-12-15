import { Router } from "express";
import { findDepartments } from "../controllers/department";

const departmentRouter = Router();

departmentRouter.get("/", findDepartments);

export { departmentRouter };
