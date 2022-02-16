import { Router } from "express";
import UserController from "../controllers/userController";
import { emailAndCPFValidation } from "../middlewares/userMiddlewares";

const userRoutes = Router();
const controller = new UserController();

userRoutes.post("/", emailAndCPFValidation, controller.createUser);
userRoutes.get("/", controller.getUsers);
userRoutes.get("/:id", controller.getUserById);
userRoutes.get("/email/:email", controller.getUserByEmail);
userRoutes.put("/:id", emailAndCPFValidation, controller.updateUserById);
userRoutes.delete("/:id", controller.deleteUserById);

export default userRoutes;
