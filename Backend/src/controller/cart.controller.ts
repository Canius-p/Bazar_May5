import { Request, Response } from 'express';
import { authRequest } from '../middleware/auth.middleware';
import Cart from '../database/models/cart.model';
import { Certificate } from 'crypto';
import Product from '../database/models/product.model';
import Category from '../database/models/category.model';

interface newCart {
  productId: string | null;
  quantity: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  userId: string | null;
}
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
              model: Category,
              attributes: ['id', 'categoryName'],
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

  async deleteCart(req: authRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({
        message: 'Product doest exists with that id',
      });
      return;
    }
    Cart.destroy({
      where: {
        userId,
        productId,
      },
    });
    res.status(200).json({
      message: 'Product deleted Successfully',
    });
  }
  async updateCart(req: authRequest, res: Response): Promise<void> {
    const { productId } = req.params;
    const userId = req.user?.id;
    const { quantity } = req.body;
    if (!quantity) {
      res.status(400).json({
        message: 'Please provide quantitiy',
      });
      return;
    }
    const cartData = await Cart.findOne({
      where: {
        userId,
        productId,
      },
    });
    if (cartData) {
      cartData.quantity = quantity;
      await cartData?.save();
      res.status(200).json({
        message: 'data updated',
        data: cartData,
      });
    } else {
      res.status(404).json({
        message: 'Product doest exists with that Userid',
      });
    }
  }
}
export default new cartController();
