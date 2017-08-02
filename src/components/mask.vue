<template>
	<div class="mask">
		<div class="mask-container">
			<div class="mask-con">
				{{msg}}
			</div>
			<p class="mask-operate">
				<span class='mask-close' v-on:click='close'>取消</span>
				<span class='mask-sub' v-on:click='subsure'>确定</span>
			</p>
		</div>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return {
			
		}
	},
	props:['msg','flag'],
	methods:{
		close:function(){
			if(this.flag=='login' || this.flag=='msg'){
				this.$router.push('home')
			}else if(this.flag=='alert'){
				this.$emit('closeMASK')
			}else if(this.flag=='success'){
				this.$router.push('home')
			}
		},
		subsure:function(){
			if(this.flag=='login' || this.flag=='msg'){
				this.$router.push('self')
			}else if(this.flag=='alert'){
				this.$emit('closeMASK')
			}else if(this.flag=='success'){
				this.$router.push('home')
			}
		}
	}
}
</script>