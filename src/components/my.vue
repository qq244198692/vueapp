<template>
	<div class="my">
		<div class="my-content">
			<p class="my-con-top">个人中心</p>
			<div class="my-con-img">
				<img v-bind:src='data.avatar_url'>
				<input type="hidden" id="accesstoken" v-bind:value="accesstoken">
			</div>
			<div class="my-con-create">
				<p class="my-con-cname">{{data.loginname}}</p>
				<p class="my-con-ctime">
					<span class="">注册时间： {{getInitDate(data.create_at)}}</span>
					<span class="">积分： {{data.score}}</span>
				</p>
				
			</div>
			<div class="my-theme">
				<div class="my-theme-item">
					<div class="my-theme-item-title">
						<span>最近主题 </span>
					</div>
					<div class="my-theme-item-con">
						<ul>
							<li v-for='item in data.recent_topics'>
								<img v-bind:src='item.author.avatar_url'>
								<div class="item-con">
									<p class="item-con-title">
									<router-link :to="{path:'/content',query:{id:item.id}}">
										{{item.title}}
									</router-link>
									</p>
									<p class="item-con-last-reply">{{getInitDate(item.last_reply_at)}}</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="my-theme-item">
					<div class="my-theme-item-title">
						<span>互动主题 </span>
					</div>
					<div class="my-theme-item-con">
						<ul>
							<li v-for='item in data.recent_replies'>
								<img v-bind:src='item.author.avatar_url'>
								<div class="item-con">
									<p class="item-con-title">
									<router-link :to="{path:'/content',query:{id:item.id}}">
										{{item.title}}
									</router-link>
									</p>
									<p class="item-con-last-reply">{{getInitDate(item.last_reply_at)}}</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="my-theme-item">
					<div class="my-theme-item-title">
						<span>收藏主题 </span>
					</div>
					<div class="my-theme-item-con">
						<ul>
							<li v-for='item in data.collect_topics'>
								<img v-bind:src='item.author.avatar_url'>
								<div class="item-con">
									<p class="item-con-title">
									<router-link :to="{path:'/content',query:{id:item.id}}">
										{{item.title}}
									</router-link>
									</p>
									<p class="item-con-last-reply">{{getInitDate(item.last_reply_at)}}</p>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<input type="button" name="" value="退  出" class="btn" v-on:click='logout'>
			</div>
			
		</div>

		<div class="my-login" v-show="!logined">
			<div class='my-login-con'>
				<inputtext name='token' msg="Access Token" v-bind:errmsg='errmsg' v-on:sendVal='getVal'></inputtext>
				<input type="button" name="" class="btn" value="登入" v-on:click='login'>
				<p style='width:100%;text-align:center;font-size:12px;color:#2f865f;'>9b7ddff5-fec0-49d0-b53e-58d9533deba0</p>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import inputtext from './inputtext'
	import timeago from 'timeago.js';
	import axios from 'axios';
	export default{
		data(){
			return{
				url:'https://www.vue-js.com/api/v1/',
				logined:false,
				val:'',
				errmsg:'',
				accesstoken:'',
				data:{}
			}
		},
		components:{inputtext},
		created(){
			this.$store.state.tab='self';
			this.$store.state.footshow=true;
			if(localStorage.getItem('userid')){
				this.logined=true;
				this.getuser(localStorage.getItem('username'))
			}
			if(localStorage.getItem('accesstoken')){
				this.accesstoken=localStorage.getItem('accesstoken')
			}
			var that=this;
			//that.$store.state.count=2
			if(this.logined){
				axios.get(this.url+'message/count?accesstoken='+this.accesstoken).then(function(res){
					
					that.$store.state.count=res.data.data;
				})
			}
			
		},
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
					that.logined=true;
					that.getuser(response.data.loginname);
				}).catch(function(err){
					console.log(err)
					that.errmsg='信息填写有误'
				})
			},
			getVal:function(val){
				this.val=val;
			},
			getuser:function(loginname){
				let that=this;
				axios.get('https://www.vue-js.com/api/v1/user/'+loginname).then(function(res){
					that.data=res.data.data;
					res.data.data.collect_topics.map(function(v,i){
						that.$store.state.collectid.push(v.id);
						localStorage.setItem('collectid',that.$store.state.collectid);
					})
				})
			},
			getInitDate:function(date){
				var t=new Date(date);
				var time=new timeago();
				return time.format(t,'zh_CN');
			},
			logout:function(){
				this.$store.state.userid='';
				this.$store.state.username='';
				this.$store.state.accesstoken='';
				localStorage.removeItem('userid');
				localStorage.removeItem('username');
				localStorage.removeItem('accesstoken');
				this.logined=false;
			}
		}
	}
</script>
<style type="text/css">
	
</style>