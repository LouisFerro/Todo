"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors_1 = __importDefault(require("cors"));
const app = express();
const port = 3000;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'Todo'
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err);
    res.status(500).send('Something broke!  ' + err);
}
app.use(errorHandler);
class Todo {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}
app.get('/todo/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query('SELECT * FROM todo');
        const data = result.rows.map(row => new Todo(row.id, row.text));
        res.status(200).send(data);
    }
    catch (err) {
        next(err);
    }
}));
app.get('/todo/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query('SELECT * FROM todo WHERE id = $1', [req.params.id]);
        if (result.rows.length > 0) {
            res.status(200).send(new Todo(result.rows[0].id, result.rows[0].text));
        }
        else {
            res.status(404).end();
        }
    }
    catch (err) {
        next(err);
    }
}));
app.delete('/todo/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.query('DELETE FROM todo WHERE id = $1', [req.params.id]);
        res.status(200).end();
    }
    catch (err) {
        next(err);
    }
}));
app.post('/todo/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query('INSERT INTO todo (text) VALUES ($1) RETURNING id', [req.body.text]);
        res.status(200).send(new Todo(result.rows[0].id, req.body.text));
    }
    catch (err) {
        next(err);
    }
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
