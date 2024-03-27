import { IQueryFilter } from "../types";
import { Order } from "./order.entity";
import OrderRepository from "./order.repository";

class OrderService {
  private repository: OrderRepository;

  constructor(repository: OrderRepository) {
    this.repository = repository;
  }

  create = async (order: any): Promise<Order> => {
    return this.repository.create(order);
  };

  getOne = async (id: string): Promise<Order[]> => {
    return this.repository.getOne(id);
  };

  getMany = async (filter: IQueryFilter): Promise<Order[]> => {
    return this.repository.getMany(filter);
  };
}

export default OrderService;
