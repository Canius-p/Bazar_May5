import Category from '../database/models/category.model';
import { Request, Response } from 'express';
class categoryController {
  categoryData = [
    {
      categoryName: 'Electronics',
    },
    {
      categoryName: 'Groceries',
    },
    {
      categoryName: 'Food/Beverages',
    },
    {
      categoryName: 'Fashion',
    },
  ];
  async seedCategory(): Promise<void> {
    const datas = await Category.findAll();
    if (datas.length === 0) {
      const data = Category.bulkCreate(this.categoryData);
      console.log('Categories seeded Successfully');
    } else {
      console.log('Cateforise already seeded');
    }
  }

  async addcategory(req: Request, res: Response): Promise<void> {
    const { categoryName } = req.body;
    if (!categoryName) {
      res.status(400).json({
        message: 'Please Provide category name ',
      });
      return;
    }
    await Category.create({
      categoryName,
    });

    res.status(200).json({
      message: 'Category added sucessfully',
    });
  }
  async getCategories(req: Request, res: Response) {
    const data = Category.findAll();
    res.status(200).json({
      message: 'Categories fetched',
      data,
    });
  }
  async deleteCategories(req: Request, res: Response) {
    const { id } = req.params;
    const data = await Category.findAll({
      where: {
        id: id,
      },
    });
    if (data.length === 0) {
      res.status(404).json({
        message: 'Category with that id doesnt exists',
      });
    } else {
      await Category.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        message: 'Category deleted successfylly',
      });
    }
  }
  async updateCategories(req: Request, res: Response) {
    const { id } = req.params;
    const { categoryName } = req.body;
    const data = await Category.findAll({
      where: {
        id: id,
      },
    });
    if (data.length === 0) {
      res.status(404).json({
        message: 'Category with that id doesnt exists',
      });
    } else {
      await Category.update(
        { categoryName },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json({
        message: 'Category deleted successfylly',
      });
    }
  }
}

export default new categoryController();
