var app = angular.module('plunker', ['nvd3']);

app.controller('MainCtrl',function($scope, $http) {
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
				data: { query:" SELECT AMVisAccount.AMVisRegion, YEAR(AMVisDateCreated) , count() FROM AMVisTicket WHERE YEAR(AMVisDateCreated) > 2013  AND AMVisAccount.AMVisShortName != 'Ariba' GROUP BY  AMVisAccount.AMVisRegion, YEAR(AMVisDateCreated)  ORDER BY 2  ",
			           type: "stackedArea",
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
						"type": "stackedAreaChart",
						useInteractiveGuideline: true,
						
						"showLabels": false,
						"showLegend": false,
						x: (function(d) { return d.x }),
						y: (function(d) { return d.y })
					}
        }; 
});

app.controller('backlog',function($scope,$http) {

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
				data: { "query" : "SELECT 'Backlog',tm.AMVisWeekString,SUM(CASE t.AMVisDateClosed WHEN NULL THEN 1 ELSE CASE SIGN(t.AMVisDateClosed - tm.AMVisDate) WHEN -1 THEN 0 ELSE 1 END END) FROM config.amvis.core.AMVisTicket t,config.amvis.core.AMVisTime tm WHERE (CurrentDate() - tm.AMVisDate < 70 AND tm.AMVisDate < CurrentDate()) AND (t.AMVisDateClosed IS NULL OR CurrentDate() - t.AMVisDateClosed < 70) AND (CurrentDate() - tm.AMVisDate < 70) AND t.AMVisDateCreated < tm.AMVisDate AND tm.AMVisDayOfWeek=1 AND t.AMVisAssignedTeam='GS APP MGMT' GROUP BY tm.AMVisWeekString ORDER BY tm.AMVisWeekString",
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

app.controller('MainCtrl2',function($scope, $http) {
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
				data: { "query" : " SELECT SUBSTRING(AMVisPriority,0,4), count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND AMVisStatus = 'OPEN' AND AMVisAccount.AMVisShortName != 'Ariba' and AMVisAssignedTeam ='GS APP MGMT' and Beginswith(AMVisPriority ,'P',true) and AMVisDateClosed IS NULL GROUP BY SUBSTRING(AMVisPriority,0,4) ", 
						"type" : "pie", 
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
               "type": "pieChart",
			   "color":['#7ea4b3','#800060','#ff6961','#fdfd96'],
			   donut : false,
			   height : 350,
			   "showLabels": false,
			   "showLegend": false,
			   useInteractiveGuideline: false,
			   x: (function(d) { return d.key }),
			   y: (function(d) { return d.value })
				        
  
            }
        }; 
});


var form = new FormData();
form.append("query", "Select t.AMVisSRNumber,t.AMVisAccount.AMVisShortName,t.AMVisQueue,t.AMVisSubStatus,t.AMVisPriority,Round(CurrentDate() - t.AMVisDateCreated) as PendingDays From AMVisTicket t Where t.AMVisStatus='OPEN' and t.AMVisStatus !='Confirmed' and t.AMVisQueue in ('APP_MGMT','APP_MAINT_L3I','APP_MAINT_L2P','APP_MAINT_L3P') and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') and AMVisDateClosed IS NULL and AMVisAssignedTeam ='GS APP MGMT' Group By t.AMVisAccount.AMVisShortName,t.AMVisQueue,t.AMVisPriority,t.AMVisSubStatus,Round(CurrentDate() - t.AMVisDateCreated),t.AMVisSRNumber ");
form.append("type", "table");
form.append("useSQL", "");

var xhr = new XMLHttpRequest();
var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NA =JSON.parse(this.responseText);
	
	var NAC2 = NA.shift();
	
    $('#UTBC').dataTable({
    "aaData": NA,
	order: [[ 1, "asc" ]],
	
	columnDefs: [
            {
                targets:0,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a href="https://support.wdf.sap.corp/sap/support/message/' + encodeURIComponent(data) + '">' + data + '</a>';
                    }

                    return data;
                }
            },
			{
                targets:1,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a href="http://ams.ariba.com/sr/dashboard/customer.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                    }

                    return data;
                }
            },
			{
                targets:5,
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


xhr.send(form);


var form = new FormData();
form.append("query", "Select t.AMVisAccount.AMVisShortName,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as P1,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as P2,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as P3,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as P4,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisQueue WHEN 'APP_MGMT' THEN 1 ELSE 0 END Else 0 END) as APP_MGMT,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisQueue WHEN 'APP_MAINT_L3I' THEN 1 ELSE 0 END Else 0 END) as APP_MAINT_L3I,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisQueue WHEN 'APP_MAINT_L2P' THEN 1 ELSE 0 END Else 0 END) as APP_MAINT_L2P,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisQueue WHEN 'APP_MAINT_L3P' THEN 1 ELSE 0 END Else 0 END) as APP_MAINT_L3P,SUM(CASE t.AMVisStatus When 'OPEN' THEN 1 ELSE 0 END) as OpenTickets From AMVisTicket t Where t.AMVisStatus='OPEN' and t.AMVisQueue is not null and AMVisDateClosed IS NULL and AMVisAssignedTeam ='GS APP MGMT' and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') Group by t.AMVisAccount.AMVisShortName Order by t.AMVisAccount.AMVisShortName ASC ");
form.append("type", "table");
form.append("useSQL", "");

var xhr = new XMLHttpRequest();

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NA =JSON.parse(this.responseText);
	
	var NAC2 = NA.shift();
	
    $('#UTB').dataTable({
    "aaData": NA,
	order: [[ 1, "asc" ]],
	
	columnDefs: [
           
			{
                targets:0,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a href="http://ams.ariba.com/sr/dashboard/customer.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                    }

                    return data;
                }
            },
			
        ]
		 
});
  }
});
 

xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(form);

var form = new FormData();
form.append("query", "Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P1 - VERY HIGH' and AMVisStatus='OPEN' Group By t.AMVisPriority union all Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P2 - HIGH' and AMVisStatus='OPEN' Group By t.AMVisPriority union all Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P3 - MEDIUM' and AMVisStatus='OPEN' Group By t.AMVisPriority union all Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P4 - LOW' and AMVisStatus='OPEN' and t.AMVisQueue is not null and AMVisDateClosed IS NULL Group By t.AMVisPriority ");
form.append("type", "table");
form.append("useSQL", "");

var xhr = new XMLHttpRequest();

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NA =JSON.parse(this.responseText);
	
	var NAC2 = NA.shift();
	
    $('#Poss').dataTable({
    "aaData": NA,
	 "autoWidth": false
	
		 
});
  }
});
 

xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(form);


var data = new FormData();
data.append("query", "SELECT t.AMVisSRNumber AS \"SR Number\", acc.AMVisShortName AS \"Account\", SUBSTRING(t.AMVisDescription,0,40) AS \"Description\",SUBSTRING(t.AMVisPriority,0,3) AS \"Priority\", t.AMVisSubStatus AS \"SubStatus\", t.AMVisDateUpdated AS \"Last Activity\",t.AMVisDateCreated AS \"Create Date\" FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount WHERE t.AMVisStatus = 'OPEN' and t.AMVisSubStatus !='Resolved - Confirm' and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') and t.AMVisDateClosed IS NULL and t.AMVisAssignedTeam ='GS APP MGMT' ORDER BY t.AMVisDateUpdated ASC");
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NA =JSON.parse(this.responseText);
	var NAC2 = NA.shift();
	
    $('#example').dataTable({
    "aaData": NA,
	columnDefs: [
            {
                targets:0,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a href="https://support.wdf.sap.corp/sap/support/message/' + encodeURIComponent(data) + '">' + data + '</a>';
                    }

                    return data;
                }
            },
			{
                targets:1,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a href="http://ams.ariba.com/sr/dashboard/customer.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
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
data.append("query", "Select Distinct AMVisShortName,AMVisName,AMVisRegion from config.amvis.core.AMVisAccount Where AMVisRegion !='All'");
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NAS =JSON.parse(this.responseText);
	var NAC2 = NAS.shift();
	
    $('#example2').dataTable({
    "aaData": NAS,
	columnDefs: [
            {
                targets:0,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a href="http://ams.ariba.com/sr/dashboard/customer.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                    }

                    return data;
                }
            }
        ]
	
    
});
  }
});
 

xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);


var data = new FormData();
data.append("query", "SELECT t.AMVisSRNumber AS \"SR Number\",acc.AMVisShortName AS \"Account\",AssignedTo.Name.PrimaryString as AssignedTo,t.AMVisSubStatus AS \"SubStatus\",SUBSTRING(t.AMVisPriority,0,3) AS \"Priority\",ROUND((CurrentDate()-t.AMVisDateUpdated),0) as PendingDays FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') and (CurrentDate()-t.AMVisDateUpdated) >20 and AMVisDateClosed IS NULL and AMVisAssignedTeam ='GS APP MGMT' AND t.AMVisSubStatus not in ('Resolved - Close','Resolved - Confirm') ORDER BY t.AMVisDateUpdated ASC");
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();
	
    $('#example4').dataTable({
    "aaData": NAC,
     columnDefs: [
            {
                targets:0,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a href="https://support.wdf.sap.corp/sap/support/message/' + encodeURIComponent(data) + '">' + data + '</a>';
                    }

                    return data;
                },
				
            },
			{
                targets:1,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a href="http://ams.ariba.com/sr/dashboard/customer.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                    }

                    return data;
                }
            },
			{
			targets:2,
				render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a href="http://ams.ariba.com/sr/dashboard/user-dashboard.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                    }

                    return data;
                }
			},
			{
                targets:5,
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
data.append("query", "SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND AMVisPriority='P1 - VERY HIGH' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba'");
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("P1Tile").innerHTML =
            replaced ;
 
  }
});
 

xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND CurrentDate() - AMVisDateCreated < 1 AND AMVisPriority='P1 - VERY HIGH' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba'");
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("P1Tile24").innerHTML =
            replaced ;
 
  }
});
 

xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND AMVisPriority='P2 - HIGH' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba'");
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("P2Tile").innerHTML =
            replaced ;
 
  }
});
 

xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND CurrentDate() - AMVisDateCreated < 1 AND AMVisPriority='P2 - HIGH' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba'");
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("P2Tile24").innerHTML =
            replaced ;
 
  }
});
 

xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND AMVisPriority='P3 - MEDIUM' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba'");
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("P3Tile").innerHTML =
            replaced ;
 
  }
});
 

xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND CurrentDate() - AMVisDateCreated < 1 AND AMVisPriority='P3 - MEDIUM' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba'");
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("P3Tile24").innerHTML =
            replaced ;
 
  }
});
 

xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND AMVisPriority='P3 - MEDIUM' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba'");
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("P3Tile").innerHTML =
            replaced ;
 
  }
});
 

xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND CurrentDate() - AMVisDateCreated < 1 AND AMVisPriority='P3 - MEDIUM' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba'");
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("P3Tile24").innerHTML =
            replaced ;
 
  }
});
 

xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND AMVisPriority='P4 - LOW' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba'");
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("P4Tile").innerHTML =
            replaced ;
 
  }
});
 

xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND CurrentDate() - AMVisDateCreated < 1 AND AMVisPriority='P4 - LOW' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba'");
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("P4Tile24").innerHTML =
            replaced ;
 
  }
});
 

xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

