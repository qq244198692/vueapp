<template>
	<div class="header clear">
		<div class='logo fl'>
			<img src="../assets/logo.png">
		</div>
		<div class='right-icon fr' v-on:click='totalk'>讨论区</div>
		<div class="head-con">
			vue
		</div>
		
	</div>
</template>
<script type="text/javascript">
	import Atalk from './atalk'
	export default{
		data(){
			return{
				showtalk:false
			}
		},
		components:{Atalk},
		methods:{
			totalk:function(){
				this.$router.push('atalk');
			}
		}
	}
</script>