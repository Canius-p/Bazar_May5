"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
const sequelize = new sequelize_1.Sequelize(db_config_1.default.database, db_config_1.default.user, db_config_1.default.password, {
    host: db_config_1.default.host,
    dialect: db_config_1.default.dialect,
    port: 3306,
    pool: {
        acquire: db_config_1.default.pool.acqurie,
        min: db_config_1.default.pool.min,
        max: db_config_1.default.pool.max,
        idle: db_config_1.default.pool.idle,
    },
});
sequelize
    .authenticate()
    .then(() => {
    console.log("Database Connected ");
})
    .catch((err) => {
    console.log("Erro roocured: " + err);
});
const database = {};
database.Sequelize = sequelize_1.Sequelize;
database.sequelize = sequelize;
database.sequelize.sync({ force: false }).then(() => {
    console.log("data migrated succesfully");
});
exports.default = database;
