<template>
  <div id="flexContent">
    <h1>{{ title }}</h1>
    <img id="imageBox" v-bind:src="image" alt="test" />
    <div id="missingContainer">
      <div id="warningBox">
        Warning: You are missing the following ingredients
      </div>
      <div id="missingBox">
        <template
          v-for="(ingredient, index) in missingIngredients.includes('/')
            ? missingIngredients.split('/')
            : missingIngredients"
        >
          <div :key="index">{{ ingredient }}</div>
        </template>
      </div>
    </div>
    <div id="stepContainer">
      <template v-if="instructionData">
        <template v-for="step in instructionData[0].steps">
          <h2 :key="'Step' + step.number">Step {{ step.number }}</h2>
          <div :key="'instruction' + step.number">{{ step.step }}</div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
// @ is an alias to /src

export default {
  name: 'recipeInstructions',
  props: ['recipeId', 'title', 'image', 'missingIngredients'],
  data: function () {
    return {
      instructionData: false
    }
  },
  mounted: function () {
    axios
      .get(process.env.VUE_APP_BASE_URL + '/getInstructions/' + this.recipeId)
      .then((data) => {
        this.instructionData = data.data
      })
      .catch((err) => console.error(err))
  }
}
</script>

<style scoped>
#flexContent {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  height: fit-content;
  align-items: center;
}

#stepContainer {
  width: 75%;
  max-width: 750px;
}
#missingContainer {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 350px;
  margin-top: 10px;
}
#warningBox {
  display: flex;
  align-content: center;
  height: 50px;
  width: 350px;
  background: #ff0000;
  border: 1px solid #000000;
  box-sizing: border-box;
  color: white;
  align-items: center;
  font-weight: bold;
}
#missingBox {
  padding-top: 15px;
  padding-bottom: 15px;
  height: auto;
  width: 350px;
  background: #fff4f4;
  border: 1px solid #f21414;
  box-sizing: border-box;
}

#imageBox {
  height: 75%;
  width: 75%;
  max-height: 750px;
  max-width: 750px;
}
</style>
