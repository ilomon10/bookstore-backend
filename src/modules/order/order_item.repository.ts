import { Knex } from "knex";
import { OrderItemSchema } from "./order_item.entity";

export class OrderItemRepository {
  private knex: Knex;
  constructor(knex: Knex) {
    this.knex = knex;
  }

  create = async (data: OrderItemSchema): Promise<OrderItemSchema> => {
    const [createdOrderItem] = await this.knex("order_items")
      .insert(data)
      .returning("*");
    return createdOrderItem;
  };
  getOne = async (id: string): Promise<OrderItemSchema> => {
    return this.knex("order_items").where("id", id).first();
  };
  getMany = async (filter: {
    [field: string]: string
  }): Promise<OrderItemSchema[]> => {
    return this.knex("order_items").where(filter);
  };
}
