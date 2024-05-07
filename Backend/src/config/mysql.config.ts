import { Sequelize } from 'sequelize-typescript';
type Database = {
  host: string;
  username: string;
  password: string;
  database: string;
  dialect: 'mysql';
};

export const mysqlConfig: Database = {
  database: process.env.DB_NAME,
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  models: [__dirname + '../Database/models'],
};
