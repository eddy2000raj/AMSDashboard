function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var mytexts = getUrlVars()["name"];
var mytextactual = decodeURIComponent(mytexts);
var mytext =mytextactual.replace(/'/g,"''");

document.getElementById("CustomerName").innerHTML =
            mytext ;
document.getElementById("CustomerName1").innerHTML =
            mytext ;
document.getElementById("CustomerName2").innerHTML =
            mytext ;



var uniqueName=getUrlVars()["uniqueName"];


var data = new FormData();

var finalQueryOpen1 = "Select count(this) from AMVisTicket t  WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"'  and AMVisAssignedTeam ='GS APP MGMT' and t.AMVisIsAMSTicket!=false Union Select count(this) from AMVisTicket t  WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisAssignedTeam ='' and t.AMVisIsAMSTicket!=false";
data.append("query", finalQueryOpen1);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("totalTickets").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();

var finalQueryOpen2 = "Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN'  and AMVisAssignedTeam ='GS APP MGMT' and Beginswith(t.AMVisPriority ,'P',true) and t.AMVisIsAMSTicket!=false union Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN'  and AMVisAssignedTeam ='' and Beginswith(t.AMVisPriority ,'P',true) and t.AMVisIsAMSTicket!=false";
data.append("query", finalQueryOpen2);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();


xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("totalOpen").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
function queryTransform1() { return " Select count(this) from AMVisTicket t  WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and (CurrentDate() - t.AMVisDateCreated < 30) and t.AMVisIsAMSTicket!=false ";}
var finalQuery1 = queryTransform1();

data.append("query", finalQuery1);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("TotalOpen30").innerHTML =
            replaced ;

  }
});

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");

xhr.send(data);


//Adding dynamic PM name from server-------


function pmName() { return "select CASE usr when null then 'NO PM Assigned Yet' else usr.Name.PrimaryString end from config.amvis.core.AMVisAccount acc left outer join ariba.user.core.User usr include inactive using acc.AMVisPMs where acc.AMVisShortName='"+mytext+"'";}

var data = new FormData();
data.append("query", pmName());
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();
xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");
xhr.send(data);
xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
		document.getElementById("pmName").innerHTML =replaced ;
  }
});

//-----------------------------------------

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
function queryTransform2() { return " Select count(this) from AMVisTicket t  Where t.AMVisAccount.AMVisShortName = '"+mytext+"' and (CurrentDate() - t.AMVisDateClosed < 30) and AMVisStatus = 'CLOSED' and AMVisAssignedTeam ='GS APP MGMT' and t.AMVisIsAMSTicket!=false union Select count(this) from AMVisTicket t  Where t.AMVisAccount.AMVisShortName = '"+mytext+"' and (CurrentDate() - t.AMVisDateClosed < 30) and AMVisStatus = 'CLOSED' and AMVisAssignedTeam ='' and t.AMVisIsAMSTicket!=false";}
var finalQuery2 = queryTransform2();

data.append("query",finalQuery2) ;
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("TotalClosed30").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
function queryTransform3() { return "Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN'  and AMVisAssignedTeam ='GS APP MGMT' and Beginswith(t.AMVisPriority ,'P',true) and t.AMVisIsAMSTicket!=false and AMVisSubStatus in ('Research','Internal Assistance','Customer Update','Internal Review','Internal Update','Initial Review','Customer Update') union Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN'  and AMVisAssignedTeam ='' and Beginswith(t.AMVisPriority ,'P',true) and t.AMVisIsAMSTicket!=false and AMVisSubStatus in ('Research','Internal Assistance','Customer Update','Internal Review','Internal Update','Initial Review','Customer Update')";}
var finalQuery3 = queryTransform3();

data.append("query", finalQuery3);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("PendingSRs").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
function queryTransformtask() { return "SELECT count(*)  FROM amvis.analytics.fact.AMVisTicketEffort te JOIN ariba.analytics.dimension.Time t USING te.AMVisStartDate JOIN amvis.analytics.dimension.AMVisAccount acc USING te.AMVisAccount JOIN ariba.analytics.dimension.UserData ud USING te.AMVisUser WHERE (t.Day between DATE('2019-01-01 00:00:00 PDT') and DATE('2019-12-31 00:00:00 PDT')) and acc.ShortName='"+mytext+"' GROUP BY acc.ShortName,acc.AMVisSOProjectId";}
var finalQueryTask = queryTransformtask();

data.append("query", finalQueryTask);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("TotalTaskReporter").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
function queryTransform() { return " Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN'  and AMVisAssignedTeam ='GS APP MGMT' and t.AMVisIsAMSTicket!=false UNION Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN'  and AMVisAssignedTeam ='' and t.AMVisIsAMSTicket!=false";}
var finalQuery4 = queryTransform();

data.append("query", finalQuery4);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("TotalSRs").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
 function P1(){ return " Select count(this) from AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN' AND beginswith(AMVisPriority, 'P1', true) and AMVisAssignedTeam ='GS APP MGMT' and AMVisDateClosed IS NULL UNION ALL Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN' AND beginswith(AMVisPriority, 'P1', true) AND t.AMVisQueue in ('APP_MGMT','APP_MAINT_L3I','APP_MAINT_L2P','APP_MAINT_L3P') and AMVisDateClosed IS NULL and t.AMVisIsAMSTicket!=false";}
var finalQuery5 = P1();

data.append("query", finalQuery5);
data.append("query", "");
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	$('#P1Tile').css('width',replaced + "%");
	document.getElementById("P1").innerHTML =
            replaced ;

  }

});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
 function P2(){ return " Select count(this) from AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN' AND beginswith(AMVisPriority, 'P2', true) and AMVisAssignedTeam ='GS APP MGMT' and AMVisDateClosed IS NULL UNION ALL Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN' AND beginswith(AMVisPriority, 'P2', true) AND t.AMVisQueue in ('APP_MGMT','APP_MAINT_L3I','APP_MAINT_L2P','APP_MAINT_L3P') and AMVisDateClosed IS NULL and t.AMVisIsAMSTicket!=false";}
var finalQuery6 = P2();

data.append("query", finalQuery6);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	$('#P2Tile').css('width',replaced + "%");
	document.getElementById("P2").innerHTML =
            replaced ;


  }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
 function P3(){ return " Select count(this) from AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN' AND beginswith(AMVisPriority, 'P3', true) and AMVisAssignedTeam ='GS APP MGMT' and AMVisDateClosed IS NULL UNION ALL Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN' AND beginswith(AMVisPriority, 'P3', true) AND t.AMVisQueue in ('APP_MGMT','APP_MAINT_L3I','APP_MAINT_L2P','APP_MAINT_L3P') and AMVisDateClosed IS NULL and t.AMVisIsAMSTicket!=false";}
var finalQuery7 = P3();

data.append("query", finalQuery7);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	$('#P3Tile').css('width',replaced + "%");
	document.getElementById("P3").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
function P4(){ return " Select count(this) from AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN' AND beginswith(AMVisPriority, 'P4', true) and AMVisAssignedTeam ='GS APP MGMT' and AMVisDateClosed IS NULL UNION ALL Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN' AND beginswith(AMVisPriority, 'P4', true) AND t.AMVisQueue in ('APP_MGMT','APP_MAINT_L3I','APP_MAINT_L2P','APP_MAINT_L3P') and AMVisDateClosed IS NULL and t.AMVisIsAMSTicket!=false";}
var finalQuery8 = P4();

data.append("query", finalQuery8);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	$('#P4Tile').css('width',replaced + "%");
	document.getElementById("P4").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var app = angular.module('plunker', ['nvd3']);


app.controller('SRBacklogData',function($scope,$http) {
$scope.customer = mytext;
function queryModification() { return " SELECT 'Backlog', tm.AMVisWeekString, SUM(CASE t.AMVisDateClosed WHEN NULL THEN 1 ELSE CASE SIGN(t.AMVisDateClosed - tm.AMVisDate) WHEN -1 THEN 0 ELSE 1 END END) FROM config.amvis.core.AMVisTicket t, config.amvis.core.AMVisTime tm WHERE t.AMVisAccount.AMVisShortName = '"+$scope.customer+"' AND (CurrentDate() - tm.AMVisDate < 70 AND tm.AMVisDate  < CurrentDate()) AND (t.AMVisDateClosed IS NULL ) AND (CurrentDate() - tm.AMVisDate < 70) AND t.AMVisDateCreated < tm.AMVisDate AND tm.AMVisDayOfWeek = 1   and AMVisAssignedTeam ='GS APP MGMT' and t.AMVisIsAMSTicket!=false GROUP BY tm.AMVisWeekString ORDER BY tm.AMVisWeekString";}
$scope.querys = queryModification();

               $http({
				method : "POST",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url : "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData",
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj){
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
					return str.join("&");
				},
				data: { "query" : $scope.querys,
						"type" : "line",

					  }
				}).then(
				function mySucces(response) {
					$scope.data = response.data;
				},
                function myError(response) {
					$scope.data = response.statusText;
				})

  $scope.options = {
           chart: {
						"type": "lineChart",
						"showLabels": false,
						"showLegend": true,
						showControls: false,
						useInteractiveGuideline: true,
						x: (function(d) { return d.idx }),
						y: (function(d) { return d.y }),
						margin: {
							right: 50
						},


			   }
        };
});

app.controller('WTA',function($scope, $http) {
$scope.customer = mytext;
function queryModification() { return " SELECT 'Open', CONVERT(varchar,DATEPART(yy,att.ati_AMVisDateCreated)) + ' Week ' +  RIGHT('0' + CAST(datepart(week,att.ati_AMVisDateCreated) AS VARCHAR(2)),2), count(*) FROM dbo.AMVisTicketTab  att INNER JOIN AMVisAccountTab acc ON (att.ati_AMVisAccount=acc.rootId)  WHERE acc.aac_AMVisShortName = '"+$scope.customer+"' AND att.ati_AMVisDateCreated > GETDATE() - 70 GROUP BY CONVERT(varchar,DATEPART(yy,att.ati_AMVisDateCreated)) + ' Week ' +  RIGHT('0' + CAST(datepart(week,att.ati_AMVisDateCreated) AS VARCHAR(2)),2)  UNION ALL SELECT 'Closed', CONVERT(varchar,DATEPART(yy,att.ati_AMVisDateClosed)) + ' Week ' +  RIGHT('0' + CAST(datepart(week,att.ati_AMVisDateClosed) AS VARCHAR(2)),2), count(*) FROM dbo.AMVisTicketTab att INNER JOIN AMVisAccountTab acc ON (att.ati_AMVisAccount=acc.rootId)  WHERE acc.aac_AMVisShortName = '"+$scope.customer+"' AND att.ati_AMVisDateClosed > GETDATE() - 70 GROUP BY CONVERT(varchar,DATEPART(yy,att.ati_AMVisDateClosed)) + ' Week ' +  RIGHT('0' + CAST(datepart(week,att.ati_AMVisDateClosed) AS VARCHAR(2)),2)  ORDER BY 2 ";}
$scope.querys = queryModification();

               $http({
				method : "POST",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url : "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData",
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj){
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
					return str.join("&");
				},
				data: { "query" : $scope.querys,
						"type" : "stackedArea",
                        "useSQL":	"true",
					  }
				}).then(
				function mySucces(response) {
					$scope.data = response.data;
				},
                function myError(response) {
					$scope.data = response.statusText;
				})

  $scope.options = {
           chart: {
						"type": "multiBarChart",
						clipEdge: true,
						"color":['#FFDF00','#808080'],
						"height": 500,
						
						margin: {
							bottom: 120
						},
						reduceXTicks: false,
						"showLabels": true,
						"showLegend": true,
						x: (function(d) { return d.x }),
						y: (function(d) { return d.y }),
						xAxis: {
							rotateLabels: -45
						}
					}
        };
});

var data = new FormData();
 function CustomerTicketsWithAMS(){ return " Select t.AMVisSRNumber as \"SR Number\",AMVisAssignedTo.Name.PrimaryString AS \"AssignedTo\",CASE t.AMVisAssignedTo.Supervisor.Name.PrimaryString WHEN 'Krishna Kuchimanchi' THEN 'AMERICAS' WHEN 'Tony Wu' THEN 'AMERICAS' WHEN 'Lukas Gunar' THEN 'EMEA' WHEN 'Michal Scerbak' THEN 'EMEA' WHEN 'Erik Ivancak' THEN 'EMEA' WHEN 'Krishna Veerappa' THEN 'APJ' WHEN 'Samir Sato' THEN 'APJ' ELSE 'GLOBAL' END as \"TeamLocation\",SUBSTRING(t.AMVisDescription,0,40) AS \"Description\",SUBSTRING(t.AMVisPriority,0,3) AS \"Priority\",ROUND(CurrentDate()-t.AMVisDateUpdated) as \"PendingDays\" FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' AND AMVisSubStatus = 'TSS' AND t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisDateClosed is null and t.AMVisIsAMSTicket!=false ORDER BY t.AMVisDateUpdated ASC";}
var ticketsWithAMS = CustomerTicketsWithAMS();

data.append("query", ticketsWithAMS);
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

    $('#PendingClosureTable').dataTable({
    "aaData": NAC,
	columnDefs: [{
                    targets: 0,
                    render: function(data, type, row, meta) {
                        if (type === 'display') {
                            data = '<a href="https://support.wdf.sap.corp/sap/support/message/' + encodeURIComponent(data) + '">' + data + '</a>';
                        }

                        return data;
                    },


                },
				{
                    targets: 1,
                    render: function(data, type, row, meta) {
                        if (type === 'display') {
                            data = '<a href="http://ams.ariba.com/sr/dashboard/user-dashboard.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                        }

                        return data;
                    },

                },
				{
                targets: 5,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                      data =  (Math.round(data));
                    }
                   return data; 
                }
            },

            ]


});
  }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);


var data = new FormData();
 function CustomerTicketsWithTSS(){ return " Select distinct t.AMVisSRNumber as \"SR Number\", t.AMVisDateCreated, CASE AssignedTo when null then '' else AssignedTo.Name.PrimaryString end AS \"AssignedTo\",CASE Supervisor.Name.PrimaryString when null then ''   WHEN 'Krishna Kuchimanchi' THEN 'AMERICAS' WHEN 'Tony Wu' THEN 'AMERICAS' WHEN 'Lukas Gunar' THEN 'EMEA' WHEN 'Michal Scerbak' THEN 'EMEA' WHEN 'Erik Ivancak' THEN 'EMEA' WHEN 'Krishna Veerappa' THEN 'APJ' WHEN 'Samir Sato' THEN 'APJ' ELSE 'GLOBAL' END as \"TeamLocation\", SUBSTRING(t.AMVisDescription, 0, 40) AS \"Description\", SUBSTRING(t.AMVisPriority, 0, 3) AS \"Priority\", ROUND((CurrentDate()-t.AMVisDateUpdated)) as \"PendingDays\", t.AMVisSubStatus \"Status\",t.AMVisTimeToSLA as \"SLA\" FROM config.amvis.core.AMVisTicket t left outer JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount left outer JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo left outer join  ariba.user.core.User as Supervisor using AssignedTo.Supervisor WHERE t.AMVisStatus = 'OPEN' AND acc.AMVisShortName = '"+mytext+"' and t.AMVisIsAMSTicket!=false";}
var ticketsWithTSS = CustomerTicketsWithTSS();

data.append("query", ticketsWithTSS);
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

    $('#OpenTickets').dataTable({
    "aaData": NAC,
	columnDefs: [{
                    targets: 0,
                    render: function(data, type, row, meta) {
                        if (type === 'display') {
                            data = '<a href="https://support.wdf.sap.corp/sap/support/message/' + encodeURIComponent(data) + '">' + data + '</a>';
                        }

                        return data;
                    },

                },
				{
                    targets: 2,
                    render: function(data, type, row, meta) {
                        if (type === 'display') {
                            data = '<a href="http://ams.ariba.com/sr/dashboard/user-dashboard.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                        }

                        return data;
                    },

                },
				{
                targets: 6,
                render: function ( data, type, row, meta ) {
						if(type === 'display'){
						  data =  (Math.round(data));
						}
						return data; 
					}
				},
				{
			    targets: 8,
				render: function ( data, type, row, meta ) {
																									
																									  
					var value=(Math.round(data)/60);
																									
				    if(value<0){
				        data="<div class='redCircle'></div>";
								}
																									
					if(value>1){
					    data="<div class='greenCircle'></div>";
					}
																									
					if(value>0 && value<=1){
						data="<div class='orangeCircle'></div>";
		            }
																									
					if(value==0){
						data="<div class='blueCircle'></div>";
								}
																									
					return data; 
															}
				}

            ]


});
  }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
function InactiveTickets(){ return " Select t.AMVisSRNumber as \"SR Number\",AMVisAssignedTo.Name.PrimaryString AS \"AssignedTo\",CASE t.AMVisAssignedTo.Supervisor.Name.PrimaryString WHEN 'Krishna Kuchimanchi' THEN 'AMERICAS' WHEN 'Tony Wu' THEN 'AMERICAS' WHEN 'Lukas Gunar' THEN 'EMEA' WHEN 'Michal Scerbak' THEN 'EMEA' WHEN 'Erik Ivancak' THEN 'EMEA' WHEN 'Krishna Veerappa' THEN 'APJ' WHEN 'Samir Sato' THEN 'APJ' ELSE 'GLOBAL' END as \"TeamLocation\",SUBSTRING(t.AMVisDescription,0,40) AS \"Description\",SUBSTRING(t.AMVisPriority,0,3) AS \"Priority\",Round((CurrentDate()-t.AMVisDateUpdated)) as \"PendingDays\" FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' AND (CurrentDate()- t.AMVisDateUpdated) > 10 AND t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisAssignedTeam ='GS APP MGMT' and t.AMVisIsAMSTicket!=false AND AMVisDateClosed is null ORDER BY t.AMVisDateUpdated ";}
var InactiveTickets = InactiveTickets();

data.append("query",InactiveTickets);
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

    $('#InactiveOpenTickets').dataTable({
    "aaData": NAC,
	columnDefs: [{
                    targets: 0,
                    render: function(data, type, row, meta) {
                        if (type === 'display') {
                            data = '<a href="https://support.wdf.sap.corp/sap/support/message/' + encodeURIComponent(data) + '">' + data + '</a>';
                        }

                        return data;
                    },

                },
				{
                    targets: 1,
                    render: function(data, type, row, meta) {
                        if (type === 'display') {
                            data = '<a href="http://ams.ariba.com/sr/dashboard/user-dashboard.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                        }

                        return data;
                    },

                },
				{
                targets: 5,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                      data =  (Math.round(data));
                    }
                   return data; 
                }
                },

            ]


});
  }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
 function CustomerOpenTickets(){ return " Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P1 - VERY HIGH' and t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus='OPEN' Group By t.AMVisPriority union all Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P2 - HIGH' and t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus='OPEN' Group By t.AMVisPriority union all Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P3 - MEDIUM' and t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus='OPEN' Group By t.AMVisPriority union all Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P4 - LOW' and t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus='OPEN' and t.AMVisQueue is not null and AMVisDateClosed IS NULL and t.AMVisAccount.AMVisShortName = '"+mytext+"' Group By t.AMVisPriority";}
var ticketsOpenwithAMS = CustomerOpenTickets();

data.append("query", ticketsOpenwithAMS);
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

    $('#CustomerOpenTickets').dataTable({
    "aaData": NAC,
	columnDefs: [

            ]
										});
	
		

  }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);




app.controller('SLAController', function($scope, $http) {
    $scope.customer = mytext;

    function queryModifications() {
        return " Select 'INSLA','P1',SUM (CASE SIGN(t.AMVisTimeToSLA) WHEN -1 THEN 0 ELSE 1 END) FROM config.amvis.core.AMVisTicket t WHERE t.AMVisStatus ='OPEN' AND t.AMVisPriority = 'P1 - VERY HIGH' AND CurrentDate() - AMVisDateUpdated <= 30 AND t.AMVisAccount.AMVisShortName = '" + $scope.customer + "'  UNION ALL Select 'NotInSLA','P1',SUM (CASE SIGN(t.AMVisTimeToSLA) WHEN -1 THEN -1 ELSE 0 END) FROM config.amvis.core.AMVisTicket t WHERE t.AMVisStatus ='OPEN' AND t.AMVisPriority = 'P1 - VERY HIGH' AND CurrentDate() - AMVisDateUpdated <= 30 AND t.AMVisAccount.AMVisShortName = '" + $scope.customer + "'  UNION ALL Select 'INSLA','P2',SUM (CASE SIGN(t.AMVisTimeToSLA) WHEN -1 THEN 0 ELSE 1 END) FROM config.amvis.core.AMVisTicket t WHERE t.AMVisStatus ='OPEN' AND t.AMVisPriority = 'P2 - HIGH' AND CurrentDate() - AMVisDateUpdated <= 30 AND t.AMVisAccount.AMVisShortName = '" + $scope.customer + "'  UNION ALL Select 'NotInSLA','P2',SUM (CASE SIGN(t.AMVisTimeToSLA) WHEN -1 THEN -1 ELSE 0 END) FROM config.amvis.core.AMVisTicket t WHERE t.AMVisStatus ='OPEN' AND t.AMVisPriority = 'P2 - HIGH' AND CurrentDate() - AMVisDateUpdated <= 30 AND t.AMVisAccount.AMVisShortName = '" + $scope.customer + "'  UNION ALL Select 'INSLA','P3',SUM (CASE SIGN(t.AMVisTimeToSLA) WHEN -1 THEN 0 ELSE 1 END) FROM config.amvis.core.AMVisTicket t WHERE t.AMVisStatus ='OPEN' AND t.AMVisPriority = 'P3 - MEDIUM' AND CurrentDate() - AMVisDateUpdated <= 30 AND t.AMVisAccount.AMVisShortName = '" + $scope.customer + "'  UNION ALL Select 'NotInSLA','P3',SUM (CASE SIGN(t.AMVisTimeToSLA) WHEN -1 THEN -1 ELSE 0 END) FROM config.amvis.core.AMVisTicket t WHERE t.AMVisStatus ='OPEN' AND t.AMVisPriority = 'P3 - MEDIUM' AND CurrentDate() - AMVisDateUpdated <= 30 AND t.AMVisAccount.AMVisShortName = '" + $scope.customer + "'  UNION ALL Select 'INSLA','P4',SUM (CASE SIGN(t.AMVisTimeToSLA) WHEN -1 THEN 0 ELSE 1 END) FROM config.amvis.core.AMVisTicket t WHERE t.AMVisStatus ='OPEN' AND t.AMVisPriority = 'P4 - LOW' AND CurrentDate() - AMVisDateUpdated <= 30 AND t.AMVisAccount.AMVisShortName = '" + $scope.customer + "'  UNION ALL Select 'NotInSLA','P4',SUM (CASE SIGN(t.AMVisTimeToSLA) WHEN -1 THEN -1 ELSE 0 END) FROM config.amvis.core.AMVisTicket t WHERE t.AMVisStatus ='OPEN' AND t.AMVisPriority = 'P4 - LOW' AND CurrentDate() - AMVisDateUpdated <= 30 AND t.AMVisAccount.AMVisShortName = '" + $scope.customer + "' ";
    }
    $scope.queryf = queryModifications();

    $http({
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData",
        transformRequest: function(obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        },
        data: {
            "query": $scope.queryf,
            "type": "line",
            "useSQL": " ",
        }
    }).then(
        function mySucces(response) {
            $scope.data = response.data;
        },
        function myError(response) {
            $scope.data = response.statusText;
        })

    $scope.options = {
        chart: {
            "type": "multiBarHorizontalChart",
            clipEdge: true,
            "color":['#FFDF00','#808080'],
            "height": 500,
            "showLabels": true,
            "showLegend": true,
			stacked: false,
			showValues: true
            
        }
		
    };
});



var  computeACV=function(){

var startDate=$("#startDate").val();
var endDate=$("#endDate").val();

var tcv=parseFloat($("#totalContractValue").val());


if(startDate!="" && endDate!="" && !isNaN(tcv)){
	var a = moment(startDate, "MM/DD/YYYY");
	var b = moment(endDate, "MM/DD/YYYY");

	var years = b.diff(a, 'year');
	console.log(years);

	if(years!=0 && years!=1)
	$("#annualContractValue").val((tcv/years).toFixed(2));

 }

 if(isNaN(tcv)){
 	$("#annualContractValue").val(0.0);
 }




	
}


app.controller("contractSave",function($scope,$http){

    scope=$scope;
    $scope.contract={
    	"sowTitle":"",
    	"sowNumber":"",
    	"startDate":"",
    	"endDate":"",
    	"totalContractValue":"",
    	"annualContractValue":"",
    	"currency":"NA"
    } ;

    $scope.invoice={};
    $scope.inviceArray=[];
    $scope.invoiceTotal=0;
    //$scope.macthed=false;

    $scope.myForm = { macthed: false };

   var startDate =  $("#startDate").datepicker({format: "dd/mm/yyyy",
    startDate: "01/01/1970",
    endDate: "01/01/2020",
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
   }).on('changeDate', function(ev) {
    //startDate.hide();
    $scope.contract.startDate =  $("#startDate").val();
    $scope.$apply();
    computeACV();
    });

	var  endDate =$("#endDate").datepicker({format: "dd/mm/yyyy",
    startDate: "01/01/1970",
    endDate: "01/01/2020",
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
	}).on('changeDate', function(ev) {
    //endDate.hide();
    $scope.contract.endDate = $("#endDate").val();
    $scope.$apply();
    computeACV();
	});


	
	$("#inDate").datepicker({format: "dd/mm/yyyy",
    startDate: "01/01/1970",
    endDate: "01/01/2020",
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
	}).on('changeDate', function(ev) {
    //endDate.hide();
    //$scope.contract.endDate = $("#endDate").val();
    //$scope.$apply();
	});


	$scope.computeACVInside=function(){
		computeACV();
	}

	$scope.addInvoice=function(){


		var invoice=[];

		invoice[0]=$("#inDate").val();
		invoice[1]=$("#invoiceAmount").val();

		$scope.inviceArray.push(invoice);

		$scope.invoiceTotal=parseInt($scope.invoiceTotal)+parseInt($("#invoiceAmount").val());

		$("#invoiceTable").dataTable().fnDestroy();
        $("#invoiceTable").dataTable({aaData:$scope.inviceArray,"bFilter": false ,"bPaginate": false});


        if($scope.invoiceTotal==parseInt($("#totalContractValue").val()))
         $scope.myForm.macthed=true;
       

        $scope.$digest();

	}

	$scope.saveContract=function(){
       //debugger;
		console.log("saveContract Called"+$scope.contract);

		var fdata = {};
            fdata["account"]=uniqueName;
            fdata["isSave"]=true;
            fdata["sowTitle"]=$scope.contract["sowTitle"]==""? "NA" :$scope.contract["sowTitle"] ;
            fdata["sowNumber"]=$scope.contract["sowNumber"]==""?"NA":$scope.contract["sowNumber"];
            fdata["startDate"]=$scope.contract["startDate"]==""? "01/01/1970":$scope.contract["startDate"];
            fdata["endDate"]=$scope.contract["endDate"]==""? "01/01/1970":$scope.contract["endDate"];
            fdata["totalContractValue"]=$scope.contract["totalContractValue"]==""?"0":$scope.contract["totalContractValue"];
            fdata["annualContractValue"]=$scope.contract["annualContractValue"]==""?"0":$scope.contract["annualContractValue"];
            fdata["currency"]=$scope.contract["currency"]==""?"NA":$scope.contract["currency"];
            fdata["invoiceArray"]=$scope.inviceArray ;

        $http({
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData",
        transformRequest: function(obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        },
        data: fdata
    }).then(
        function mySucces(response) {
            $scope.data = response.data;
            //alert("mySucces");
            $("div#myModal").modal('hide');
            $.notify({
                icon: 'ti-success',
                message: "Contract Saved Successfully"

            },{
                type: 'success',
                timer: 400
            });

            loadContractTable();
        },
        function myError(response) {
            $scope.data = response.statusText;
            $("div#myModal").modal('hide');
        })

   
		
	}

	$scope.updateContract=function(){

		console.log("updateContract Called");

		//console.log("saveContract Called"+$scope.contract);

		var fdata = {};
            //fdata["account"]=uniqueName;
            fdata["isLookup"]=true;
            fdata["sowTitle"]=$("#sowTitle").val()==""? "NA" :$("#sowTitle").val() ;
            fdata["sowNumber"]=$("#sowNumber").val()==""?"NA":$("#sowNumber").val();
            fdata["startDate"]=$("#startDate").val()==""? "01/01/1970":$("#startDate").val();
            fdata["endDate"]=$("#endDate").val()===""? "01/01/1970":$("#endDate").val();
            fdata["totalContractValue"]=$("#totalContractValue").val()==""?"0":$("#totalContractValue").val();
            fdata["annualContractValue"]=$("#annualContractValue").val()==""?"0":$("#annualContractValue").val();
            fdata["currency"]=$("#currency").val()==""?"NA":$("#currency").val();

            fdata["uniqueName"]=document.getElementById("uniqueName").value;

        $http({
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData",
        transformRequest: function(obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        },
        data: fdata
    	}).then(
        function mySucces(response) {
            //$scope.data = response.data;
              $("div#myModal").modal('hide');
              $.notify({
                icon: 'ti-success',
                message: "Contract Updated Successfully"

            },{
                type: 'success',
                timer: 400
            });
            loadContractTable();
        },
        function myError(response) {
            //$scope.data = response.statusText;
             $("div#myModal").modal('hide');
        });


	}


});



/*$( document ).on( "myCustomEvent", {
    foo: "bar"
}, function( event, arg1, arg2 ) {
    console.log( event.data.foo ); // "bar"
    console.log( arg1 );           // "bim"
    console.log( arg2 );           // "baz"
});*/

function addContact(){

	//$( document ).trigger( "myCustomEvent", [ "bim", "baz" ] );

	$("#sowTitle").val("");
	$("#sowNumber").val("");
	$("#startDate").val("");
	$("#endDate").val("");
	$("#totalContractValue").val("");
	$("#annualContractValue").val("");
    $("#currency").val("");
    $("#uniqueName").val("");

    $("#inDate").val("");
    $("#invoiceAmount").val("");

    scope.inviceArray=[];
	scope.invoiceTotal=0;
	scope.myForm.macthed=false;
	scope.$digest();

    $("#invoiceTable").dataTable().fnDestroy();
    $("#invoiceTable").dataTable({aaData:[],"bFilter": false ,"bPaginate": false});
    $("#myModal").find(".save").show();
    $("#myModal").find(".update").hide();
    $("#myModal").modal();

}

function editContract(data){

	var d=data.split(",");

	$("#sowTitle").val(d[0]);
	$("#startDate").val( moment(d[1]).format("DD/MM/YYYY"));
	$("#endDate").val(moment(d[2]).format("DD/MM/YYYY"));
	$("#totalContractValue").val(d[3]);
	$("#annualContractValue").val(d[4]);
    $("#currency").val(d[5]);
    $("#uniqueName").val(d[6]);
    $("#sowNumber").val(d[7]);


    var data = new FormData();

	var contacrtInfo = "select AMVisInvoiceTitle,AMVisInvoiceStartDate,AMVisInvoiceEndDate,AMVisTotalInvoiceValue,AMVisCurrency from config.amvis.core.AMVisContractInvoices";

	data.append("query", contacrtInfo);
	data.append("useSQL", "");
	data.append("type", "table");

			var xhr = new XMLHttpRequest();

			xhr.addEventListener("readystatechange", function () {
			  if (this.readyState === 4) {
				 

				var NAC =JSON.parse(this.responseText);
				var NAC2 = NAC.shift();
				
				//$("#invoiceTable").dataTable({"aaData": [],"bFilter": false ,"bPaginate": false});
				$("#invoiceTable").dataTable().fnDestroy();
				$("#invoiceTable").dataTable({aaData:NAC,"bFilter": false ,"bPaginate": false});
				$("#myModal").find(".save").hide();
    			$("#myModal").find(".update").show();
				//$("#myModal").find(".save").hide();
				$("#myModal").modal();

			  }
			});


			xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


			xhr.send(data);
	

	//$("#myModal").show();
}

function deleteContract(data){

	   $("#confirm-delete").modal();

	   var d=data.split(",");
	   $("#confirm-delete .contractTitle").text(d[0]);
	   $("#confirm-delete .uniqueName").val(d[6]);

	   $('#confirm-delete .btn-ok').on('click', function(e) {
	   
	   console.log("delete Contract Called");   

		/*var fdata = {};
            //fdata["account"]=uniqueName;
        fdata["isDelete"]=true;
        fdata["uniqueName"]=d[6];*/

        var data = new FormData();

		//var contacrtInfo = "select AMVisSOWTitle,AMVisContractStartDate,AMVisContractEndDate,AMVisTotalContractValue,AMVisAnnualContractValue,AMVisCurrency,AMVisContractUniqueName from config.amvis.core.AMVisCustomerContracts where AMVisAccount='"+uniqueName+"'";

		data.append("is_delete", true);
		data.append("uniqueName", $("#confirm-delete .uniqueName").val());
		//data.append("type", "table");

		var xhr = new XMLHttpRequest();

		xhr.addEventListener("readystatechange", function () {
		  if (this.readyState === 4) {
			  
			//console.log(this.responseText);
			$("div#confirm-delete").modal('hide');
			$.notify({
                icon: 'ti-success',
                message: "Contract deleted Successfully"

            },{
                type: 'success',
                timer: 400
            });
            loadContractTable();

		  }
		});

		xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");

		xhr.send(data);

	});

	   


}



function loadContractTable(){

var data = new FormData();

var contacrtInfo = "select AMVisSOWTitle,AMVisContractStartDate,AMVisContractEndDate,AMVisTotalContractValue,AMVisAnnualContractValue,AMVisCurrency,AMVisContractUniqueName,AMVisSONumber from config.amvis.core.AMVisCustomerContracts where AMVisAccount='"+uniqueName+"'";

data.append("query", contacrtInfo);
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();

//var contractTable;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
	  
	  //debugger;

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

	$("#contractInformation").dataTable().fnDestroy();
	
	$("#contractInformation")
	.dataTable({
		"aaData": NAC,
		"bFilter": false ,
		"bPaginate": false,
	    columnDefs: [{
                    targets: 0,
                    render: function(data, type, row, meta) {
                        if (type === 'display') {
                        	 row="'"+row+"'";
                             data = '<a onclick="editContract('+row+')" href="javascript:void(0);">'+data+'</a>';
                        }

                        return data;
                    }

                },{
                    targets: 1,
                    "orderable": false,
                    render: function(data, type, row, meta) {
                        if (type === 'display') {

                             data = moment(data).format("DD/MM/YYYY");
                        }

                        return data;
                    }

                },{
                    targets: 2,
                    "orderable": false,
                    render: function(data, type, row, meta) {
                        if (type === 'display') {
                        	 
                             data = moment(data).format("DD/MM/YYYY")
                        }

                        return data;
                    }

                },{
                    targets: 6,
                    "orderable": false,
                    render: function(data, type, row, meta) {
                        if (type === 'display') {
                        	 row="'"+row+"'";
                             data = '<button onclick="deleteContract('+row+')" class="btn btn-danger"><i class="ti-trash"></i></button>';
                        }

                        return data;
                    }

                }]
            });

  }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);


}

loadContractTable();



setTimeout(function(){
	//var data=[];
	//$("#contractInformation").dataTable({aaData:data,"bFilter": false ,"bPaginate": false});
	//$("#startDate").datepicker({});
	//$("#endDate").datepicker({});
	
},100);


