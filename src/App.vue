<template>
  <div id="app">
    <router-view/>
    <loading v-show="showLoading"></loading>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "@/components/loading";
export default {
  name: 'App',
  components:{
    Loading
  },
  computed: {
		...mapGetters(["showLoading"])
	},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height:100%;
  width:100%;
}
html{
  margin:0;
  padding:0;
  height:100%;
  width:100%;
}
body{
  margin: 0;
  height:100%;
  width:100%;
}

</style>
