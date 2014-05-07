(function() {
	
	var Messages=window.i18n.mainPage;
	$(document).on("pagecreate","#routeGuideView",function(e){
		initTable();
		console.log('pagecreate');

	});
	$(document).on("pageinit", "#routeGuideView", function(e) {
		$.when(view.load("footer"))
			.done(function(){ 
				jq("#routeGuideView .footer_bar").html(view.views["footer"]);
				changeFootClass("routeGuideView","routeGuideTab");

				jq.mobile.i18n.applyI18n(jq("#routeGuideView .footer_bar"));
				jq("#routeGuideView .footer_bar").trigger("create");
			});
	});
	jq(document).on("pagebeforeshow", "#routeGuideView", function(e) {
        //busy.show();
    });
	jq(document).on("pageshow", "#routeGuideView", function(e) {
		
        //changeFootClass("routeGuideView","routeGuideTab");
        //busy.hide();
    });

	/*------------------------------------------------------------*/
	
	var initTable=function(){
		
		var dt=[];
		dt.push(['Rank','Movie Title','Year','Rating','Reviews']);
		dt.push(['1','Citizen Kane','1941','100%','74']);
		dt.push(['2','Casablanca','1941','100%','74']);
		dt.push(['3','The Graduate','1941','100%','74']);
		dt.push(['4','Lawrence of Arabia','1941','100%','74']);
		dt.push(['5','The Godfather','1941','100%','74']);
		dt.push(['6','Gone with the Wind','1941','100%','74']);
		dt.push(['7','Gone with the Wind','1941','100%','74']);
		dt.push(['8','Gone with the Wind','1941','100%','74']);
		dt.push(['9','Gone with the Wind','1941','100%','74']);
		dt.push(['10','Gone with the Wind','1941','100%','74']);

		$('#myTable').html( '<table data-role="table" id="table-custom-2" data-mode="columntoggle" class="ui-body-d ui-shadow table-stripe ui-responsive" data-column-btn-theme="e" data-column-btn-text="Columns Filter" data-column-popup-theme="c"></table>' );
		var dtHead=dt[0];
		var thead='<thead><tr class="ui-bar-d">';
		for(var i in dtHead){
			console.log(dtHead[i]);
			thead+='<th data-priority="'+i+'">'+dtHead[i]+'</th>';
		}
		thead+='</tr></thead>';
		var tbody='<tbody>';
		for(var i in dt){
			//console.log(dt[i]);
			tbody+='<tr>';
			tbody+='<td>'+dt[i][0]+'</td>';
			tbody+='<td>'+dt[i][1]+'</td>';
			tbody+='<td>'+dt[i][2]+'</td>';
			tbody+='<td>'+dt[i][3]+'</td>';
			tbody+='<td>'+dt[i][4]+'</td>';
			tbody+='</tr>';
		}
		tbody+='</tbody>';
				
		$('#table-custom-2').html(thead+tbody);
	};
})();

