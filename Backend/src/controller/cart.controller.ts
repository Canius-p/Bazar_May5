import { Request, Response } from 'express';
import { authRequest } from '../middleware/auth.middleware';
import Cart from '../database/models/cart.model';
import { Certificate } from 'crypto';
import Product from '../database/models/product.model';

class cartController {
  async addToCart(req: authRequest, res: Response): Promise<void> {
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
  async getCart(req: authRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const cartItems = await Cart.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Product,
          include: [
            {
              model: Product,
              attributes: ['id', 'catagotyName'],
            },
          ],
        },
      ],
    });
    if (cartItems.length === 0) {
      res.status(400).json({
        message: 'No Items found',
      });
    } else {
      res.status(200).json({
        message: 'Cart data fetched successfully',
        data: cartItems,
      });
    }
  }

  async deleteCart(req: Request, res: Response): Promise<void> {}
  async udateCart(req: Request, res: Response): Promise<void> {}
}
export default new cartController();
