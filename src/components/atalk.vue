<template>
	<div class="atalk">
		<p class="my-con-top">
			讨论区
			<i class="back con-back" v-on:click='back'></i>
			<i class="group" v-on:click='showgroup'></i>
		</p>
		<div class='atalk-container'>
			<p class="online">在线人数：{{onlineCount}}</p>
			<div class="atalk-con">
				
			</div>
		</div>
		<div class="atalk-bottom">
			<div class="atalk-bot-con" v-if='userid'>
				<div class="take-con">
					<div class="vue-input-text1" v-on:click='getfocus' v-show='!content'>输入你的信息</div>
					<div class="take-txt" contenteditable=true v-on:input='takeMSG'></div>
				</div>
				<input type="button" value="发送" class="sendbtn" v-on:click='sendMSG' >
			</div>
			<div class="atalk-login" v-else>
				<input type="button" value="登录后,加入讨论" class="atalk-login-btn" v-on:click='login'>
			</div>
		</div>

		<login v-if='showlogin' v-on:showfalse='changeshow' v-on:success='loginsuc'><!-- 登入 --></login>
		
		<!-- 用户列表 -->
		
		<div class="userlist" v-show='show' v-on:click="show=false">
			<transition name='fade'>
			<div class="usermenu" v-show='show' v-on:click.stop=''>
				<p class="usermenu-title">讨论组</p>
				<ul class="usermenu-ul">
					<li class="user-item" v-for="item,key in onlineUsers">
						<img :src="onlineusersimg[key]"> 
						<p class="user-item-p">{{onlineUsers[key]}}</p>
					</li>
				</ul>
			</div>
			</transition>
		</div>
		
		<!-- 用户列表end -->
	</div>
</template>
<script type="text/javascript">
import login from './login'
import itemleft from './itemleft'
import axios from 'axios';
export default{
	data(){
		return{
			userid:'',
			username:'',
			avatar_url:'',
			content:'',
			showlogin:false,
			show:false,
			socket:null,
			val:'',
			onlineUsers:{},    //在线用户
			onlineCount:0,     //在线人数
			onlineusersimg:{}
		
		}
	},
	components:{login,itemleft},
	created(){
		this.$store.state.footshow=false;
		this.userid=localStorage.getItem('userid');
		this.username=localStorage.getItem('username');
		this.avatar_url=localStorage.getItem('avatar_url');
		this.socket=io.connect('ws://192.168.10.200:3000');//连接讨论区服务
		this.socketinit()//获取在线用户
		if(this.userid){
			this.socketio();
		}
		var that=this;
		this.socket.on('logout',function(data){
			that.onlineUsers=data.onlineUsers;
			that.onlineusersimg=data.onlineUsersimg;
			that.onlineCount=data.onlineCount;
			$('.atalk-con').append('<p class="welcome-p">'+data.user.username+' 退出</p>')
		})
		
		this.socket.on('msg',function(data){
			that.getmsg(data)//获得消息
		})
	},
	methods:{
		back:function(){
			this.socket.disconnect()
			this.$router.push({path:'/home'});
		},
		login:function(){
			this.showlogin=true;
		},
		loginsuc:function(data){
			this.showlogin=false;
			this.userid=data.userid;
			this.socketio();
		},
		getfocus:function(e){//伪input获取焦点
			var tar=e.target;
			$(tar).next().focus();
		},
		takeMSG:function(e){
			var tar=e.target;
			this.content=tar.innerText;
		},
		showgroup:function(){//查看组员
			this.show=true;
		},
		choose:function(){

		},
		socketinit:function(){
			var that=this;
			//this.socket.emit('init')
			this.socket.on('init',function(data){
				that.onlineUsers=data.onlineUsers;
				that.onlineusersimg=data.onlineUsersimg;
				that.onlineCount=data.onlineCount;
			})
		},
		socketio:function(){
			var that=this;
			this.userid=localStorage.getItem('userid');
			this.username=localStorage.getItem('username');
			this.socket.emit('login',{userid:this.userid,username:this.username,userimg:this.avatar_url});//发送登录信息
			this.socket.on('login',function(data){//接收登录信息
				that.onlineUsers=data.onlineUsers;
				that.onlineusersimg=data.onlineUsersimg;
				that.onlineCount=data.onlineCount;
				$('.atalk-con').append('<p class="welcome-p">欢迎 '+data.user.username+'</p>')
				console.log(data)
			})
		},
		changeshow:function(){
			this.showlogin=false;
		},
		sendMSG:function(){//发送消息
			if(this.content.trim()){
				this.socket.emit('sendMSG',{content:this.content,userid:this.userid,username:this.username,avatar_url:this.avatar_url});

				var html=`<div class="req-msg">
							<p class="msg-name">${this.username}</p>
							<div class='msg-con'>
								<span class="msg-img">
									<img src='${this.avatar_url}'>
								</span>
								<p class="msg-con-p"><span class="msg-con-s">${this.content}</span></p>
							</div>
						</div>`
				$('.atalk-con').append(html);
				this.content='';
				$('.take-txt').html('')
			}
		},
		getmsg:function(data){//接收消息
			console.log(data)
			var html=`<div class="res-msg">
							<p class="msg-name">${data.username}</p>
							<div class='msg-con'>
								<span class="msg-img">
									<img src='${data.avatar_url}'>
								</span>
								<p class="msg-con-p"><span class="msg-con-s">${data.content}</span></p>
							</div>
						</div>`
			$('.atalk-con').append(html)
		}
	}
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
	transform: translateX(0%);
  	transition: all .5s
}
.fade-enter, .fade-leave-to {
  	transform: translateX(100%);
}
</style>