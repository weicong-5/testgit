window.onload=function(){
	waterflow('main','box');
	var dataInt={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},
		{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},
		{"src":"15.jpg"}]};
	window.onscroll=function(){
		if(checkscollside){
			var oParent=document.getElementById('main');
			//将数据块添加到页面底部
			for(var i=0;i<dataInt.data.length;i++){
				var obox=document.createElement('div');
				obox.className='box';
				oParent.appendChild(obox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				obox.appendChild(oPic);
				var oimg=document.createElement('img');
				oimg.src="waterflow/images/add/"+dataInt.data[i].src;
				oPic.appendChild(oimg);
			}
			waterflow('main','box');
		}
	}
}

function waterflow(parent,box){
	//将main下的所有class为box的元素取出来
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	//计算整个页面box的列数（页面宽/box的宽度）
	var oboxW=oBoxs[0].offsetWidth;
	//设置main的宽
	var cols=Math.floor(document.documentElement.clientWidth/oboxW);
	oParent.style.cssText='width:'+(cols*oboxW)+'px;margin:0 auto';
	var hArr=[];//存放每一列高度的数组
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hArr);
			var index=minIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
}
//根据class获取元素
function getByClass(parent,clsName){
	var boxArray=new Array(),
		oElements=parent.getElementsByTagName('*');
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className==clsName){
			boxArray.push(oElements[i]);
		}
	}
	return boxArray;
}
//获取数组中最小值的index序号
function minIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}
//检测是否具有滚动条加载数据块条件
function checkscollside(){
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var height=document.body.clientHeight||document.documentElement.clientHeight;
	return (lastBoxH<scollTop+height)?true:false;
}