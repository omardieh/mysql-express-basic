require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./db");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Main Route");
  console.log("main route");
});

app.get("/products", (req, res) => {
  connection
    .promise()
    .query("SELECT * FROM products")
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving products from db.");
    });
});

app.post("/products", (req, res) => {
  const { title, price } = req.body;
  connection
    .promise()
    .query("INSERT INTO products (title, price) VALUES (?, ?)", [title, price])
    .then(([result]) => {
      const createdProduct = { id: result.insertId, title, price };
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.put("/products/:id", (req, res) => {
  console.log("test");
  res.send("Hello Products");
});

app.listen(PORT, () => {
  console.log("listening..");
});
