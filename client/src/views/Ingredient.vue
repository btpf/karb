<template>
  <div id="flexContent">
    <label id="ingredientLabel" for="new-ingredient"
      >Insert or scan the ingredients In Your House</label
    >
    <div v-show="camera" id="video-container">
      <video id="video" ref="cameraElement" playsinline autoplay></video>
      <button @click="scanImage" id="scanButton">
        {{ buttonText }}
      </button>
    </div>
    <template v-if="!camera">
      <div id="optionContainer">
        <h1>Select Option</h1>
        <h2
          v-for="(ingredient, index) in ingredients"
          @click="selectIngredient(ingredient)"
          v-bind:style="{ cursor: 'pointer' }"
          :key="index"
        >
          {{ ingredient }}
        </h2>
        <button id="retry" @click="resetScanner">Retry</button>
      </div>
    </template>
    <form id="flexForm" v-on:submit.prevent="addNewIngredient">
      <input id="new-ingredient" placeholder="E.g. Apple" v-model="text" />
      <button id="addButton">Add</button>
    </form>
  </div>
</template>

<script>
const axios = require("axios");
// @ is an alias to /src

export default {
  name: "Home",
  methods: {
    addNewIngredient: function () {
      console.log("Called");
      axios
        .get(process.env.VUE_APP_BASE_URL + "/addIngredient/" + this.text)
        .then((data) => {
          this.text = "";
        })
        .catch((err) => console.error(err));
    },
    selectIngredient: function (ingredientText) {
      this.text = ingredientText;
      this.addNewIngredient();
      this.resetScanner();
    },
    resetScanner: function () {
      this.camera = true;
      this.ingredients = [];
      this.buttonText = "Scan Image";
    },
    scanImage: function () {
      if (this.buttonText === "Scanning...") {
        return null;
      }
      this.buttonText = "Scanning...";

      const imageCapture = new ImageCapture(
        this.$refs.cameraElement.srcObject.getTracks()[0]
      );
      imageCapture.takePhoto().then((image) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          axios
            .post(process.env.VUE_APP_BASE_URL + "/postimage/", {
              image: event.target.result,
            })
            .then((response) => {
              this.camera = false;
              this.ingredients = response.data;
            })
            .catch((error) => {
              console.log(error);
              this.ingredients = ["Error Please Retry"];
            });
        };
        reader.readAsDataURL(image);
      });
    },
  },
  beforeDestroy: function () {
    this.$refs.cameraElement.srcObject.getTracks()[0].stop();
  },
  mounted: function () {
    const constraints = {
      audio: false,
      video: {
        facingMode: {
          exact: /Mobi/.test(navigator.userAgent) ? "environment" : undefined,
        },
      },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        this.$refs.cameraElement.srcObject = stream;
      })
      .then()
      .catch((error) => {
        console.error(error);
      });
  },
  data: function () {
    return {
      text: "",
      buttonText: "Scan Image",
      camera: true,
      optionSelect: false,
      ingredients: [],
    };
  },
};
</script>

<style scoped>
#ingredientLabel {
  font-size: 25px;
  color: black;
  font-weight: bold;
}
#retry {
  border: unset;
  background-color: #57c3ff;
  width: 180px;
  height: 45px;
  font-size: 24px;
  font-weight: bold;
}
#add-ingredients {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
}
#scanButton {
  font-size: 24px;
  border-width: 2px;
  background: rgba(250, 128, 114, 0.8);
  border-radius: 54px;
  border: none;
  padding: 10px 30px;
  color: white;
  font-weight: bold;
  transform: translate(0, -60px);
  cursor: pointer;
}
#video {
  width: 100%;
}
#middleSpacer {
  flex-grow: 1;
}
#addButton {
  width: 255px;
  height: 75px;
  background-color: #00c64f;
  border: none;
  color: whitesmoke;
  font-size: 24px;
  font-weight: bold;
  margin-top: 15px;
}
#new-ingredient {
  font-family: "Roboto", sans-serif;
  color: #333;
  font-size: 1.2rem;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  border: none;
  border-bottom: 4px solid black;
  background-color: rgb(255, 255, 255);
  width: 80%;
  display: block;
  transition: all 0.3s;
  min-width: 250px;
  max-width: 500px;
}
#flexForm {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  justify-content: space-evenly;
  height: fit-content;
  align-items: center;
}
#flexContent {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  justify-content: space-evenly;
  height: fit-content;
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
