<template>
	<div id="footer">
		<ul class="foot-ul clear">
			<li class="home fl" v-on:click='changeTab' v-bind:class="{active:$store.state.tab=='home'}">
				<router-link to='home' >
					<div class="wrapper"></div>
					<span>首页</span>
				</router-link>
			</li>
			<li class="publish fl"  v-on:click='changeTab' v-bind:class="{active:$store.state.tab=='publish'}">
				<router-link to='publish'>
					<div class="wrapper"></div>
					<span>发布</span>
				</router-link>
			</li>
			<li class="msg fl"  v-on:click='changeTab' v-bind:class="{active:$store.state.tab=='msg'}">
				<router-link to='msg'>
					<div class="wrapper"></div>
					<span>消息<i class="msgicon" v-if='$store.state.count>0'>{{$store.state.count}}</i></span>
				</router-link>
			</li>
			<li class="self fl"  v-on:click='changeTab' v-bind:class="{active:$store.state.tab=='self'}">
				<router-link to='self'>
					<div class="wrapper"></div>
					<span>我</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			
		}
	},
	created(){
		this.changeTab();
	},
	methods:{
		changeTab:function(){
			//this.tab=tab;
			//this.tab=this.$route.path.substr(1) ? this.$route.path.substr(1) : this.tab;
			this.$store.state.tab=this.$route.path.substr(1) ? this.$route.path.substr(1) : this.$store.state.tab;
		}
	}
}
</script>