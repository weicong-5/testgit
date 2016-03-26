$(document).ready(function(){
	var song;
	var tracker=$('.tracker');
	var volume=$('.volume');

	function initAudio(elem){//初始化歌曲名 歌手 专辑封面 进度条 还有li中的选中状态
		var url=elem.attr('audiourl');
		var title=elem.text();
		var cover=elem.attr('cover');
		var artist=elem.attr('artist');
		$('.player .title').text(title);
		$('.player .artist').text(artist);
		$('.player .cover').css('background-image','url('+cover+')');
		song=new Audio(url);
		song.addEventListener('timeupdate', function() {
			var curtime=parseInt(song.currentTime,10);

			tracker.slider('value',curtime);//获取歌曲的当前播放进度 修改进度条的进度
			tracker.slider("option","max",song.duration);/*我补充的 就是要定义这个音频的长度 才可以显示进度*/
			console.log(curtime);
		});

		$('.playlist li').removeClass('active');
		elem.addClass('active');//先将所有的li当前活动状态取消掉 之后再为当前点击的li设置active
	}

	function playAudio(){//点击play按钮效果
		song.play();

		tracker.slider("option","max",song.duration);//duration获取视频/音频的长度

		$('.play').addClass('hidden');
		$('.pause').addClass('visible');
	}

	function stopAudio(){//点击stop按钮效果
		song.pause();//记住暂停播放不是stop而是pause()方法

		$('.play').removeClass('hidden');
		$('.pause').removeClass('visible');
	}

	//绑定click事件
	$('.play').click(function(e){
		e.preventDefault();
		playAudio();
	});
	$('.pause').click(function(e) {
		e.preventDefault();
		stopAudio();
	});
	$('.fwd').click(function(e){
		e.preventDefault();
		stopAudio();

		var next=$('.playlist li.active').next();//去当前选中歌曲的下一首
		if(next.length==0){//如果没有下一首了 则取列表中的第一首
			next=$('.playlist li:first-child');
		}

		initAudio(next);
		playAudio();
	});
	$('.rew').click(function(e){
		e.preventDefault();
		stopAudio();

		var prev=$('.playlist li.active').prev();
		if(prev.length==0){
			prev=$('.playlist li:last-child');
		}

		initAudio(prev);
		playAudio();
	});
	//点击展现歌曲列表
	$('.pl').click(function(e){
		e.preventDefault();
		$('.playlist').fadeIn(300);
	});
	//歌曲列表中每一项的点击
	$('.playlist li').click(function(e){
		stopAudio();
		initAudio($(this));
		playAudio();
	});
	//初始化为第一首歌
	initAudio($('.playlist li:first-child'));
	//初始音量
	song.volume=0.8;
	//音量的进度条
	volume.slider({
		range:'min',
		min:1,
		max:100,
		value:80,
		start:function(even,ui){
		},
		slide:function(even,ui){
			song.volume=ui.value/100;
		},
		stop:function(even,ui){
		}
	});
	//播放进度条
	// song.tracker=0;
	tracker.slider({
		range:'min',
		min:0,
		max:10,
		start:function(even,ui){
		},
		slide:function(even,ui){
			song.currentTime=ui.value;
		},
		stop:function(even,ui){
		}
	});
	playAudio();
});