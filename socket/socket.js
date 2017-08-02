var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);

app.get('/',function(req,res){
	res.send('<h1>welcome to socket</h1>')
})

//在线用户
var onlineUsers = {};
//在线用户头像
var onlineUsersimg={};
//当前在线人数
var onlineCount = 0;
//上一次消息时间
var prevtime='';

io.on('connection', function(socket){
	socket.emit('init',{onlineCount:onlineCount,onlineUsers:onlineUsers,onlineUsersimg:onlineUsersimg})
	
	//监听新用户加入
	socket.on('login', function(obj){
		//将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
		socket.name = obj.userid;
		//检查在线列表，如果不在里面就加入
		if(!onlineUsers.hasOwnProperty(obj.userid)) {
			onlineUsersimg[obj.userid]=obj.userimg;
			onlineUsers[obj.userid] = obj.username;
			//在线人数+1
			onlineCount++;
		}
		
		//向所有客户端广播用户加入
		io.emit('login', {onlineUsers:onlineUsers,onlineUsersimg:onlineUsersimg, onlineCount:onlineCount, user:obj});
		console.log(obj.username+'加入了聊天室');
	});

	socket.on('sendMSG',function(data){
		var now=new Date();
		if(!prevtime){
			prevtime=now;
		}
		if((now-prevtime)/1000>10){
			data.time=now;
		}
		console.log(data.username+':'+data.content)
		socket.broadcast.emit("msg",data); //通知所有人，除了自己
		prevtime=now;
	})
	
	//监听用户退出
	socket.on('disconnect', function(){
		//将退出的用户从在线列表中删除
		if(onlineUsers.hasOwnProperty(socket.name)) {
			//退出用户的信息
			var obj = {userid:socket.name, username:onlineUsers[socket.name]};
			
			//删除
			delete onlineUsers[socket.name];
			delete onlineUsersimg[socket.name];
			//在线人数-1
			onlineCount--;
			
			//向所有客户端广播用户退出
			io.emit('logout', {onlineUsers:onlineUsers,onlineUsersimg:onlineUsersimg, onlineCount:onlineCount, user:obj});
			console.log(obj.username+'退出了聊天室');
		}
	});
	
  
});


http.listen(3000,function(){
	console.log('ws is ready')
})
