<template>
	<div class="my-login">
		<p class='' style="padding:20px;position:relative;"><span class="con-back green-icon" v-on:click='goback'></span></p>
			<div class='my-login-con'>
				<inputtext name='token' msg="Access Token" v-bind:errmsg='errmsg' v-on:sendVal='getVal'></inputtext>
				<input type="button" name="" class="btn" value="登入" v-on:click='login'>
				<p style='width:100%;text-align:center;font-size:12px;color:#2f865f;'>9b7ddff5-fec0-49d0-b53e-58d9533deba0</p>
			</div>
		</div>
</template>
<script>
	import inputtext from './inputtext'
	import axios from 'axios';
	export default{
		data(){
			return{
				url:'https://www.vue-js.com/api/v1/',
				val:'',
				errmsg:'',
				accesstoken:'',
				data:{}
			}
		},
		components:{inputtext},
		methods:{
			login:function(){
				/*if(!this.val){
					this.errmsg='信息不能为空'
					return;
				}*/
				let that=this;
				axios.post('https://www.vue-js.com/api/v1/accesstoken',{accesstoken:that.val}).then(function(response){
					console.log(JSON.parse(response.config.data))
					that.errmsg='';
					that.$store.state.accesstoken=JSON.parse(response.config.data).accesstoken;
					that.$store.state.userid=response.data.id;
					that.$store.state.username=response.data.loginname;
					that.$store.state.avatar_url=response.data.avatar_url
					that.accesstoken=JSON.parse(response.config.data).accesstoken;
					localStorage.setItem('accesstoken',JSON.parse(response.config.data).accesstoken);
					localStorage.setItem('userid',response.data.id);
					localStorage.setItem('username',response.data.loginname);
					localStorage.setItem('avatar_url',response.data.avatar_url);
					
					that.$emit('success',{userid:that.$store.state.userid});
				}).catch(function(err){
					console.log(err)
					that.errmsg='信息填写有误'
				})
			},
			getVal:function(val){
				this.val=val;
			},
			goback:function(){
				this.$emit('showfalse');
			}
		}
	}	
</script>