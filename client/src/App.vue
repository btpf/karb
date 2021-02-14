<template>
  <div id="app">
    <div id="nav">
      <router-link id="homeButton" to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
        >
          <title>Home</title>
          <path
            d="M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z"
          />
          <path
            d="M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z"
          /></svg
      ></router-link>
    </div>
    <div id="centerFlex">
      <div id="logo">KARB</div>
    </div>
    <router-view />
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

#centerFlex {
  background-color: #ec2727;
  height: 100px;
  display: flex;
  justify-content: center;
}
body {
  margin-top: 0px;
  margin-left: 0px;
  margin-right: 0px;
}

#logo {
  font-size: 64px;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  font-style: italic;
  align-self: center;
  font-weight: 700;
  color: whitesmoke;
}
#nav {
  /* padding: 30px; */
  display: flex;
  justify-content: flex-start;
  position: absolute;
  width: 100%;
  height: 100px;
  align-content: center;
}

#homeButton {
  justify-content: flex-start;
  align-self: center;
  background-color: #ec2727;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 50px;
  width: 50px;
  fill: white;
  margin-left: 20px;
  display: flex;
  justify-content: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.ionicon {
  width: 40px;
  color: white;
}
</style>
