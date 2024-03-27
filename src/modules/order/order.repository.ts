import { Knex } from "knex";
import { Order } from "./order.entity";
import { IQueryFilter } from "../types";

class OrderRepository {
  private knex: Knex;
  constructor(knex: Knex) {
    this.knex = knex;
  }

  create = async (data: Order): Promise<Order> => {
    const [createdOrder] = await this.knex("orders")
      .insert(data)
      .returning("*");
    return createdOrder;
  };

  getOne = async (id: string): Promise<Order[]> => {
    return this.knex("orders").where("id", id).first();
  };

  getMany = async (filter: IQueryFilter): Promise<Order[]> => {
    return this.knex("orders").where(filter);
  };
}

export default OrderRepository;
