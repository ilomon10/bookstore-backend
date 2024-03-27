import { Request, Response } from "express";
import { OrderItemService } from "./order_item.service";

export class OrderItemController {
  private service: OrderItemService;

  constructor(service: OrderItemService) {
    this.service = service;
  }

  create = async (req: Request, res: Response) => {
    const order = req.body;
    const createdOrderItem = this.service.create(order);
    res.status(201).json(createdOrderItem);
  };

  getOne(req: Request, res: Response) {
    const id = req.params.id;
    const orders = this.service.getOne(id);
    res.status(200).json(orders);
  }

  getMany(req: Request, res: Response) {
    const filter = req.query;
    const orders = this.service.getMany(filter);
    res.status(200).json(orders);
  }
}
