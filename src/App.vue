<template>
  <div id="app">
    <router-view></router-view>
    <foot v-show='$store.state.footshow'></foot>
  </div>
</template>

<script>
import './assets/js/jquery-1.7.2.js';
import foot from './components/Footer';

export default {
  name: 'app',
  components:{foot},
  data(){
  	return{
  		footshow:''
  	}
  }
}
</script>

<style>
@import './assets/css/app.css';
</style>
