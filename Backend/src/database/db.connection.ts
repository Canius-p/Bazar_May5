import { Sequelize } from 'sequelize-typescript';
import Product from './models/product.model';
import User from './models/user.model';
import Category from './models/category.model';
import Cart from './models/cart.model';
import Order from './models/order.model';
import OrderDetails from './models/orderdetails.model';
import Payment from './models/payment.model';

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'mysql',
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  models: [__dirname + '/models'],
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database Connected ');
  })
  .catch(err => {
    console.log('Error occured: ' + err);
  });
sequelize.sync({ force: false }).then(() => {
  console.log('data synced succesfully');
});

//relation
User.hasMany(Product, { foreignKey: 'userId' });
//custom foreign coln User.hasMany(Product:foreign key : "newcoln");
Product.belongsTo(User, { foreignKey: 'userId' });

Category.hasOne(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });
// Product.belongsTo();
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

//order-orderdetails re
Order.hasMany(OrderDetails, { foreignKey: 'orderId' });
OrderDetails.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderDetails, { foreignKey: 'productId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

// order and payment relationship
Payment.hasOne(Order, { foreignKey: 'paymentId' });
Order.belongsTo(Payment, { foreignKey: 'paymentId' });

//user and order relationship
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });
export default sequelize;
