<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted(){
    var time;
    time= setInterval(() => {this.frame(time)}, 2000);
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href =   JSON.parse(localStorage.getItem("getLogo")).ico;
    document.getElementsByTagName('head')[0].appendChild(link);
  },
  methods:{
    frame(time){
      if(!localStorage.getItem("getLogo")){
        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href =   JSON.parse(localStorage.getItem("getLogo")).ico;
        document.getElementsByTagName('head')[0].appendChild(link);
      }else{
        clearInterval(time)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
