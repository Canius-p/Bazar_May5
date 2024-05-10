import { Request, Response } from 'express';
import Product from '../database/models/product.model';
class productController {
  async addProduct(req: Request, res: Response): Promise<void> {
    const {
      productName,
      productDescription,
      productPrice,
      productStatus,
      productStockQuantity,
    } = req.body;
    let filename;
    if (req.file) {
      filename = req.file?.filename;
    } else {
      filename =
        'https://www.pacagemockup.com/wp-content/uploads/2022/01/Free-Product-Package-Open-Box-Mockup-758x548.jpg';
    }

    if (
      !productName ||
      !productDescription ||
      !productStockQuantity ||
      !productPrice
    ) {
      res.status(400).json({
        message: 'Please provide all the details',
      });
      return;
    }

    await Product.create({
      productName,
      productDescription,
      productPrice,
      productStockQuantity,
      productStatus,
      image: filename,
    });
    res.status(200).json({
      message: 'Product added successfully',
    });
  }
}

export default new productController();
