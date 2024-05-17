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
    //checking for the existing cart items
    let cartItem = await Cart.findOne({
      where: {
        userId,
        productId,
      },
    });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        quantity,
        userId,
        productId,
      });
    }
    res.status(200).json({
      message: 'Product added to cart',
      data: cartItem,
    });
  }
}
export default new cartController();
