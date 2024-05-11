import Category from '../database/models/category.model';

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
}

export default new categoryController();
