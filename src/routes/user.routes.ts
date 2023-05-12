import { CreateUserController } from './../controllers/users/useCase/CreateUserController';
import { Router } from "express";

const createUserController = new CreateUserController(); 

const userRoutes = Router();

userRoutes.post("/", createUserController.handle)

export { userRoutes };