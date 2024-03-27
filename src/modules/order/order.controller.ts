import { Request, Response } from "express";
import OrderService from "./order.service";
import { IQueryFilter } from "../types";

class OrderController {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  create = async (req: Request, res: Response) => {
    const order = req.body;
    const createdOrder = this.orderService.create(order);
    res.status(201).json(createdOrder);
  };

  getOne(req: Request, res: Response) {
    const id = req.params.id;
    const orders = this.orderService.getOne(id);
    res.status(200).json(orders);
  }

  getMany(req: Request, res: Response) {
    const filter = req.query;
    const orders = this.orderService.getMany(filter);
    res.status(200).json(orders);
  }
}

export default OrderController;
