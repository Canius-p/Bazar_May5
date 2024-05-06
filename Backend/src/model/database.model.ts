import { Sequelize, DataType } from "sequelize";
import dbConfig from "../config/db.config";

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: 3306,
    pool: {
      acquire: dbConfig.pool.acqurie,
      min: dbConfig.pool.min,
      max: dbConfig.pool.max,
      idle: dbConfig.pool.idle,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected ");
  })
  .catch((err) => {
    console.log("Erro roocured: " + err);
  });
const database: any = {};
database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.sequelize.sync({ force: false }).then(() => {
  console.log("data migrated succesfully");
});

export default database;
