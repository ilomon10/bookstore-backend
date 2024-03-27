import { IQueryFilter } from "../types";
import { OrderItemSchema } from "./order_item.entity";
import { OrderItemRepository } from "./order_item.repository";

export class OrderItemService {
  private orderItemRepository: OrderItemRepository;
  constructor(orderItemRepository: OrderItemRepository) {
    this.orderItemRepository = orderItemRepository;
  }

  create = (orderItem: OrderItemSchema) => {
    return this.orderItemRepository.create(orderItem);
  };
  getOne = (id: string) => {
    return this.orderItemRepository.getOne(id);
  };
  getMany = (filter: IQueryFilter) => {
    return this.orderItemRepository.getMany(filter);
  };
}
