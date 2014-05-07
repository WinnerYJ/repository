//每个.html页面中都包括
//加载位置：1
var app={};
app.version="1.0.01";
app.click="click";						//点击时bind的事件：可以为click或tap,建议使用click,tap太灵敏，发现有多次触发
app.reload=false;
app.dataDownloadSuccess=0;				//记录dataDownload执行结果，成功：>=0，失败：<0
app.doc=document;
app.device={};
app.device.name="";
app.device.platform="";
app.device.uuid="";
app.device.version="";
app.session={};							//存放临时变更
app.config={};							//配置信息，本地储存，或者从服务器取得。
app.config.lang='zh';
app.config.network={};
app.config.network.status='0';
app.config.network.type='Unknown connection';
//app.config.network.server='116.228.77.74';	//旧
app.config.network.server='115.28.27.165';	//新
app.config.network.port='1800';
app.config.scandit_appkey='gvH5PGFLEeODI7talQt9lrQ/g79/J63SZ1TUGtVSmwU';
app.config.user={};
app.config.user.passed=false;
//app.config.user.username="01015510";	//旧
app.config.user.username="";		//新
app.config.user.password='';		//123456
app.web={};
app.web.page='index.html';
app.web.postpage='';					//上一个面页
app.web.pages=[];
app.websocket={};
app.websocket.server='10.192.224.81';
app.websocket.port='8081';

app.log=[];
app.includeFiles=[];

//app.lang="zh_CN";
app.controller=rootpath+'js/controller';
app.view=rootpath+'view';
app.template=app.view+"/template";
//app.i18nFolder=rootpath+'js/i18n';
app.lang={};
app.lang.i18nFolder=rootpath+'js/i18n';
app.lang.loadJSON=null;
app.jquery={};
app.jquery.include=[];
app.jquery.include.push({'js':'js/jquery/jquery.js'});
app.jquery.ui={};
app.jquery.ui.include=[];
app.jquery.ui.include.push({'js':'js/jquery/jquery-ui.js'});
app.jquery.ui.include.push({'js':'js/jquery/jquery.xml2json.js'});
app.jquerymobile={};
app.jquerymobile.changePageOptions={"dataUrl":"/",showLoadMsg:false};
app.jquerymobile.include=[];
//app.jquerymobile.include.push({'css':'js/jqueryMobile/css/jquery.mobile.css'});
app.jquerymobile.include.push({'js':'js/jqueryMobile/js/jquery.mobile.js'});
//

app.cordova={};
app.cordova.include=[];
app.cordova.include.push({'js':'js/cordova/cordova.js'});
app.cordova.include.push({'js':'js/cordova/common.js'});

//
app.push=function(list1,list2){
	for(var i in list2){
		list1.push(list2[i]);
	}
}
//提前引入的.js
app.push(app.includeFiles,app.jquery.include);
if(!(typeof(websocketenabled) === 'undefined')){
	if(websocketenabled){
		//doc_write('js',app.websocket.js);
		app.push(app.includeFiles,app.websocket.include);
	}
}
app.push(app.includeFiles,app.jquery.ui.include);
app.push(app.includeFiles,app.cordova.include);
includeFiles(app.includeFiles);
app.includeFiles=[];
function includeFiles(files){
	for(var i in files){
		if(files[i].js){
			app.doc.write('<script src="'+files[i].js+'"></script>');
			//console.log('js:'+files[i].js);
		}else if(files[i].css){
			app.doc.write('<link rel="stylesheet" type="text/css" href="'+files[i].css+'" />');
			//console.log('css:'+files[i].css);
		}
	}
}


Date.prototype.format = function(fmt) { //author: meizz   
      var o = {   
                "M+" : this.getMonth()+1,                 //月份   
                "d+" : this.getDate(),                    //日   
                "h+" : this.getHours(),                   //小时   
                "m+" : this.getMinutes(),                 //分   
                "s+" : this.getSeconds(),                 //秒   
                "S"  : this.getMilliseconds(),             //毫秒   
                "TT" : this.getHours() < 12 ? "AM" : "PM",  
              };   
    if (/(y+)/.test(fmt)){  
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")  
                .substr(4 - RegExp.$1.length));  
    }  
    for ( var k in o){  
        if (new RegExp("(" + k + ")").test(fmt)){  
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])  
                    : (("00" + o[k]).substr(("" + o[k]).length)));  
        };  
    }  
    return fmt;  
};  
function changePage(page){
	changePageExe(page);
	return;
	//将zdCheck3.html设为横屏
	if(page==='zdCheck3.html'){
		window.plugins.orientationLock.lock("landscape",success('landscape'),fail);
		app.session.orientation='landscape';
	}else{
		if(app.session.orientation==='landscape'){
			window.plugins.orientationLock.lock("portrait",success('portrait'),fail);
		}else{
			changePageExe(page);
		}
	}
	function success(orientation){
		//由于变屏会有时间过程，需暂定一定时间执行changePage，不然会有白屏现象，经测试至少要300ms
		setTimeout((function(){
			console.log('--------------------changePage:success '+orientation);
			app.session.orientation=orientation;
			changePageExe(page);
		}),400);
		
	}
	function fail(){
		console.log('--------------------changePage:fail');
		changePageExe(page);
	}

}
/*
function changePage(page){
	//将zdCheck3.html设为横屏
	if(page==='zdCheck3.html'){
		window.plugins.orientationLock.lock("landscape",success('landscape'),fail);
		app.session.orientation='landscape';
	}else{
		if(app.session.orientation==='landscape'){
			window.plugins.orientationLock.lock("portrait",success('portrait'),fail);
		}else{
			changePageExe(page);
		}
	}
	function success(orientation){
		//由于变屏会有时间过程，需暂定一定时间执行changePage，不然会有白屏现象，经测试至少要300ms
		setTimeout((function(){
			console.log('--------------------changePage:success '+orientation);
			app.session.orientation=orientation;
			changePageExe(page);
		}),400);
		
	}
	function fail(){
		console.log('--------------------changePage:fail');
		changePageExe(page);
	}

}
 */
function changePageExe(page){
	app.web.postpage=app.web.page;
	app.web.page=page;
	app.web.pages.push(page);
	jq.mobile.changePage(page,app.jquerymobile.changePageOptions);
}
function pageBack(){
	var lastpage=app.web.pages.pop();
	//console.log('lastpage...'+lastpage);
	changePage(lastpage);
}

function pausecomp(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
} 
