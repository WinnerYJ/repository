//每个.html页面中都包括
//加载位置：2
jq=$;
//app.config=jq.extend(true,app.config,config);	//将用户配置合并到app.config
//--------------------------------------------------------------------
$(document).bind("mobileinit", function(){
	//初始化配置项
	$.mobile.i18nEnabled = true;					//设置国际化，enable i18n
	$.mobile.i18nFolder = app.lang.i18nFolder;
    $.mobile.ignoreContentEnabled = true;
	//$.mobile.activeBtnClass="ui-btn-hover-a";		//设置按钮处于激活状态时的CSS样式;字符串类型,在默认:ui-page-active;覆盖范围：Buttons、List views、Select menus等组件的触发状态。
	//$.mobile.activePageClass="ui-page-custom";	//字符串类型，在默认状态下参数是引用样式表中的” ui-page-active”，样式ui-page-active是用来将页面设置为显示状态的样式。所以在自定义这个样式到时候必须要在样式中声明以下属性：”display:block !important; overflow:visible !important;” 。（注意：不熟悉jQM的CSS框架的朋友经常会遇到自定义的样式不起作用的情况，这一般是由于自定义的样式和原有CSS框架的继承关系不同引起的，可以在不起作用的样式后面加上!important来提高自定义样式的优先级）
	$.mobile.ajaxEnabled=true;						//布尔类型，在默认状态下参数是true,如果你的项目中没有用到Ajax，那么建议将这里设为false
	//$.mobile.ajaxFormsEnabled =false;				//单独设置页面中的表单提交是否使用Ajax方法
	//$.mobile.ajaxLinksEnabled =false;				//单独设置页面中的链接是否使用Ajax方法
	$.mobile.autoInitializePage =true;				//设置页面是否自动初始化，当设置为false时，jQM将推迟对页面的渲染，方便我们动态构建页面的Dom元素等异步操作时引发的页面渲染失败问题。在页面元素构建完成后用$.mobile.initializePage();来开始渲染页面。
	//
	$.mobile.loader.prototype.options.text = "loading..."; 
	$.mobile.loader.prototype.options.textVisible = true; 
	$.mobile.loader.prototype.options.theme = "e"; 
	$.mobile.loader.prototype.options.html = "";
	$.mobile.defaultPageTransition = "none";			//解决changePage闪屏
	//
	$.mobile.buttonMarkup.hoverDelay = "false";			//如果你发现按钮的按下/划过的 状态感觉反应有些迟缓,那$.mobile.buttonMarkup.hoverDelay的设置 可能就用得上了
	$.mobile.allowCrossDomainPages=true				//所以如果PhoneGap应用想要加载远程服务器的文件，$.support.cors 和 $.mobile.allowCrossDomainPages 都必须设为true.并且 $.mobile.allowCrossDomainPages的设置必须要在跨域请求之前完成
	$.support.cors=true;							//$.support.cors必须设为true来告知$.ajax可以跨域加载文件
	//
	
});
var controller=(function(){							//全局变量，控制controller目录中的.js
	var files=[];
	var push=function(f){
		files.push({'js':app.controller+'/'+f+'.js'});
	}
	return{
		push:push,
		files:files
	}
})();
var view=(function(){								//全局变量，控制view目录中的.html
	var views=[];
	var load=function(f){
		var dtd = $.Deferred();		//新建一个deferred对象
		if(views[f]){
			//console.log('get file [ '+f+' ] in cache!');
			dtd.resolve();			//改变Deferred对象的执行状态
		}else{
			//setTimeout(function(){
			$.ajax({
			  url: app.view+'/'+f+'.html',
			  async:false,
			  context: document.body
			}).done(function(data) {
			  views[f]=data;
			  console.log('get file [ '+f+' ] successfully.');
			  dtd.resolve();		//改变Deferred对象的执行状态
			});
			//},5000);
		}
		return dtd.promise();		// 返回promise对象
	}
	return{
		load:load,
		views:views
	}
})();

app.push(app.includeFiles,app.jquerymobile.include);
//app.push(app.includeFiles,[{'js':app.lang.i18nFolder+'/'+app.config.lang+'.json'}]);	//界面语言国际化
//app.push(app.includeFiles,[{'js':app.lang.i18nFolder+'/i18n.js'}]);		//界面语言国际化,采用非ajax方式，apple emulator不支持ajax提取文件
//日期选择器，来自http://dev.jtsage.com/jQM-DateBox
//app.push(app.includeFiles,[{'js':'js/jqueryMobile/jtsage/jqm-datebox.core.js'}]);
//app.push(app.includeFiles,[{'js':'js/jqueryMobile/jtsage/jqm-datebox.mode.flipbox.js'}]);
//app.push(app.includeFiles,[{'js':'js/jqueryMobile/jtsage/jquery.mobile.datebox.i18n.en_US.utf8.js'}]);
//
app.jqplot={};
app.jqplot.include=[];
app.jqplot.include.push({'css':'js/jqplot/jquery.jqplot.min.css'});
app.jqplot.include.push({'js':'js/jqplot/jquery.jqplot.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.barRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.categoryAxisRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.pointLabels.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.canvasTextRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.canvasAxisLabelRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.logAxisRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.canvasAxisTickRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.dateAxisRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.BezierCurveRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.pieRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.donutRenderer.min.js'});
app.jqplot.include.push({'js':'js/jqplot/plugins/jqplot.canvasOverlay.min.js'});
app.push(app.includeFiles,app.jqplot.include);
//
app.push(app.includeFiles,[{'js':'js/index.js'}]);

app.push(app.includeFiles,controller.files);		//引入controller目录下的.js

includeFiles(app.includeFiles);
app.includeFiles=[];


//
/******************************************************************************/

/******************************************************************************/

/*
function jmb_initializePage(){
	if(!$.mobile.autoInitializePage){
		console.log('--- run $.mobile.initializePage() manually.');
		$.mobile.initializePage();
	}
}*/
//
function loaderDelayShow(option){
	var delayTime=1000;
	if(!(typeof option === "undefined")){
		delayTime=(typeof option.delay === "object")?option.delay:delayTime;
	}
	//console.log(delayTime);
	var delayTime=(option===undefined)?1000:option.delay;
	//console.log(delayTime);
	$.mobile.loading( "show", {
				text: option.message,
				textVisible: true,
				theme: "e",
				textonly: false,
				html: option.html
	});
	setTimeout((function(){
		$.mobile.loading( "hide" );
		//e.stopImmediatePropagation();
		if(!(option.changePage===undefined)){
			//console.log('loaderDelayShow...changePage');
			changePage("workspace.html");
		}
	}),delayTime);
    return false;
}
function loaderShow(option){
	$.mobile.loading( "show", {
			text: option.message,
			textVisible: true,
			theme: "e",
			textonly: false,
			html: option.html
	});
}
/**********************************************************************/
var jsonLocalSet=function(n,v){
	
/*	if(n=='local.dtCheck.data.products'){
		console.log('|||');
		console.log(v);
		console.log('|||');
	}*/
	localStorage.setItem(n,JSON.stringify(v));

}
var jsonLocalGet=function(n){
	var r=localStorage.getItem(n);
	/*
	if(n=='local.dtCheck.data.products'){
		console.log('***');
		console.log(JSON.parse(r));
		console.log('***');
	}*/
	return(JSON.parse(r))
}


function getObjectValue(o){	//值传递赋值
	return(JSON.parse(JSON.stringify(o)));
}
function setObjectValue(o,v){
	for(var i in o){
		if(v[i]!=null){
			o[i]=v[i];
		}
	}
}
function myAlert(message, alertCallback, title, buttonName){
	//navigator.notification.alert(message, alertCallback, [title], [buttonName])
	navigator.notification.alert(message, alertCallback, title, buttonName);
}
function myConfirm(message,onConfirm,title,buttonTxt){
	if(app.device.name===''){
		button=confirm('*'+message);
		onConfirm(button);
	}else{
		navigator.notification.confirm(
				message,  // message
	            onConfirm,              // callback to invoke with index of button pressed
	            title,            // title
	            buttonTxt          // buttonLabels
	        );
	}
}

/*********************************************************************/
