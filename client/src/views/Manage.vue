<template>
  <div class="home">
    <h2 id="ManagerLabel" for="ingredient">Delete ingredient</h2>

    <div id="flexManage">
      <div id="row" v-for="(ingredient, i) in ingredients" :key="i">
        <h3 id="item">{{ ingredient }}</h3>

        <button class="deleteButton" v-on:click="deleteItems(ingredient)">
          <div id="circle">X</div>
        </button>
      </div>

      <!-- <div id="row">
        <h3 id="item">item 2</h3>

        <div id="circle">X</div>

      </div> -->
    </div>
  </div>
</template>
<script>
const axios = require('axios')

export default {
  name: 'Home',
  data: function () {
    return {
      ingredients: []
    }
  },
  mounted: function () {
    axios.get(process.env.VUE_APP_BASE_URL + '/listIngredients').then((response) => {
      console.log(response)
      this.ingredients = response.data
    })
  },
  methods: {
    deleteItems: function (ingredientName) {
      axios
        .delete(process.env.VUE_APP_BASE_URL + '/removeIngredient/' + ingredientName)
        .then((response) => {
          this.ingredients = this.ingredients.filter(
            (ingredient) => ingredient !== ingredientName
          )
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
#flexManage {
  display: flex;
  flex-direction: column;
}
#row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 15px;
  max-width: 400px;
  align-self: center;
  width: 100%;
}

#item {
  margin-left: 15px;
}

.deleteButton {
  border: 0;
  background-color: unset;
}

#circle {
  display: flex;
  height: 50px;
  width: 50px;
  background-color: red;
  font-size: 45px;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  margin-right: 15px;
  cursor: pointer;
}
</style>
