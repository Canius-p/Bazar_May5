import { Request, Response } from 'express';
import Product from '../database/models/product.model';
import { authRequest } from '../middleware/auth.middleware';
import User from '../database/models/user.model';
import Category from '../database/models/category.model';
import fs from 'fs';

class productController {
  async addProduct(req: authRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const {
      productName,
      productDescription,
      productPrice,
      productStatus,
      productStockQuantity,
      categoryId,
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
      !productPrice ||
      !categoryId
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
      image: filename,
      userId: userId,
      categoryId: categoryId,
    });
    res.status(200).json({
      message: 'Product added successfully',
    });
  }
  async getAllProduct(req: Request, res: Response): Promise<void> {
    const data = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'email', 'username'],
        },
        {
          model: Category,
          attributes: ['categoryName'],
        },
      ],
    });
    res.status(200).json({
      message: 'Products fetched successfully',
      data,
    });
  }

  async getSingleProduct(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const data = await Product.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'email', 'username'],
        },
        {
          model: Category,
          attributes: ['categoryName'],
        },
      ],
    });
    if (data.length == 0) {
      res.status(404).json({
        message: 'The product doesnt exist with id',
      });
    } else {
      res.status(200).json({
        message: 'Product fetched successfully',
        data,
      });
    }
  }
  async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = await Product.findAll({
      where: {
        id: id,
      },
    });

    Product.destroy({
      where: {
        id: id,
      },
    });
    if (data.length > 0) {
      res.status(404).json({
        message: 'The product doesnt exist with id',
      });
    } else {
      res.status(200).json({
        message: 'Product deleted successfully',
        data,
      });
    }
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const {
      productName,
      productDescription,
      productPrice,
      productStatus,
      productStockQuantity,
      categoryId,
    } = req.body;

    if (
      !productName ||
      !productDescription ||
      !productStockQuantity ||
      !productPrice ||
      !categoryId
    ) {
      res.status(400).json({
        message: 'Please provide all the details',
      });
      return;
    }
    const oldData = await Product.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'email', 'username'],
        },
        {
          model: Category,
          attributes: ['categoryName'],
        },
      ],
    });

    const oldProductImage = oldData;
    const lengthToCut = String(process.env.BACKEND_URL);
    const finalFilePath = oldProductImage.slice(lengthToCut);
    if (req.file && req.file?.fieldname) {
      fs.unlink('./uploads/' + finalFilePath, err => {
        if (err) {
          console.log('error deleting file', err);
        } else {
          console.log('file deleted successfully');
        }
      });
    }

    const data = await Product.update(
      {
        productName,
        productDescription,
        productPrice,
        productStatus,
        productStockQuantity,
        categoryId,
        image:
          req.file && req.file?.filename
            ? process.env.BACKEND_URL + req.file.filename
            : oldData,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({
      message: 'Product update successfully',
      data: data,
    });
  }
}

export default new productController();
