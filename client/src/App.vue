<template>
  <div id="app">
    <div id="nav">

      <router-link id="hamburger" to="/"><svg id="svghamburger" viewBox="0 0 100 80" width="40" height="40">
  <rect width="100" height="20"></rect>
  <rect y="30" width="100" height="20"></rect>
  <rect y="60" width="100" height="20"></rect>
</svg></router-link>
    </div>
    <div id="centerFlex">
    <div id="logo">KRAB</div>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#centerFlex{
  background-color:#EC2727;
  height: 100px;
  display:flex;
    justify-content: center;
}
body{
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
}

#logo{
  font-size: 64px;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  font-style:italic;
  align-self: center;
  font-weight: 700;
  color:whitesmoke;
}
#nav {
  /* padding: 30px; */
  display:flex;
  justify-content: flex-start;
  position: absolute;
  width:100%;
  height: 100px;
  align-content: center;
}

#hamburger{
justify-content: flex-start;
align-self: center;
background-color: #EC2727;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
height:50px;
width: 50px;
fill: white;
margin-left: 20px;
display:flex;
justify-content: center;
}

#svghamburger{
align-self: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
