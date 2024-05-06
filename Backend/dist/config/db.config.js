"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = {
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
exports.default = dbConfig;
