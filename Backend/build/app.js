"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT || 8080;
const HOSTNAME = process.env.HOSTNAME;
app.get("/", (req, res) => {
    res.send("Im alive");
});
app.listen(PORT, () => {
    console.log(`Sever is running on ${HOSTNAME}:${PORT}`);
});
