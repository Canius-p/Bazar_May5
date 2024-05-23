import { Request, Response } from 'express';
import { orderData, paymentMethod } from '../@types/order.types';
import Order from '../database/models/order.model';
import { authRequest } from '../middleware/auth.middleware';
import Payment from '../database/models/payment.model';
import OrderDetails from '../database/models/orderdetails.model';
import axios from 'axios';
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
        productId: items[i].quantity,
        orderId: orderData.id,
      });
    }
    if (paymentDetails.paymentMethod === paymentMethod.Khalti) {
      //khalti Integration
      const data = {
        return_url: process.env.BACKEND_URL,
        purchese_order_id: orderData.id,
        amount: totalAmount * 100,
        website_url: process.env.BACKEND_URL,
        purchase_order_id: orderData.id,
      };
      axios.post('https://a.khalti.com/api/v2/epayment/initiate/', data, {
        headers: {
          Authorization: 'key fd3fb444e174458181e30c5a31f04060',
          'Content-Type': 'application/json',
        },
      });
    } else {
      res.status(200).json({
        message: 'Order Placed Successfully',
      });
    }
  }
}
export default new orderContoller();
