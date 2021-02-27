# KARB
(K)arolay Sanchez, (A)rmaan Singh, (R)ichard Tsang, (B)ret Papkoff. 

![image-20210215060004353](https://user-images.githubusercontent.com/61168382/107945430-9b1ddf80-6f5d-11eb-8a4e-4661a4e301c0.png)

This app was created as a part of the 2021 CUNY Hackathon.

KARB is a concept recipe application that allows users to scan in ingredients around your house and find recipes that you can cook with what's available. Designed to assist in a time of COVID-19 where many rely on delivery apps and take out, KARB in it's complete form would ideally assist those who are looking to learn how to cook.

It features Google Cloud Vision's OCR API to recognize food labels with your camera and Spoonacular API to find recipes based on ingredients. 

The database, server, and client are also hosted on Heroku, so feel free to try the app in the releases tab, evaluate the live demo page, or run the following commands to try it locally.

**Live Demo**: https://karb-client.herokuapp.com/

```bash
cd client
npm i
npm run build
npm start
```





### Demo Video

TBA









KARB has three components. The Client, Server, and Database.

### Application Architecture

![image-20210215071420637](https://user-images.githubusercontent.com/61168382/107945532-c7d1f700-6f5d-11eb-90eb-d5f97a6c968b.png)

#### KARB Client

KARB Client is written in ES6 and utilizes Vue for front end components.

KARB initially utilized Cordova but later switched to Capacitor, a runtime which allows exporting a single web application codebase to mobile and desktop platforms with a single command.

The decision to switch from Cordova to Capacitor was due to difficulties building the application, and the inability to use the more modern getUserMedia() for the camera functionality on Cordova's mobile exports.

The client consist of 5 pages.

**Home screen** - Allows the user to select what they want to do

**Add Ingredients** - To allow users to scan in ingredients or manually type them in

**Manage Ingredients** - Necessary for the deletion of ingredients

**Show Recipes** - Shows images of different dishes that you can cook with the ingredients you have

**Ingredient Page** - Gives the instructions on how to cook a given dish



*Showcase of Pages*

![Final App Pages](https://user-images.githubusercontent.com/61168382/107945709-05368480-6f5e-11eb-83c0-619b5bf1eba1.png)

*Screenshot of Android Emulator Running App*

<img src="https://user-images.githubusercontent.com/61168382/107945673-f8b22c00-6f5d-11eb-9ce4-68380ab98697.png" alt="Emulator" style="zoom:50%;" />



#### **KARB Server**

KARB Server utilizes express for the REST API used by the client. It contains the following routes:



**GET	** `/addIngredient/:ingredientName`

This route will take the `ingredientName` and add it to the Postgres Database.



**POST	** `/postimage`

This route will receive a JSON body of a Base64 encoded image. It will then pass this image into the Google Vision API where the OCR takes place and a string containing all the detected text in the image returned. The text is then passed into the Spoonacular API which will extract ingredient names from a body of text.  Finally, once possible ingredients have been recognized, the matches are returned to the user in the form of an array, where they can select which is correct.



**DELETE**	 `/removeIngredient/:ingredientName`

This route will take the `ingredientName` and delete it from the database.



**GET**	 `/listIngredients`

This route will return a list of all the ingredients entered into the database. This is called when on the manage page so the user can know which items they wish to delete.



**GET**	 `/findrecipe`

This route will retrieve all the ingredients entered into the Postgres Database and contact Spoonacular's API with them. It will then return a list of dishes that the user could cook which contain similar or identical ingredients.



**GET	** `/getInstructions/:recipeId`

This route will contact Spoonacular with a given recipe ID in order to receive back a list of instructions and possible missing ingredients for a selected dish.



The server also requires a `.env` file containing the secrets necessary to run.

```
DB_USERNAME=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=
SPOONACULAR_API_KEY=
GOOGLE_API_KEY=
```





#### Technologies Used
1. **Spoonacular API** - provided with recipes once ingredients and parameters were
added
2. **Google Vision API**- analyzes image and extracts text
3. **Vue.js** - in order to make front end work easier
4. **Node.js** - language in which this was coded
5. **VSCode** - main coding platform
6. **PostgreSQL** - database for the project
7. **ngrok** - used for port forwarding
8. **Insomina** - Rest API tester
9. **Axios** - to make request to the server
10. **Express JS** - Processing Incoming requests
11. **Apache Cordova** - make web apps run as mobile apps combined with vue.
12. **Capacitor** - Later used in place of Cordova
13. **Git** - for version control
14. **Heroku** - Used for hosting the server and database

 *Screenshot of planning sheet (Path to learn the technologies necessary for the app's creation)*

![](https://user-images.githubusercontent.com/61168382/107945636-eafca680-6f5d-11eb-9fe3-fc42ed162fba.png)

