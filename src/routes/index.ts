import { Router } from "express";
import userRoutes from "./userRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/books", bookRoutes)

export default routes;
