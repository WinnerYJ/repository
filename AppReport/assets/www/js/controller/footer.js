init();
function changeFootClass(view,tab) {
	console.log('changeFootClass...'+view+','+tab);
    var tabClass = [ "mainTab", "workspaceTab", "moreTab" ];
    for ( var i in tabClass) {
        if (tabClass[i] == tab)
            jq("#"+view+ " ." + tab).addClass("ui-btn-active");
        else
            jq("#"+view+ " ." + tabClass[i]).removeClass("ui-btn-active");
    }
}
/*
function changeFootLanguage(view) {
    if (null != view) {
        jq("#" + view + " [I18N='mainTabLabel']").html(Messages.main);
        jq("#" + view + " [I18N='taskPlanTabLabel']").html(Messages.taskPlan);
        jq("#" + view + " [I18N='routeGuideTabLabel']").html(Messages.routeGuide);
        jq("#" + view + " [I18N='queryTabLabel']").html(Messages.query);
        jq("#" + view + " [I18N='moreTabLabel']").html(Messages.more);

    } else {
        jq("[I18N='mainTabLabel']").html(Messages.main);
        jq("[I18N='taskPlanTabLabel']").html(Messages.taskPlan);
        jq("[I18N='routeGuideTabLabel']").html(Messages.routeGuide);
        jq("[I18N='queryTabLabel']").html(Messages.query);
        jq("[I18N='moreTabLabel']").html(Messages.more);
    }
}*/
function registerFooterTabListener() {
	console.log('---registerFooterTabListener');
	$.ajax({
	  url: app.view+"/footer.html",
	  context: document.body
	}).done(function(data) {
	  app.footerHTML=data;
	  //console.log(app.footerHTML);
	  //console.log('initilize app.footerHTML successfully.');
	});
	//touchstart
    jq(document).on("tap", ".mainTab", function(e) {
		applog("打开[mainTab]");
        e.stopImmediatePropagation();      
        changePage("mainPage.html");
        return false;
    });
    jq(document).on("tap", ".workspaceTab", function(e) {
		console.log('.workspaceTab');
		applog("打开[workspaceTab]");
        e.stopImmediatePropagation();       
        changePage("workspace.html");
        return false;
    });
	/*
    jq(document).on("tap", ".routeGuideTab", function(e) {
		applog("打开[routeGuideTab]");
        e.stopImmediatePropagation();    
        if (false) {
            changePage("routeGuideCustomer.html");
        } else {
            changePage("routeGuide.html");
        }

        return false;
    });
    jq(document).on("tap", ".infoQueryTab", function(e) {
		applog("打开[infoQueryTab]");
        e.stopImmediatePropagation();       
        changePage("infoQuery.html");

        return false;
    });*/
    jq(document).on("tap", ".moreTab", function(e) {
		/*
		applog("打开[moreTab]");
        e.stopImmediatePropagation();      
        changePage("more.html");
		*/
		my_loader(e,{message:window.i18n.common.developing,delay:2000});
		/*
		$.mobile.loading( "show", {
				text: window.i18n.common.developing,
				textVisible: true,
				theme: "e",
				textonly: false,
				html: ""
		});*/
        return false;
    });
}

function init(){
	//导入常用的view到view对象，以加快显示效果
	view.load('footer');				//导入view/footer.html
	registerFooterTabListener();
	
	
}