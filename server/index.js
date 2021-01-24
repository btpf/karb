const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


//Armaan Singh index.js lines 14-72
var express = require('express');
var app = express();

const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool({
user: "postgres",
host: "0.tcp.ngrok.io",
database: "krab",
password: "root",
port: "13816"})


pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

/*
pool.query("INSERT INTO ingredient(ingredientName) VALUES('Cheese')",(err, res) => {
  console.log(err, res)
  pool.end()
})
*/

app.get('/', function(req, res){
   res.send("Hello world!");
});


app.get('/test', function(req, res){
   res.send("Test");
});

app.get('/recipe', function(req, res){
   res.send("Recipe Response");
});


app.get('/addIngredient/:ingredientName', async(req,res) => {
const ingredientName = req.params.ingredientName
const { rows } = await pool.query("INSERT INTO ingredient(ingredientName) VALUES($1)", [ingredientName])
res.send(rows[0])
});


app.get('/listIngredients' , async(req,res)=> {
const {rows} = await pool.query('SELECT ingredientName FROM ingredient')
res.send(rows);
});


pool.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
})

app.listen(3000);

