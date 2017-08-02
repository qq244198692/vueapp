<template>
	<div class="" >
		<div style="position:relative;">
		<div class="vue-input-text" v-on:click='getfocus'>{{msg}}</div>
		
		<input type="text" class="vue-input" v-bind:name="name" v-on:input="changeval" v-on:focus='tofocus' v-on:blur='leavefocus'>
		</div>
		<p class="err-msg" v-show='errmsg'>{{errmsg}}</p>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			ishow:false
		}
	},
	props:['msg','name','errmsg'],
	methods:{
		getfocus:function(e){
			var tar=e.target;
			$(tar).next().focus();
		},
		changeval:function(e){
			var tar=e.target;
			if(tar.value!=''){
				this.ishow=false;
			}else{
				this.ishow=true;
			}

			this.$emit('sendVal',tar.value);
		},
		tofocus:function(e){
			var tar=e.target;
			$(tar).prev().css({
				'transform':'translateY(-200%)',
				'transition':'transform 0.3s'
			})
		},
		leavefocus:function(e){
			var tar=e.target;
			if(!tar.value){
				$(tar).prev().css({
					'transform':'translateY(0%)'
				})
			}
			
		}
	}
}
</script>
<style>
	
</style>