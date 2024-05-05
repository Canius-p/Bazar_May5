type Database = {
  host: string;
  user: string;
  password: string;
  db: string;
  dialect: "mysql" | "postgresql" | "sqlit";
  pool: {
    max: number;
    min: number;
    idle: number;
  };
};
const dbConfig: Database = {
  host: "localhost",
  user: "postgresdb",
  password: "postgresdb",
  db: "bazar",
  dialect: "postgresql",
  pool: {
    max: 10000,
    min: 5,
    idle: 10000,
  },
};

export default dbConfig;
