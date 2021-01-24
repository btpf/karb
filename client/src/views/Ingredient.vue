<template>
  <form id="flexForm" v-on:submit.prevent="addNewIngredient">
    <label id="ingredientLabel" for="new-ingredient">Insert the ingredients In Your House</label>
    <input
      id="new-ingredient"
      placeholder="E.g. Apple"
      v-model="text"
    >
    <button id="addButton">Add</button>
  </form>
  <!-- <ul>
    <li
      is="ingredient-item"
      v-for="(ingredient, index) in ingredients"
      v-bind:key="ingredient.id"
      v-bind:title="ingredient.title"
      v-on:remove="ingredients.splice(index, 1)"
    ></li>
  </ul> -->
</template>

<script>
const axios = require('axios')
// @ is an alias to /src

export default {
  name: 'Home',
  methods: {
    addNewIngredient: function () {
      axios
        .get('http://localhost:3001/addIngredient/' + this.text)
        .then((data) => {
          this.text = ''
        })
        .catch((err) => console.error(err))
    }
  },
  data: function () {
    return {
      text: ''
    }
  }
}
</script>

<style>
#ingredientLabel{
    font-size: 25px;
    color:black;
    font-weight: bold;
}
#add-ingredients{
  display:flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;

}
#addButton{
    width:255px;
    height:75px;
    background-color:#00C64F;
    border:none;
    color:whitesmoke;
    font-size: 24px;
    font-weight: bold;
}
#new-ingredient{
  font-family: 'Roboto', sans-serif;
  color: #333;
  font-size: 1.2rem;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  border: none;
  border-bottom: 4px solid black;
  background-color: rgb(255, 255, 255);
  width: 80%;
  display: block;
  /* border-bottom: 0.3rem solid transparent; */
  transition: all 0.3s;
}
#flexForm{
    display:flex;
    flex-direction: column;
    margin-top:50px;
    justify-content: space-evenly;
    height: calc(100vh - 120px);
    align-items: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
