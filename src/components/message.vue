<template>
	<div class="message">
		<p class="my-con-top">消息中心</p>
		<div class='msg-tab clear'>
			<div class="fl read" :class='tab=="read" && "cur"' @click='toread'><span >已读信息</span></div>
			<div class="fl unread" :class='tab=="read" || "cur"' @click='tounread'><span>未读信息<i class="msgicon" v-if='count>0'>{{$store.state.count}}</i></span></div>
		</div>
		<div class="msg-con">
			<Msgitems :list='lists'></Msgitems>
		</div>

		<masks :msg='msg' :flag='flag' v-show='showMask'></masks>
	</div>
</template>
<script>
import axios from 'axios';
import masks from './mask';
import Msgitems from './msgitem';
export default{
	data(){
		return{
			url:'https://www.vue-js.com/api/v1/',
			count:0,//未读信息
			data:[],
			showMask:true,
			msg:'请先登入',
			flag:'msg',
			lists:[],
			tab:'read'
		}
	},
	created(){
		this.$store.commit('changeshow',true)

		if(localStorage.getItem('userid')){
			var accesstoken=localStorage.getItem('accesstoken');
			this.showMask=false;
		}else{
			this.showMask=true;
			return;
		}

		var that=this;
		//获得所有信息
		axios.get(this.url+'messages?accesstoken='+accesstoken).then(function(res){
			console.log(res)
			that.data=res.data.data;
			that.lists=that.data.has_read_messages;
		})
		//获取未读信息数
		axios.get(this.url+'message/count?accesstoken='+accesstoken).then(function(res){
			//console.log(res)
			that.count=res.data.data;
			that.$store.state.count=that.count;
		})
	},
	components:{masks,Msgitems},
	methods:{
		toread:function(){
			this.tab='read'
			this.lists=this.data.has_read_messages;
		},
		tounread:function(){
			this.tab='unread'
			this.lists=this.data.hasnot_read_messages;
		},
	}
}
</script>