<template>
  <router-link id="navigate" v-bind:to="url">
    <div id="navButton" class="button">
      <div id="buttonText">{{ msg }}</div>
    </div>
  </router-link>
</template>
<script>

export default {
  name: 'navigateButton',
  props: {
    msg: String,
    url: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#navButton {
  display: flex;
  justify-content: center;
  background-color: #ff0000;
  font-size: 24px;
  width: 256px;
  height: 64px;
}
#navigate {
  text-decoration: none;
}
#buttonText {
  align-self: center;
  color: whitesmoke;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
}
</style>
