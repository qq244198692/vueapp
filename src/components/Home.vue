<template>
	<div class="home">
		<top></top>
		<tab></tab>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios'
	import top from './Head.vue'
	import tab from './Tab'
	
	export default{
		data(){
			return{
				url:'https://www.vue-js.com/',
				tab:'all'
			}
		},
		components:{top,tab},
		created(){
			this.$store.state.tab='home';
			this.$store.commit('changeshow',true)
		},
		methods:{
		}
	}
</script>