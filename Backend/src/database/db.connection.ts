import { Sequelize } from 'sequelize-typescript';

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

export default sequelize;
