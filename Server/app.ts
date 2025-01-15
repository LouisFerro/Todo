import express = require('express');
import cors from 'cors';
const app = express();
const port: number = 3000;

import { Pool } from 'pg';
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'Todo'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

function errorHandler(err: any, req: any, res: any, next: any) {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err);
    res.status(500).send('Something broke!  ' + err);
}
app.use(errorHandler);

class List {
    readonly id: number;
    readonly text: string;
    constructor(id: number, text: string) {
        this.id = id;
        this.text = text;
    }
}

app.get('/todo/', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM list');
        const data = result.rows.map(row => new List(row.id, row.text));
        res.status(200).send(data);
    } catch (err) {
        next(err);
    }
});

app.get('/todo/:id', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM list WHERE id = $1', [req.params.id]);
        if (result.rows.length > 0) {
            res.status(200).send(new List(result.rows[0].id, result.rows[0].text));
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
});

app.delete('/todo/:id', async (req, res, next) => {
    try {
        await pool.query('DELETE FROM list WHERE id = $1', [req.params.id]);
        res.status(200).end();
    } catch (err) {
        next(err);
    }
});

app.post('/todo/', async (req, res, next) => {
    try {
        const result = await pool.query('INSERT INTO list (text) VALUES ($1) RETURNING id', [req.body.text]);
        res.status(200).send(new List(result.rows[0].id, req.body.text));
    } catch (err) {
        next(err);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});