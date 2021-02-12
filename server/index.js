const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express()
const port = 3001
const querystring = require("querystring");
const config = require("./secrets.json")
const imageTest = require("./image.json").data
const server = config.database
var spoonacularAPIKey = config.spoonacular_api_key;
const googlekey = config.googlekey;
const { Pool, Client } = require('pg');


// pools will use environment variables
// for connection information
const pool = new Pool({
user: server.username,
host: server.ip,
database: server.dbname,
password: server.password,
port: server.port})

const cors = require('cors');
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

const corsOptions ={
    origin:'http://localhost:8080',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.raw());

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

app.get('/getImage',(req,res)=>{
	//const form	= res.sendfile("html/index.html");
	var img = new Buffer.from(imageTest);
	res.send("<img src=\"data:image/jpeg;base64, " + imageTest + "\"/>")
	// res.send(imageTest);// takes in the result of the userinput from form

	});

app.post('/postimage', (req, res) =>{
//let base64Upload = req.body.image
let body = {
	params:{
		key: googlekey
},
	"requests": [
	  {
		"image": {  
			"content": imageTest   
		 },
		 "features": [
		   {
					  
			 "type": "TEXT_DETECTION"
		   }
		 ]
	  }
	]
  }
  axios.post('https://vision.googleapis.com/v1/images:annotate',body, {
	header:{
		"Content-Type": "application/json"
	}
	})
	.then(ress =>{
//	console.log(ress.data);
	res.send(ress.data);

	}).catch(err => console.error("err"))
 // res.sendstatus(200);

//res.send(["Turkey","Peanut","Ice Cream"])
});

app.delete('/removeIngredient/:ingredientName', async(req,res) => {
const ingredientName = req.params.ingredientName
const { rows } = await pool.query("Delete From ingredient where ingredientName = VALUES($1)", [ingredientName])
res.send(rows[0])
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
		console.log(ress.data)
		res.send(filterdata(ress.data));

	})
	.catch(err => console.error(err))

//.join


})


app.get('/getInstructions/:recipeId', async (req, res) => {


	axios.get('https://api.spoonacular.com/recipes/' + req.params.recipeId + "/analyzedInstructions", {
		params:{
			apiKey:spoonacularAPIKey
	},
	header:{
		"Content-Type": "application/json"
	}
	})
	.then(instructionData =>{
		res.send(instructionData.data);

	})
  
  //.join
  
  
  })

function filterdata(data){
//	console.log(data);
	// console.log("hi");
	// data = data.map((obj)=> ({
	// id:obj.id,
	// title:obj.title,
	// image:obj.image,
	// imageType:obj.imageType,
	// usedIngredientCount:obj.usedIngredientCount,
	// missedIngredientCount:obj.missedIngredientCount,
	// missedIngredients:obj.missedIngredients,
	// usedIngredients:obj.usedIngredients
	// }));

	data = data.map((obj)=> ({
		id:obj.id,
		title:obj.title,
		image:obj.image,
		missingIngredients:obj.missedIngredients.map((missingIngredient)=>(missingIngredient.name)),
		}));

	// console.log(data);
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
