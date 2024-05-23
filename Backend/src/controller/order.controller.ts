import { Request, Response } from 'express';
import { orderData, paymentMethod } from '../@types/order.types';
import Order from '../database/models/order.model';
import { authRequest } from '../middleware/auth.middleware';
import Payment from '../database/models/payment.model';
import OrderDetails from '../database/models/orderdetails.model';
const Items = [
  {
    quantity: 2,
    productId: 2,
  },
  {
    quantity: 1,
    productId: 2,
  },
  {
    quantity: 4,
    productId: 2,
  },
];

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
    for (var i = 0; i < items.length; i++) {
      await OrderDetails.create({
        quantity: items[i].quantity,
        productId: items[0].quantity,
        orderId: orderData.id,
      });
    }
    if (paymentDetails.paymentMethod === paymentMethod.Khalti) {
    } else {
      res.status(200).json({
        message: 'Order Placed Successfully',
      });
    }
  }
}
