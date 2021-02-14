<template>
  <router-link id="recipeContainer" v-bind:to="urlObj">
    <div id="recipeItem">
      <img id="imageBox" v-bind:src="imageLink" alt="test" />
      <div id="recipeLabel">{{ name }}</div>
    </div>
  </router-link>
</template>
<script>

export default {
  name: "RecipePreview",
  props: {
    name: String,
    imageLink: String,
    urlObj: Object,
  },
  methods: {
    truncate: function (input) {
      if (input.length > 25) {
        return input.substring(0, 22) + "...";
      }
      return input;
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#recipeContainer {
  display: flex;
  flex-direction: row;
  text-decoration: none;
  margin-top: 20px;
}
#recipeItem {
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 200px;
  /* background-color: aquamarine; */
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid #ffa620;
}
#imageBox {
  background-color: white;
  width: 150px;
  height: 150px;
}
#recipeLabel {
  text-decoration: none;
  color: black;
  font-size: 15px;
  font-weight: bold;
}
</style>
