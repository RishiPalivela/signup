<template>
  <div id="app">
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import '@progress/kendo-theme-bootstrap/dist/all.css';

export default {
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
