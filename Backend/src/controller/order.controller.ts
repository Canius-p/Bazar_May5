import { Request, Response } from 'express';
import { orderData } from '../types/order.types';
import Order from '../database/models/order.model';
import { authRequest } from '../middleware/auth.middleware';
import Payment from '../database/models/payment.model';

class orderContoller {
  async createOrder(req: authRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const {
      phoneNumber,
      shippingAddress,
      totalAmount,
      paymentDetails,
      items,
    }: orderData = req.body;
    if (
      !phoneNumber ||
      !shippingAddress ||
      !totalAmount ||
      !paymentDetails ||
      items.length == 0
    ) {
      res.status(400).json({
        message: 'Please provide all the data',
      });
      return;
    }
    const orderData = await Order.create({
      phoneNumber,
      shippingAddress,
      totalAmount,
      userId,
    });
    await Payment.create({
      paymentMethod: paymentDetails.paymentMethod,
    });
  }
}
