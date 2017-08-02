<template>
	<div class="msgmask">
		{{msg}}
	</div>
</template>
<script type="text/javascript">
export default{
	props:['msg']
}
</script>
<style>
	.msgmask{
		position: fixed;
		top:50%;
		left:50%;
		padding:20px 30px;
		max-width: 150px;
		transform: translate(-50%,-50%);
		background:rgba(0,0,0,0.6);
		color:#fff;
		font-size: 14px;
		border-radius: 5px;
	}
</style>