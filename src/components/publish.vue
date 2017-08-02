<template>
	<div class="publishbody">
		<form>
			<div class="form-item">
				<p class="f-item-title">请选择模块</p>
				<div class="f-item-con">
					<div class="text-title select-xl" v-on:click='changeTab'>
						<span class="text-placehold" v-if='!curtab'>请选择...</span>
						<span v-else>{{curtab}}</span>
					</div>
					<div class="select-div" v-if="tabshow">
						<div class="option-item" v-for='item,index in tab' v-on:click='chooseTab(index)'>{{item}}</div>
					</div>
				</div>
			</div>
			<div class="form-item">
				<p class="f-item-title">主题</p>
				<div style="position:relative;">
					<div class="vue-input-text" v-on:click='getfocus' v-show='!title'>请输入主题</div>
					<input type="text" class="vue-input"  v-on:input="changeval('title')">
				</div>
			</div>
			<div class="form-item">
				<p class="f-item-title">内容</p>
				<div style="position:relative;">
					<div class="vue-input-text" v-on:click='getfocus' v-show='!content'>请输入主题</div>
					<!-- <textarea class='vue-input' v-on:input="changeval('content')"></textarea> -->
					<div contenteditable="true" class='vue-input vue-textarea' v-on:focus="contenteditfocus" v-on:blur="contenteditblur"></div> 
				</div>
			</div>
			<input type="button" class="btn" value='发布' v-on:click='subMSG'>
		</form>

		<masks v-bind:msg='msg' v-on:closeMASK='closeBOX' v-bind:flag='flag' v-if='isshow'></masks>
	</div>
</template>
<script type="text/javascript">
import axios from 'axios';
import marked from 'marked'
import masks from './mask';
export default{
	data(){
		return{
			msg:'',
			flag:'',
			tab:['问答','分享','招聘'],
			tabv:['ask','share','job'],
			isshow:false,
			tabshow:false,
			curtab:'',
			curtabv:'',
			title:'',
			content:'',
			accesstoken:''
		}
	},
	components:{masks},
	mounted(){
		if(!localStorage.getItem('username')){
			this.isshow=true;
			this.msg='请先登录';
			this.flag='login';
		}
		var that=this;
		$(document).click(function(){
			if($(this).find('.select-div').length!=0){
				that.tabshow=false;
			}
		})
		this.accesstoken=localStorage.getItem('accesstoken');
	},
	methods:{
		changeTab:function(e){//弹出tab选择框
			e.stopPropagation();
			this.tabshow=true;
		},
		chooseTab:function(cur){//选择tab
			this.tabshow=false;
			this.curtab=this.tab[cur]
			this.curtabv=this.tabv[cur];
		},
		getfocus:function(e){//伪input获取焦点
			var tar=e.target;
			$(tar).next().focus();
		},
		changeval:function(txt){
			var tar=event.target;
			if(txt=='title'){
				this.title=tar.value;
			}else{
				this.content=tar.value;
			}
			
		},
		contenteditfocus:function(){
			var tar=event.target;
			this.content=' ';
		},
		contenteditblur:function(e){
			var tar=event.target;
			this.content=tar.innerText;
		},
		subMSG:function(){
			if(!this.curtabv){
				this.isshow=true;
				this.msg='请选择模块';
				this.flag='alert';
				return;
			}else if(!this.title.trim()){
				this.isshow=true;
				this.msg='请填写主题';
				this.flag='alert';
				return;
			}else if(!this.content.trim()){
				this.isshow=true;
				this.msg='请填写主题内容';
				this.flag='alert';
				return;
			}
			console.log(this.accesstoken)
			console.log(this.title)
			console.log(this.curtabv)
			
			var that=this;
			that.content = marked(that.content)
			console.log(this.content)
			axios.post('https://www.vue-js.com/api/v1/topics', {
                    accesstoken: that.accesstoken,
                    title: that.title,
                    tab: that.curtabv,
                    content: that.content
            })
            .then(function(res){
				this.isshow=true;
				this.msg='发帖成功';
				this.flag='success';
			}).catch(function(err){
				console.log(err)
			})
		},
		closeBOX:function(){
			this.isshow=false;
		}
	}
}
</script>