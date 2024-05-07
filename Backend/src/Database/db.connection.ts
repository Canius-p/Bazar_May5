import { Sequelize } from 'sequelize-typescript';
import { mysqlConfig } from '../config/mysql.config';

const sequelize = new Sequelize({});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database Connected ');
  })
  .catch(err => {
    console.log('Error occured: ' + err);
  });
sequelize.sync({ force: false }).then(() => {
  console.log('data migrated succesfully');
});

export default sequelize;
