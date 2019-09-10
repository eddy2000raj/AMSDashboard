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

var data = new FormData();
function queryTransformx() { return " Select count(this) from AMVisTicket t  WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and (CurrentDate() - t.AMVisDateCreated < 365)  and AMVisAssignedTeam ='GS APP MGMT'";}
var finalQueryz = queryTransformx();
data.append("query", finalQueryz);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("total365").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);


var data = new FormData();
function queryTransform1() { return " Select count(this) from AMVisTicket t  WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and (CurrentDate() - t.AMVisDateCreated < 30) and AMVisStatus = 'OPEN' and AMVisAssignedTeam ='GS APP MGMT' ";}
var finalQuery1 = queryTransform1();

data.append("query", finalQuery1);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("demo1").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
function queryTransform2() { return " Select count(this) from AMVisTicket t  Where t.AMVisAccount.AMVisShortName = '"+mytext+"' and (CurrentDate() - t.AMVisDateClosed < 30) and AMVisStatus = 'CLOSED' and AMVisAssignedTeam ='GS APP MGMT'";}
var finalQuery2 = queryTransform2();

data.append("query",finalQuery2) ;
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("demo2").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
function queryTransform3() { return " Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN'  and AMVisAssignedTeam ='GS APP MGMT' and Beginswith(t.AMVisPriority ,'P',true) and AMVisDateClosed IS NULL ";}
var finalQuery3 = queryTransform3();

data.append("query", finalQuery3);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("demo3").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
function queryTransform() { return " Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN'  and AMVisAssignedTeam ='GS APP MGMT' and AMVisDateClosed IS NULL";}
var finalQuery4 = queryTransform();

data.append("query", finalQuery4);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("demo4").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
 function P1(){ return " Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN' AND beginswith (AMVisPriority ,'P1',true)  and AMVisAssignedTeam ='GS APP MGMT' and AMVisDateClosed IS NULL";}
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
	$('#test').css('width',replaced + "%");
	document.getElementById("P1").innerHTML =
            replaced ;

  }

});


xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
 function P2(){ return " Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN' AND beginswith (AMVisPriority ,'P2',true)  and AMVisAssignedTeam ='GS APP MGMT' and AMVisDateClosed IS NULL";}
var finalQuery6 = P2();

data.append("query", finalQuery6);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	$('#test2').css('width',replaced + "%");
	document.getElementById("P2").innerHTML =
            replaced ;


  }
});


xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
 function P3(){ return " Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN' AND beginswith (AMVisPriority ,'P3',true)  and AMVisAssignedTeam ='GS APP MGMT' and AMVisDateClosed IS NULL";}
var finalQuery7 = P3();

data.append("query", finalQuery7);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	$('#test3').css('width',replaced + "%");
	document.getElementById("P3").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
function P4(){ return " Select count(this) from AMVisTicket t WHERE t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisStatus = 'OPEN' AND beginswith (AMVisPriority ,'P4',true)  and AMVisAssignedTeam ='GS APP MGMT' and AMVisDateClosed IS NULL";}
var finalQuery8 = P4();

data.append("query", finalQuery8);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	$('#test4').css('width',replaced + "%");
	document.getElementById("P4").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var app = angular.module('plunker', ['nvd3']);


app.controller('MainCtrl',function($scope,$http) {
$scope.customer = mytext;
function queryModification() { return " SELECT 'Backlog', tm.AMVisWeekString, SUM(CASE t.AMVisDateClosed WHEN NULL THEN 1 ELSE CASE SIGN(t.AMVisDateClosed - tm.AMVisDate) WHEN -1 THEN 0 ELSE 1 END END) FROM config.amvis.core.AMVisTicket t, config.amvis.core.AMVisTime tm WHERE t.AMVisAccount.AMVisShortName = '"+$scope.customer+"' AND (CurrentDate() - tm.AMVisDate < 70 AND tm.AMVisDate  < CurrentDate()) AND (t.AMVisDateClosed IS NULL ) AND (CurrentDate() - tm.AMVisDate < 70) AND t.AMVisDateCreated < tm.AMVisDate AND tm.AMVisDayOfWeek = 1   and AMVisAssignedTeam ='GS APP MGMT' GROUP BY tm.AMVisWeekString ORDER BY tm.AMVisWeekString ";}
$scope.querys = queryModification();

               $http({
				method : "POST",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url : "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData",
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

app.controller('MainCtrl1',function($scope, $http) {
$scope.customer = mytext;
function queryModification() { return " SELECT 'Open', CONVERT(varchar,DATEPART(yy,att.ati_AMVisDateCreated)) + ' Week ' +  RIGHT('0' + CAST(datepart(week,att.ati_AMVisDateCreated) AS VARCHAR(2)),2), count(*) FROM dbo.AMVisTicketTab  att INNER JOIN AMVisAccountTab acc ON (att.ati_AMVisAccount=acc.rootId)  WHERE acc.aac_AMVisShortName = '"+$scope.customer+"' AND att.ati_AMVisDateCreated > GETDATE() - 70 GROUP BY CONVERT(varchar,DATEPART(yy,att.ati_AMVisDateCreated)) + ' Week ' +  RIGHT('0' + CAST(datepart(week,att.ati_AMVisDateCreated) AS VARCHAR(2)),2)  UNION ALL SELECT 'Closed', CONVERT(varchar,DATEPART(yy,att.ati_AMVisDateClosed)) + ' Week ' +  RIGHT('0' + CAST(datepart(week,att.ati_AMVisDateClosed) AS VARCHAR(2)),2), count(*) FROM dbo.AMVisTicketTab att INNER JOIN AMVisAccountTab acc ON (att.ati_AMVisAccount=acc.rootId)  WHERE acc.aac_AMVisShortName = '"+$scope.customer+"' AND att.ati_AMVisDateClosed > GETDATE() - 70 GROUP BY CONVERT(varchar,DATEPART(yy,att.ati_AMVisDateClosed)) + ' Week ' +  RIGHT('0' + CAST(datepart(week,att.ati_AMVisDateClosed) AS VARCHAR(2)),2)  ORDER BY 2 ";}
$scope.querys = queryModification();

               $http({
				method : "POST",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url : "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData",
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
						"width" : 700,
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
 function CustomerTicketsWithAMS(){ return " Select t.AMVisSRNumber as \"SR Number\",AMVisAssignedTo.Name.PrimaryString AS \"AssignedTo\",SUBSTRING(t.AMVisDescription,0,40) AS \"Description\",SUBSTRING(t.AMVisPriority,0,3) AS \"Priority\",ROUND(CurrentDate()-t.AMVisDateUpdated) as \"PendingDays\" FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' AND AMVisSubStatus = 'TSS' AND t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisDateClosed is null ORDER BY t.AMVisDateUpdated ASC";}
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
                targets: 4,
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


xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);


var data = new FormData();
 function CustomerTicketsWithTSS(){ return " Select t.AMVisSRNumber as \"SR Number\",AMVisAssignedTo.Name.PrimaryString AS \"AssignedTo\",SUBSTRING(t.AMVisDescription,0,40) AS \"Description\",SUBSTRING(t.AMVisPriority,0,3) AS \"Priority\",ROUND((CurrentDate()-t.AMVisDateUpdated)) as \"PendingDays\",t.AMVisSubStatus \"Status\" FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' AND t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisDateClosed is null ORDER BY t.AMVisDateUpdated ASC";}
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
                    targets: 1,
                    render: function(data, type, row, meta) {
                        if (type === 'display') {
                            data = '<a href="http://ams.ariba.com/sr/dashboard/user-dashboard.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                        }

                        return data;
                    },

                },
				{
                targets: 4,
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


xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
function InactiveTickets(){ return " Select t.AMVisSRNumber as \"SR Number\",AMVisAssignedTo.Name.PrimaryString AS \"AssignedTo\",SUBSTRING(t.AMVisDescription,0,40) AS \"Description\",SUBSTRING(t.AMVisPriority,0,3) AS \"Priority\",Round((CurrentDate()-t.AMVisDateUpdated)) as \"PendingDays\" FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' AND (CurrentDate()- t.AMVisDateUpdated) > 10 AND t.AMVisAccount.AMVisShortName = '"+mytext+"' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisDateClosed is null ORDER BY t.AMVisDateUpdated ";}
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
                targets: 4,
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


xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


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
        url: "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData",
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
            "width": 600,
            
            
            "showLabels": true,
            "showLegend": true,
			stacked: false,
			showValues: true
            
        }
		
    };
});