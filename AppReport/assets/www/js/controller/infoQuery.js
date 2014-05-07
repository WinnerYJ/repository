(function() {
var Messages=window.i18n.message;
	$(document).on("pagecreate","#infoQueryView",function(e){
		
		//jq("#infoQueryView .footer_bar").html(app.footerHTML);
	});
	$(document).on("pageinit", "#infoQueryView", function(e) {
		$.when(view.load("footer"))
			.done(function(){ 
				jq("#infoQueryView .footer_bar").html(view.views["footer"]);
				changeFootClass("infoQueryView","infoQueryTab");
				jq.mobile.i18n.applyI18n(jq("#infoQueryView .footer_bar"));
				//jq.mobile.i18n.applyI18n(jq("#infoQueryView"));
				jq("#infoQueryView .footer_bar").trigger("create");
			});
	});
	jq(document).on("pagebeforeshow", "#infoQueryView", function(e) {
        //busy.show();
		

    });
	jq(document).on("pageshow", "#infoQueryView", function(e) {
		

    });

	/*------------------------------------------------------------*/

})();