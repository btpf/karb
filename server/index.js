const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3001;
const querystring = require("querystring");
const { Pool, Client } = require("pg");



if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

if(process.env.DATABASE_URL){
let db = process.env.DATABASE_URL

let reg = /postgres:\/\/(?<username>[A-Za-z]+):(?<password>[A-Za-z0-9]+)@(?<host>[A-Za-z0-9\-.]+):(?<port>\d+)\/(?<database>[A-Za-z0-9]+)/

var [,username, password, host, dbport, database] = reg.exec(db)
}

const DB_USERNAME = username || process.env.DB_USERNAME
const DB_HOST = host || process.env.DB_HOST
const DB_NAME = database || process.env.DB_NAME
const DB_PASSWORD = password || process.env.DB_PASSWORD
const DB_PORT = dbport || process.env.DB_PORT

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

var spoonacularAPIKey = SPOONACULAR_API_KEY;
const googlekey = GOOGLE_API_KEY;


// pools will use environment variables
// for connection information
const pool = new Pool({
  user: DB_USERNAME,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

const cors = require("cors");

const corsOptions = {
  origin: [
  "http://localhost:8080", // Vue debug mode
  "http://localhost:5000", // Vue production mode
  "http://localhost" // Android
],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "8mb" }));
app.use(bodyParser.raw());


app.get("/", (req, res) => {
  res.send("example");
});

app.get("/addIngredient/:ingredientName", async (req, res) => {
  const ingredientName = req.params.ingredientName;
  const {
    rows,
  } = await pool.query("INSERT INTO ingredient(ingredientName) VALUES($1)", [
    ingredientName,
  ]);
  res.send(rows[0]);
});

app.delete('/removeIngredient/:ingredientName', async (req, res) => {
  const ingredientName = req.params.ingredientName
  const { rows } = await pool.query("Delete From ingredient where ingredientName = ($1)", [ingredientName])
  res.send(rows[0])
});

app.post("/postimage", (req, res) => {
  let base64Upload = req.body.image
  base64Upload = base64Upload.replace("data:image/png;base64,", ""); // Desktop
  base64Upload = base64Upload.replace("data:image/jpeg;base64,", ""); // Mobile
  let config = {
    params: {
      key: googlekey,
    },
  };
  let data = {
    requests: [
      {
        image: {
          content: base64Upload,
        },
        features: [
          {
            type: "TEXT_DETECTION",
          },
        ],
      },
    ],
  };
  axios.post('https://vision.googleapis.com/v1/images:annotate', data, config)
    .then(ress => {
      axios
        .post(
          "https://api.spoonacular.com/food/detect",
          querystring.stringify({
            text: ress.data.responses[0].fullTextAnnotation.text,
          }),
          {
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            params: { apiKey: spoonacularAPIKey },
          }
        )
        .then((spoonacularResponse) => {
          let response = spoonacularResponse.data.annotations;
          response = response.map((item) => {
            return item.annotation
          })
          res.send(response);
        })
        .catch((e) => res.send(e));

    }).catch(err => {
      console.log(err)
      res.send([""])
    })

});

app.delete("/removeIngredient/:ingredientName", async (req, res) => {
  const ingredientName = req.params.ingredientName;
  const {
    rows,
  } = await pool.query(
    "Delete From ingredient where ingredientName = VALUES($1)",
    [ingredientName]
  );
  res.send(rows[0]);
});

app.get("/listIngredients", async (req, res) => {
  const { rows } = await pool.query("SELECT ingredientName FROM ingredient");
  let ingredientList = [];
  rows.forEach((obj) => ingredientList.push(obj.ingredientname));
  res.send(ingredientList);
});

app.get("/findrecipe", async (req, res) => {
  const { rows } = await pool.query("SELECT ingredientName FROM ingredient");
  let ingredientList = [];
  rows.forEach((obj) => ingredientList.push(obj.ingredientname));
  axios
    .get("https://api.spoonacular.com/recipes/findByIngredients", {
      params: {
        apiKey: spoonacularAPIKey,
        ingredients: ingredientList.join(),
        number: "10",
        limitLicense: "true",
        ranking: "1",
        ignorePantry: "true",
      },
      header: {
        "Content-Type": "application/json",
      },
    })
    .then((ress) => {
      console.log(ress.data);
      res.send(filterdata(ress.data));
    })
    .catch((err) => console.error(err));
});

app.get("/getInstructions/:recipeId", async (req, res) => {
  axios
    .get(
      "https://api.spoonacular.com/recipes/" +
      req.params.recipeId +
      "/analyzedInstructions",
      {
        params: {
          apiKey: spoonacularAPIKey,
        },
        header: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((instructionData) => {
      res.send(instructionData.data);
    });

});

function filterdata(data) {

  data = data.map((obj) => ({
    id: obj.id,
    title: obj.title,
    image: obj.image,
    missingIngredients: obj.missedIngredients.map(
      (missingIngredient) => missingIngredient.name
    ),
  }));

  return data;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


app.listen(3000);
