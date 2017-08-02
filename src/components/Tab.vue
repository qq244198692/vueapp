<template>
	<div class="tab">
		<div class="tab-top">
			<ul class="tab-top-ul clear">
				<li class="fl" v-bind:class='{active:tab=="all"}' v-on:click='getTab("all")'>
					全部
				</li>
				<li class="fl" v-bind:class='{active:tab=="good"}' v-on:click='getTab("good")'>
					精华
				</li>
				<li class="fl" v-bind:class='{active:tab=="weex"}' v-on:click='getTab("weex")'>
					weex
				</li>
				<li class="fl" v-bind:class='{active:tab=="share"}' v-on:click='getTab("share")'>
					分享
				</li>
				<li class="fl" v-bind:class='{active:tab=="ask"}' v-on:click='getTab("ask")'>
					问答
				</li>
				<li class="fl" v-bind:class='{active:tab=="job"}' v-on:click='getTab("job")'>
					招聘
				</li>
			</ul>
			<span class="cur_bottom"><i class="roll"></i></span>
		</div>
		<loadmsg v-show='topload'></loadmsg>
		<div class="tab-con">
			<ul class="data-list">
				<li class="clear" v-for="item in data">
					<div class="data-user-img fl">
						<img :src="item.author.avatar_url">
					</div>
					<div class="data-title" v-on:click=''>
						<router-link :to="{path:'/content',query:{id:item.id}}">
							<mark class="to-top" v-if="item.top">置顶</mark>
							<mark class="to-good" v-else-if="item.good">精华</mark>
							<mark class="to-tab" v-else-if="item.tab=='ask'">问答</mark>
							<mark class="to-tab" v-else-if="item.tab=='share'">分享</mark>
							<mark class="to-tab" v-else-if="item.tab=='job'">招聘</mark>
							{{item.title}}
						</router-link>
						<p class="title-xx clear">
							<span class="title-reply">
								{{item.reply_count}}/{{item.visit_count}}
							</span>
							<span class="last_reply_at fr">
								{{getlastreply(item.last_reply_at)}}
							</span>
						</p>
					</div>
				</li>
			</ul>
			<p class="nomore" v-show='nomore'>没有更多了</p>
			<loadmsg v-show='!nomore'></loadmsg>

			<centerload v-show='showload'></centerload>
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios';
	import timeago from 'timeago.js';
	import centerload from './centerload';
	import loadmsg from './loadmsg'
	export default{
		data(){
			return{
				url:'https://www.vue-js.com/api/v1/topics?tab=all',
				tab:'all',
				data:{},
				lastreply:'',
				page:1,
				nomore:false,
				winH:'',
				scrollH:0,
				showload:true,
				startY:0,
				moveY:0,
				distance:0,
				topload:false,
				index:1
			}
		},
		components:{centerload,loadmsg},
		created(){
			this.getMSG(); 
		},
		mounted(){
			var that=this;
			this.tabH=$('.tab').innerHeight();
			$('.tab').scroll(function(){
				that.scrollH=$('.tab-con')[0].scrollHeight;
				if($(this)[0].scrollTop+that.tabH>=that.scrollH){//滚到底部时调用
					that.loadmore();
				}
			})

			this.curBottom(1);
			
		},
		methods:{
			getMSG:function(type){
				this.showload=true;
				let that=this;
				axios.get(this.url).then(function(result){
					that.data=result.data.data;
					that.showload=false;
				})
			},
			loadmore:function(){
				if(!this.nomore){
					this.page++;
					let url=this.url;
					let arr = [];
					url+='&page='+this.page;
					
					var timer=setTimeout(function(){
						axios.get(url).then(function(result){
							arr=result.data.data;
							console.log(arr)
							if(arr.length==0){
								this.nomore=true;
								return;
							}
							this.data=[...this.data,...arr];
							arr=[];
						}.bind(this));
						clearTimeout(timer);
						timer=null;
					}.bind(this),500)
					
				}
			},
			getTab:function(tab){
				var tar=event.target;
				this.index=$(tar).parent().children('li').index($(tar))+1;
				
				this.showload=true;
				this.page=1;
				this.nomore=false;
				this.tab=tab;
				this.url='https://www.vue-js.com/api/v1/topics?tab='+this.tab;
				
				this.curBottom();

				axios.get(this.url).then(function(result){
					
					this.data=result.data.data;
					let timer=setTimeout(function(){
						this.showload=false;
						clearTimeout(timer);
						timer=null;
					}.bind(this),500)
				}.bind(this))
			},
			getlastreply:function(date){
				let val=new Date(date);
				var thistime=new timeago();
				return thistime.format(val,'zh_CN');/*转换时间*/
			},
			curBottom:function(){
				var dom=$('.cur_bottom');
				var wdh=$('.tab-top li').width()+0.5;
				dom.css({
					'width':wdh,
					'transform':'translateX('+(this.index-1)*wdh+'px)',
					'transition':'transform 0.3s'
				})
			}
		}
	}
</script>