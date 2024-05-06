type Database = {
  host: string;
  user: string;
  password: string;
  database: string;
  dialect: "mysql";
  pool: {
    max: number;
    min: number;
    idle: number;
    acqurie: number;
  };
};

const dbConfig: Database = {
  host: "localhost",
  user: "mysqldb",
  password: "mysqldb",
  database: "bazar",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acqurie: 1000,
  },
};

export default dbConfig;
