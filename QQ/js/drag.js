function getElementsByClass(className,parent){
	var oParent=parent?document.getElementById(parent):document,
		eles=[],
		elements=oParent.getElementsByTagName('*');

	for(var i=0,l=elements.length;i<l;i++){
		if(elements[i].className==className){
			eles.push(elements[i]);
		}
	}
	return eles;
}

window.onload=drag;

function drag(){
	var oClose=document.getElementById('ui_boxyClose');
	var oTitle=getElementsByClass('login_logo_webqq','loginPanel')[0];
	//拖曳
	oTitle.onmousedown=fnDown;
	//关闭
	oClose.onclick=fnClose;
	//切换状态
	var loginState=document.getElementById('loginState'),
		stateList=document.getElementById('loginStatePanel'),
		lists=stateList.getElementsByTagName('li'),
		stateTxt=document.getElementById('loginStateTxt');
		loginStateShow=document.getElementById('loginStateShow');
	loginState.onclick=function(e){
		e=e||window.event;
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble=true;
		}
		stateList.style.display="block";
	}

	//鼠标滑过、离开和点击状态栏时
	for(var index in lists){
		lists[index].onmouseover=function(){
			this.style.background="#567";
		}
		lists[index].onmouseout=function(){
			this.style.background="#FFF";
		}
		lists[index].onclick=function(e){
			e=e||window.event;
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble=true;
			}
			var id=this.id;
			stateList.style.display="none";//为什么不行？！stateSelect_text
			//原因是事件的冒泡  li冒泡到ul ul冒泡到div div的点击事件使得ul无法隐藏
			console.log(id);
			var txt=getElementsByClass('stateSelect_text',id)[0].innerHTML;
			console.log(txt);
			stateTxt.innerHTML=txt;
			loginStateShow.className="";
			loginStateShow.className="login-state-show "+id;
		}
	}

	document.onclick=function(){
		stateList.style.display="none";
	}
}

function fnDown(event){
	event=event||window.event;
	var oPanel=document.getElementById('loginPanel');
	//光标按下时光标与面板的距离
	var disX=event.clientX-oPanel.offsetLeft;
	var disY=event.clientY-oPanel.offsetTop;
	//移动
	document.onmousemove=function(event){
		event=event||window.event;
		fnMove(event,disX,disY);
	}
	//释放
	document.onmouseup=function(){
		document.onmousemove=null;
		document.onmouseup=null;
	}
}

function fnMove(event,posX,posY){
	var oPanel=document.getElementById('loginPanel'),
		l=event.clientX-posX,
		t=event.clientY-posY,
		winWidth=document.documentElement.clientWidth;
		winHeight=document.documentElement.clientHeight;
		maxW=winWidth-oPanel.offsetWidth-10;
		maxH=winHeight-oPanel.offsetHeight;
	if(l<0){
		l=0;
	}else if(l>maxW){
		l=maxW;
	}
	if(t<0){
		t=10;
	}else if(t>maxH){
		t=maxH;
	}
	oPanel.style.left=l+'px';
	oPanel.style.top=t+'px';
	document.title=l+','+t;
}

function fnClose(){
	var oPanel=document.getElementById('loginPanel');
	oPanel.style.display='none';
}