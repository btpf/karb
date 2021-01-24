const express = require('express')
const axios = require('axios');
const app = express()
const port = 3001
const querystring = require("querystring");
const config = require("./secrets.json")
var spoonacularAPIKey = config.spoonacular_api_key;
const { Pool, Client } = require('pg');
let list = "";


// pools will use environment variables
// for connection information
const pool = new Pool({
user: "postgres",
host: "0.tcp.ngrok.io",
database: "krab",
password: "root",
port: "17086"})


// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })



app.get('/', (req, res) => {

res.send("example")

})
app.get('/addIngredient',(req,res)=>{
//const form	= res.sendfile("html/index.html");
  form.pipe(res);// takes in the result of the userinput from form

});


app.get('/addIngredient/:ingredientName', async(req,res) => {
const ingredientName = req.params.ingredientName
const { rows } = await pool.query("INSERT INTO ingredient(ingredientName) VALUES($1)", [ingredientName])
res.send(rows[0])
});

app.get('/deleteIngredient',(req,res)=>{
//const form	= res.sendfile("html/index.html");
  form.pipe(res);// takes in the result of the userinput from form

});


app.get('/listIngredients' , async(req,res)=> {
const {rows} = await pool.query('SELECT ingredientName FROM ingredient')
let ingredientList = []
rows.forEach((obj)=>ingredientList.push(obj.ingredientname))
res.send(ingredientList);

});

app.get('/findrecipe', async (req, res) => {
  const {rows} = await pool.query('SELECT ingredientName FROM ingredient')
  let ingredientList = []
rows.forEach((obj)=>ingredientList.push(obj.ingredientname))
	axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
		params:{
            apiKey:spoonacularAPIKey,
		ingredients: ingredientList.join(),
		number: "10",
		limitLicense: "true",
		ranking: "1",
		ignorePantry: "true"
	},
	header:{
		"Content-Type": "application/json"
	}
	})
	.then(ress =>{
	console.log(ress.data);
	res.send(ress.data);

	})
	.catch(err => console.error(err))


	res.send(filterdata(data));

//.join


})

function filterdata(data){
//	console.log(data);
	console.log("hi");
	data = data.map((obj)=> ({
	id:obj.id,
	title:obj.title,
	image:obj.image,
	imageType:obj.imageType,
	usedIngredientCount:obj.usedIngredientCount,
	missedIngredientCount:obj.missedIngredientCount,
	missedIngredients:obj.missedIngredients,
	usedIngredients:obj.usedIngredients
	}));
	console.log(data);
	//data.map((obj) => console.log(obj));

	return data;
}



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


//Armaan Singh index.js lines 14-72





/*
pool.query("INSERT INTO ingredient(ingredientName) VALUES('Cheese')",(err, res) => {
  console.log(err, res)
  pool.end()
})
*/








pool.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
})

app.listen(3000);
