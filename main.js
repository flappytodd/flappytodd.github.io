canvas = document.getElementById("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//document.body.appendChild(canvas);
ctx = canvas.getContext('2d');
//var socket = io.connect('ws://127.0.0.1:8080');
$(document).ready(function() {
	$("body").animate({scrollTop: 0}, 500);
	//socket.emit("connected", {});
});
updated = false;
$("#playbutton").on("click", function(){
	lastElementTop = $("canvas").position().top ;
	stopAlert = true;
	$(".site-wrapper").css({"box-shadow": "inset 0 0 200px rgba(17, 51, 80, 0)"})
//	$(canvas).css({opacity: "0"})
//	$(".inner.cover").css({opacity: "0"})
	setTimeout(function(){
		$("body").animate({scrollTop: lastElementTop}, 1000);
	}, 10);
//	setTimeout(function(){
//		$(canvas).css({opacity: "1"})
//	        $(".inner.cover").css({opacity: "1"})
//	}, 2000);
	setTimeout(function(){
		if(!updated){
			update();
		}
	}, 1000);
});
curtodd = 0;
function Pipe(x){
	this.x = x
	this.y1 = 0
	this.height1 = Math.round((Math.random()*100)+200);
	this.y2 = this.height1 + 200;
	this.height2 = canvas.height - this.y2;
	this.width = 50;
	this.color = "#90D498"
	this.draw = function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y1, this.width, this.height1);
		ctx.fillRect(this.x, this.y2, this.width, this.height2);
	}
	this.move = function(){
		this.x-=3.5
		if(this.x+this.width < 0){
			this.x = canvas.width;
		}
	}
}
pipes = [new Pipe(canvas.width), new Pipe(canvas.width+500), new Pipe(canvas.width+1000)]
todds = [new Image(), new Image()]
todds[0].src = "imgs/todd1.png";
todds[1].src = "imgs/todd2.png"
gravity = 0.1;
todd = {x: 2*canvas.width/5, y: canvas.height/3, src: todds[0], velX: 0, velY: 0}
count = 0;
//keyPress = {32: false}
function update(){
	updated = true;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < pipes.length; i++){
		pipe = pipes[i];
		pipe.draw();
		pipe.move();
	}
	if(count > 10){
		if(curtodd == 0){
			todd.src = todds[1]
			curtodd = 1;
		}else{
			todd.src = todds[0]
			curtodd = 0;
		}
		count = 0;
	}
	count++;
	todd.y+=todd.velY;
	todd.velY+=gravity;
	updatePlayer(todd);
	setTimeout(update, 10);
}
function flap(){
	todd.velY = -5;
	/*todd.src = todds[1];
	setTimeout(function(){
		todd.src = todds[0];
	}, 200);*/
}
$(document).keydown(function(e) {
    if(e.which == 32) {
	flap();
    }
});
/*$(document).keyup(function(e) {
    if(e.which == 37 || e.which == 39) {
        keyCode = e.which;
        keyPress[e.which] = false;
    }
});*/
function updatePlayer(player){
	ctx.drawImage(player.src, player.x, player.y);
//	ctx.fillStyle = player.color;
//	ctx.fillRect(player.x, player.y, player.width, player.height);
}	
stopAlert = false;
$("#alert").on("click", function(){
	if($("#alert")[0].innerHTML == "Alert!"){
		doAlert("alert");
		$("#alert")[0].innerHTML = "Stop alert!";
	}else{
		stopAlert = true;
		$("#alert")[0].innerHTML = "Alert!";
	}
});
	

function doAlert(state){
	if(stopAlert){
		stopAlert = false;
		$(".site-wrapper").css({"box-shadow": "inset 0 0 200px rgb(17, 51, 80)"})
		return;
	}
	if(state == "alert"){
		$(".site-wrapper").css({"box-shadow": "inset 0 0 200px #D65653"})
		setTimeout(function(){
		doAlert("calm");
		}, 500);
	}else{
		$(".site-wrapper").css({"box-shadow": "inset 0 0 200px rgb(17, 51, 80)"})
		setTimeout(function(){
		doAlert("alert");
		}, 500);
	}
}
