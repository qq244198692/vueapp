<template>
	<div class="content" id="content">
		<div class="con-top">
			<span class="back con-back" v-on:click='goBack'></span>
			{{data.title}}
			<span class="collect" @click='gocollect'></span>
		</div>
		<div class="container">
			<div class="con-title">
				<mark class="to-top" v-if="data.top">置顶</mark>
				<mark class="to-good" v-else-if="data.good">精华</mark>
				{{data.title}}
				<ul class="author clear">
					<li class="fl">作者：{{author}}</li>
					<li class="fl">发布于：{{getlastreply(data.create_at)}}</li>
					<li class="fl">{{data.visit_count}}次浏览</li>
					<li class="fl">来自：{{tab}}</li>
				</ul>
			</div>
			<article class="sec-con" v-html="content"></article>
			<div class="replybox" v-on:click='stoppro'>
				<span class="replyicon" v-on:click='showreply'>
					<img class="replyimg" src='../assets/img/reply.png'>{{replylists.length}}
				</span>
				<replylist v-on:loadreply='loadreplys' v-bind:list='replylists' v-bind:repid='id'></replylist>
			</div>
			
		</div>
		<centerload v-show='showload'></centerload>
		<transition name='fade'>
			<msgMasks v-if='showmsgmask' :msg='msgs'></msgMasks>
		</transition>
	</div>
</template>
<script type="text/javascript">
import axios from 'axios'
import timeago from 'timeago.js';
import centerload from './centerload'
import replylist from './replylist'
import msgMasks from './msgMask'
export default{
	data(){
		return{
			url:'https://www.vue-js.com/api/v1/topic/',
			id:'',
			content:'',
			data:'',
			author:'',
			tab:'',
			replylists:{},
			showload:true,
			collectid:[],
			collect:false,
			showmsgmask:false,
			msgs:''
		}
	},
	components:{centerload,replylist,msgMasks},
	created(){
		this.$store.commit('changeshow',false);//隐藏底部
		this.collectid=localStorage.getItem('collectid');
		console.log(this.collectid)
		this.id=this.$route.query.id;
		axios.get(this.url+this.id).then(function(result){
			console.log(result)
			this.content=result.data.data.content;
			this.data=result.data.data;
			this.author=this.data.author.loginname;
			switch(this.data.tab){
				case 'share':
					this.tab='分享';
					break;
				case 'ask':
					this.tab='问答';
					break;
				case 'job':
					this.tab='招聘';
					break;
			}
			this.replylists=this.data.replies;

			/*if(this.collect.indexOf(this.data.id)>0){
				this.collect=true;
			}*/
			let timer=setTimeout(function(){
						this.showload=false;
						clearTimeout(timer);
						timer=null;
					}.bind(this),500)
		}.bind(this))
		
	},
	mounted(){
		$(document).click(function(){
			var par=$('.replybox');
			par.css({
				'transform':'translateY(0%)'
			})
			$('.replyicon').css({
				'width':'60px',
				'background-color':'rgba(43, 58, 51,0.6)'
			})
		})
	},
	methods:{
		getlastreply:function(date){
			let val=new Date(date);
			var thistime=new timeago();
			return thistime.format(val,'zh_CN');/*转换时间*/
		},
		goBack:function(){
			this.$router.go(-1)
		},
		showreply:function(e){
			e.stopPropagation();
			var par=$('.replybox');
			$('.replyicon').css({
				'width':'100%',
				'background-color':'rgba(43, 58, 51,1)'
			})
			par.css({
				'transform':'translateY(-100%)',
				'transition': 'transform 0.3s linear'
			})
		},
		stoppro:function(e){
			e.stopPropagation();
		},
		loadreplys:function(){
			
			axios.get(this.url+this.id).then(function(result){
				this.replylists=result.data.data.replies;
			}.bind(this))
		},
		gocollect:function(){
			var that=this;
			axios.post(this.url+'collect',{
				accesstoken : localStorage.getItem('accesstoken'),
				topic_id : that.data.id
			}).then(function(res){
				if(res.data.success){
					that.msgs='已收藏'
					that.showmsgmask=true;
					let timer=setTimeout(function(){
						that.showmsgmask=false;

						clearTimeout(timer);
						timer=null;
					},2000)
				}
			})
		}
	}
}
</script>
<style>
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
	  opacity: 0
	}
</style>