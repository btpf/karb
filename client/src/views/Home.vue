<template>
  <div class="home">
    <div id="flexContent">
    <NavigateButton msg="Add Ingredients" url="/about"/>
    <NavigateButton msg="Show Recipes" url="/recipes"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavigateButton from '@/components/NavigateButton.vue'

export default {
  name: 'Home',
  components: {
    NavigateButton
  }
}
</script>

<style>
#flexContent{
  display:flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 120px);

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
