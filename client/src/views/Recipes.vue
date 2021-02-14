<template>
  <div class="home">
    <div id="flexRecipes">
      <template v-for="recipe in recipes">
        <RecipePreview
          v-bind:key="recipe.id"
          :imageLink="recipe.image"
          :name="recipe.title"
          :urlObj="{
            name: 'recipeInstructions',
            params: {
              recipeId: recipe.id,
              title: recipe.title,
              image: recipe.image,
              missingIngredients: recipe.missingIngredients,
            },
          }"
        />
      </template>
    </div>
  </div>
</template>

<script>
import RecipePreview from '@/components/RecipePreview.vue'
const axios = require('axios')
// @ is an alias to /src

export default {
  name: 'Home',
  mounted: function () {
    this.populateData()
    console.log('mounted: got here')
  },
  data: function () {
    return {
      recipes: []
    }
  },
  methods: {
    populateData: function () {
      axios
        .get(process.env.VUE_APP_BASE_URL + '/findrecipe/')
        .then((data) => {
          this.recipes = data.data
        })
        .catch((err) => console.error(err))
    }
  },
  components: {
    RecipePreview
  }
}
</script>

<style>
#flexRecipes {
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  align-content: space-around;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
