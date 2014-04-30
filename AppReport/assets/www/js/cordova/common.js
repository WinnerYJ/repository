/******************************************* cordova ********************************/
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	app.device.name=device.name;
	app.device.cordova=device.cordova;
	app.device.platform=device.platform;
	app.device.uuid=device.uuid;
	app.device.version=device.version;
	console.log('--------------------------------------- onDeviceReady');
	
	//console.log(JSON.stringify(app.device));

	app.config.network.type=getNetworkStatus();

	document.addEventListener("backbutton", eventBackButton, false); //返回键
	document.addEventListener("menubutton", eventMenuButton, false); //菜单键
	document.addEventListener("searchbutton", eventSearchButton, false); //搜索键
}
function getNetworkStatus(){
	var networkState = navigator.connection.type;

	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.CELL]     = 'Cell generic connection';
	states[Connection.NONE]     = 'No network connection';
	return(states[networkState]);
}
function eventBackButton(){
	//window.plugins.ToastPlugin.show_short('再点击一次退出!');
	var page=app.web.page;
	console.log('cordova.....'+page);
	if(page.indexOf('setting')>=0||page.indexOf('login')>=0){
		exitApp();return;
	}
	if(page.indexOf('workspace')>=0){
		return;
	}
	
	gotoMainPage();
	
	function gotoMainPage(){
		navigator.notification.confirm(
            '您确定要返回主页吗?',  // message
            onConfirm,              // callback to invoke with index of button pressed
            '提示',            // title
            '确定,取消'          // buttonLabels
        );
		function onConfirm(button) {
			//alert('You selected button ' + button);
			if(button==1){
				changePage("workspace.html");
			}
		}
	}	
}
function eventMenuButton(){
}
function eventSearchButton(){
}
function exitApp(){
	navigator.notification.confirm(
            '确定要退出程序吗?',  // message
            onConfirm,              // callback to invoke with index of button pressed
            '提示',            // title
            '确定,取消'          // buttonLabels
        );
	function onConfirm(button) {
		//alert('You selected button ' + button);
		if(button==1){
			navigator.app.exitApp();
		}
	}
}