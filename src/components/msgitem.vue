<template>
	<div class="msgitem">
		<ul v-if='list.length>0'>
			<li v-for='item in list' class="msgitem-li">
				<p class="reply-name">用户 <span>{{item.author.loginname}}</span>:</p>
				<p class="msgitem-con">{{item.reply.content}}</p>
				<div class="msgitem-title">
					<span>{{getTime(item.reply.create_at)}}</span>
					<p>
						<router-link :to='{path:"/content",query:{id:item.topic.id}}'>
							来自:{{item.topic.title}}
						</router-link>
					</p>
				</div>
			</li>
		</ul>
		<div v-else class="nodata">
			<img src="../assets/img/wuwuwu.png">
			<p>没有数据</p>
		</div>
	</div>
</template>
<script type="text/javascript">
import timeago from 'timeago.js'
export default{
	data(){
		return{
			
		}
	},
	props:['list'],
	methods:{
		getTime:function(date){
			var date=new Date(date);
			var thistime=new timeago();
			return thistime.format(date,'zh_CN');
		}
	}
}
</script>