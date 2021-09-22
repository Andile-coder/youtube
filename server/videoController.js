const express = require("express");
require("dotenv").config();
const { Pool } = require("pg");
const app = express();
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

app.use(express.json());

const video_getAll = (req, res) => {
  pool.query("SELECT * FROM videos", (error, result) => {
    res.json(result.rows);
  });
};

const video_add = (req, res) => {
  const url = req.body.data.url;
  const title = req.body.data.title;
  const query = `INSERT INTO videos (title,url,rating) VALUES ($1,$2,$3)`;
  pool.query(query, [title, url, 0]).catch((e) => console.error(e));
};

const video_deleteById = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM videos WHERE id=${id}`;
  pool.query(query).catch((e) => console.error(e));
  console.log("inside delete", id);
};
const video_updateRating = (req, res) => {
  const id = req.params.id;
  const rate = req.body.rating_value;
  const query = `UPDATE videos SET rating=rating+${rate} WHERE id=${id}`;
  pool.query(query).catch((e) => console.error(e));
  console.log("rendering server");
};
module.exports = {
  video_getAll,
  video_add,
  video_deleteById,
  video_updateRating,
};
