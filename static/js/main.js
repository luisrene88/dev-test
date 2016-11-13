console.log('Happy Coding!');

var player;
var cupon = $("#cupon");
var signup = $("#signup");
cupon.hide();
signup.hide();

function onYouTubeIframeAPIReady(){
	player = new YT.Player('youtubePlayer',{
		height: '480',
		width : '640',
		videoId : 'BIh1Sm4DyAE',
		events : {
			'onReady' : function(event){
				ajustarVentanas();
				cargasrVideos();
				
			},
			'onStateChange' : onStateChange
		}
	});
}

function ajustarVentanas(){
				cupon.css({
					position: "absolute",
			        top: $("#youtubePlayer").offset().top+10,
			        right: $("#youtubePlayer").offset().left+10,
					width: "160px",
			        height: "50px",
			        
				});
				signup.css({
					position: "absolute",
			        top: $("#youtubePlayer").offset().top,
			        right: $("#youtubePlayer").offset().left,
					width: $("#youtubePlayer").width(),
			        height: $("#youtubePlayer").height(),
			        
				});
}

function onStateChange(event){
		var status = player.getPlayerState();
		if (status === YT.PlayerState.PLAYING){
			var cumplio = false;
			setInterval(function(){
				var time = player.getCurrentTime();
				
				if (time>9){

					if(!cumplio){
						cumplio = true;
						cupon.show();
					}
				}

			},1000);
		}
		else if(status == YT.PlayerState.ENDED){
			cupon.hide();
			signup.show();
		}

				
}



var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=UUOqhTsqySBCBTy571GArcXg&key=AIzaSyDXmjGldeCpg3qj7ND7-ntUHgJd-l72LXE'


function cargasrVideos(){
	$.ajax({
		type : "GET",
		cache:false,
		url : url,
		contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function (datos) {
			for (var i = 0; i < datos.items.length; i++) {
	        	var elemento = datos.items[i];
	        	var video ='<div class=" ed-item main-center movil-50 tablet-30 web-25">'+
	        	'<div id="'+elemento.snippet.resourceId.videoId+'" class="elemento">'+
	        	'<img src="'+elemento.snippet.thumbnails.medium.url+'">'+
	        	'<div>'+elemento.snippet.title+'</div>'+
	        	'<div>'
	        	+'</div>';
	        	$("#videos").append(video);
	        }
	        $(".elemento").on("click", function(e){
			 	var id = e.currentTarget.id;
			 	player.loadVideoById({videoId:id});
			 	
			 });

		}, error: function (e) {
	          
	    }
	});
}


 $("#slider").owlCarousel({
 	navigation : false,
 	rewindNav : true,
	slideSpeed : 300,
	paginationSpeed : 400,
	singleItem:true,
	autoPlay : true,
	responsive:true,
	//items : 1
	itemsCaleUp : true,
 });

 $("#closeCoupon").on("click", function(){
 	cupon.hide();
 });

 $("#closeSignup").on("click", function(){
 	signup.hide();
 });

 $(window).resize(function(){
 		ajustarVentanas();
 });