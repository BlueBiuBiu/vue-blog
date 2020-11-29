<template>
  <div id="app">
    <video autoplay loop muted>
      <source src="./assets/img/videobgc.mp4"> 
    </video>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  
  }
}
</script>

<style>
  video {
    position: fixed;  
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    z-index:-9;
  }
  @import "./assets/css/base.css"
</style>
