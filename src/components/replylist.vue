<template>
	<div class="con-reply">
		<ul class="reply-list">
			<li v-for="item,index in list">
				<p class="reply-author"><img v-bind:src="item.author.avatar_url">{{item.author.loginname}} <span class="reply-author-fa">{{index+1}}楼·{{getlastreply(item.create_at)}}</span></p>
				<div class="reply-con" v-html='item.content'>
							
				</div>
			</li>
		</ul>
		<div class="take-reply">
			<div class="take-con">
				<div class="vue-input-text1" v-on:click='getfocus' v-show='!content'>输入你的信息</div>
				<div class="take-txt" contenteditable=true v-on:input='takeMSG'></div>
			</div>
			<input type="button" value="发表" class="sendbtn" v-on:click='sendMSG' >
		</div>
	</div>
</template>
<script type="text/javascript">
import timeago from 'timeago.js';
import axios from 'axios';
export default{
	data(){
		return{
			content:''
		}
	},
	props:['list','repid'],
	methods:{
		getlastreply:function(date){
			let val=new Date(date);
			var thistime=new timeago();
			return thistime.format(val,'zh_CN');/*转换时间*/
		},
		takeMSG:function(e){
			var tar=e.target;
			this.content=tar.innerText;
		},
		getfocus:function(e){//伪input获取焦点
			var tar=e.target;
			$(tar).next().focus();
		},
		sendMSG:function(){
			var that=this;
			
			axios.post('https://www.vue-js.com/api/v1/topic/'+that.repid+'/replies',{
				accesstoken:localStorage.getItem('accesstoken'),
				content : that.content.trim()
			}).then(function(res){
				that.content='';
				$('.take-txt').html('');
				//that.$emit('loadreply');
			}).catch(function(err){
				console.log(err)
			})
		}
	}
}
</script>