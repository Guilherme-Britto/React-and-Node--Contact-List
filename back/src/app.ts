import "express-async-errors";
import express from "express";
import { userRoutes } from "./routes/users.routes";
import { sessionRoutes } from "./routes/session.routes";
import { contactRoutes } from "./routes/contact.route";
import { handleAppError } from "./middlewares/haldleAppError";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/contacts", contactRoutes);
app.use(handleAppError);

export default app;
