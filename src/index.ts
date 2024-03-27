import knex from "knex";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knexConfig from "../knexfile";
import userRouter from "./modules/user/user";
import bookRouter from "./modules/book/book";
import orderRouter from "./modules/order/order";
import bookTagRouter from "./modules/book/book_tag";
import orderItemRouter from "./modules/order/order_item";
import authRouter from "./modules/authentication/auth";

const app = express();
const PORT = 3050;

const knexInstance = knex(knexConfig["development"]);

app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRouter(knexInstance));
app.use("/authenticate", authRouter(knexInstance));

app.use("/orders", orderRouter(knexInstance));
app.use("/order-items", orderItemRouter(knexInstance));

app.use("/books", bookRouter(knexInstance));
app.use("/book-tags", bookTagRouter(knexInstance));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
