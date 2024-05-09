import { Request, Response } from 'express';
import Product from '../database/models/product.model';
class productController {
  async addproduct(req: Request, res: Response): Promise<void> {
    const {
      productName,
      productDescription,
      productPrice,
      productStatus,
      prdouctStockQuantity,
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
      !productPrice ||
      !prdouctStockQuantity
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
      prdouctStockQuantity,
      productStatus,
      image: filename,
    });
  }
}

export default new productController();
