<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>
    {{text}}
    </h1>
    <video id="video" ref="cameraElement" playsinline autoplay></video>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: function () {
    return {
      text: ''
    }
  },
  mounted: function () {
    if (navigator.mediaDevices.getSupportedConstraints().facingMode) {
      // alert('Supported!')
    } else {
      // alert('Not supported!')
    }
    console.log(navigator.mediaDevices.getSupportedConstraints().getSupportedConstraints)
    const constraints = {
      audio: false,
      video: { facingMode: { exact: (/Mobi/.test(navigator.userAgent)) ? 'environment' : undefined } }
    }
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      console.log(stream)
      //       alert('WOW')
      //    this.text = stream
      this.$refs.cameraElement.srcObject = stream
    }).then((devices) => {
      alert(devices)
      this.text = devices
      console.log(devices)
    }).catch((error) => {
      alert(error)
      //       this.text = error
      console.error(error)
    })
    //     this.text = 'hi'

    // CameraPreview.startCamera(options)
    // })
  }
}
</script>
