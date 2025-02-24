import express,{Request, Response}  from "express";
import dotenv from "dotenv";
import cardRouter from "./routes/card.routes";
import userRouter from "./routes/user.routes";
import { errorHandler } from "@middlewares/errorHandler.middleware";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/cards", cardRouter);
app.use("/users", userRouter);
app.use("/", (req: Request,res: Response)=> {res.send("HOME")});

// Global error handler (must come after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
