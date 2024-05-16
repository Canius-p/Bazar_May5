import { Request, Response } from 'express';
import { authRequest } from '../middleware/auth.middleware';
import Cart from '../database/models/cart.model';
import { Certificate } from 'crypto';

class cartController {
  async addTOCart(req: authRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { quantity, productId } = req.body;
    if (!quantity || !productId) {
      res.status(400).json({
        message: 'Please provide data',
      });
    }
    let cartItems = await Cart.findOne({
      where: {
        userId,
        productId,
      },
    });
    if (cartItems) {
      cartItems.quantity = quantity;
      await cartItems.save();
    }
  }
}
