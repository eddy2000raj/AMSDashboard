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

document.getElementById("UserName").innerHTML =
            mytext ;
document.getElementById("UserName1").innerHTML =
            mytext ;

document.getElementById("UserName4").innerHTML =
            mytext ;
var app = angular.module('plunker', [ ]);



app.controller('TotalSRs',function($scope, $http) {
$scope.name = mytext;
function TotalSRs() { return " Select count(this) FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' and t.AMVisDateClosed IS NULL and t.AMVisIsAMSTicket!=false AND AMVisAssignedTo.Name.PrimaryString ='"+mytext+"' ";}
$scope.TotalSRs = TotalSRs();
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
				data: { "query" : $scope.TotalSRs,
						"type" : "text",
					  }
				}).then(
				function mySucces(response) {
					$scope.data = response.data;
				},
                function myError(response) {
					$scope.data = response.statusText;
				})


});

app.controller('CustomerUpdateTile',function($scope, $http) {
$scope.name = mytext;
function customerUpdate() { return " Select count(this) FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' and t.AMVisDateClosed IS NULL AND t.AMVisSubStatus in ('Customer Update','Research','Screen Sharing Scheduled','Internal Assistance','Internal Update','Internal Review','Initial Review','Implemented in Test') and t.AMVisIsAMSTicket!=false AND AMVisAssignedTo.Name.PrimaryString ='"+mytext+"'";}
$scope.customerUpdate = customerUpdate();
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
				data: { "query" : $scope.customerUpdate,
						"type" : "text",
					  }
				}).then(
				function mySucces(response) {
					$scope.data = response.data;
				},
                function myError(response) {
					$scope.data = response.statusText;
				})


});


app.controller('CustomerUpdate',function($scope, $http) {
$scope.name = mytext;
function customerUpdate() { return " Select count(this) FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' and t.AMVisDateClosed IS NULL AND t.AMVisSubStatus IN ('Customer Update','Research','Screen Sharing Scheduled','Internal Assistance','Internal Update','Internal Review','Initial Review','Implemented in Test') and t.AMVisIsAMSTicket!=false AND AMVisAssignedTo.Name.PrimaryString ='"+mytext+"'";}
$scope.customerUpdate = customerUpdate();
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
				data: { "query" : $scope.customerUpdate,
						"type" : "text",
					  }
				}).then(
				function mySucces(response) {
					$scope.data = response.data;
				},
                function myError(response) {
					$scope.data = response.statusText;
				})


});

app.controller('onHold',function($scope, $http) {
$scope.name = mytext;
function onHold() { return " Select count(this) from AMVisTicket t JOIN ariba.user.core.User u USING t.AMVisAssignedTo WHERE AMVisStatus = 'OPEN' and t.AMVisDateClosed IS NULL AND AMVisSubStatus = 'Customer - Hold' and t.AMVisIsAMSTicket!=false AND AMVisAssignedTo.Name.PrimaryString ='"+$scope.name+"'";}
$scope.onHold = onHold();
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
				data: { "query" : $scope.onHold,
						"type" : "text",
					  }
				}).then(
				function mySucces(response) {
					$scope.data = response.data;
				},
                function myError(response) {
					$scope.data = response.statusText;
				})


});


app.controller('PCI',function($scope, $http) {
$scope.name = mytext;
function PCI() { return " Select count(this) from AMVisTicket t JOIN ariba.user.core.User u USING t.AMVisAssignedTo WHERE AMVisStatus = 'OPEN' and t.AMVisDateClosed IS NULL AND AMVisSubStatus = 'Pending Customer Input' and t.AMVisIsAMSTicket!=false AND AMVisAssignedTo.Name.PrimaryString ='"+$scope.name+"'";}
$scope.PCI = PCI();
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
				data: { "query" : $scope.PCI,
						"type" : "text",
					  }
				}).then(
				function mySucces(response) {
					$scope.data = response.data;
				},
                function myError(response) {
					$scope.data = response.statusText;
				})


});

app.controller('ResolvedConfirm',function($scope, $http) {
$scope.name = mytext;
function ResolvedConfirm() { return " Select count(this) FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' AND AMVisSubStatus in ('Resolved - Confirm','Pending Customer Confirmation') and t.AMVisIsAMSTicket!=false AND AMVisAssignedTo.Name.PrimaryString ='"+mytext+"'";}
$scope.ResolvedConfirm = ResolvedConfirm();
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
				data: { "query" : $scope.ResolvedConfirm,
						"type" : "text",
					  }
				}).then(
				function mySucces(response) {
					$scope.data = response.data;
				},
                function myError(response) {
					$scope.data = response.statusText;
				})


});


app.controller('TSSTickets',function($scope, $http) {
$scope.name = mytext;
function TSSTickets() { return " Select count(this) from AMVisTicket t JOIN ariba.user.core.User u USING t.AMVisAssignedTo WHERE AMVisStatus = 'OPEN' and t.AMVisDateClosed IS NULL AND AMVisSubStatus = 'TSS'  and t.AMVisIsAMSTicket!=false AND AMVisAssignedTo.Name.PrimaryString ='"+$scope.name+"'";}
$scope.TSSTickets = TSSTickets();
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
				data: { "query" : $scope.TSSTickets,
						"type" : "text",
					  }
				}).then(
				function mySucces(response) {
					$scope.data = response.data;
				},
                function myError(response) {
					$scope.data = response.statusText;
				})


});


app.controller('OpenTickets',function($scope, $http) {
$scope.name = mytext;
function OpenTickets() { return " Select count(this) FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' and t.AMVisDateClosed IS NULL and t.AMVisIsAMSTicket!=false AND AMVisAssignedTo.Name.PrimaryString ='"+mytext+"'";}
$scope.OpenTickets = OpenTickets();
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
				data: { "query" : $scope.OpenTickets,
						"type" : "text",
					  }
				}).then(
				function mySucces(response) {
					$scope.data = response.data;
				},
                function myError(response) {
					$scope.data = response.statusText;
				})


});



app.controller('TaskReporter',function($scope, $http) {
$scope.name = mytext;
function TR() { return " SELECT ROUND(SUM(te.AMVisDuration)/60,2) FROM amvis.analytics.fact.AMVisTicketEffort te JOIN ariba.analytics.dimension.Time t USING te.AMVisStartDate WHERE  CurrentDate() - t.Day < 8 AND t.Day - CurrentDate() < 1 AND te.AMVisPerson = '"+$scope.name+"' ";}
$scope.TR = TR();
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
				data: { "query" : $scope.TR,
						"type" : "text",
					  }
				}).then(
				function mySucces(response) {
					$scope.data = response.data;
				},
                function myError(response) {
					$scope.data = response.statusText;
				})


});

var data = new FormData();
function customerUpdate(){ return " Select t.AMVisSRNumber as \"SR Number\",acc.AMVisShortName AS \"Account\",SUBSTRING(t.AMVisDescription,0,40) AS \"Description\",SUBSTRING(t.AMVisPriority,0,3) AS \"Priority\",Round((CurrentDate()-t.AMVisDateUpdated)) as \"PendingDays\",t.AMVisSubStatus as \"Status\" FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' AND AMVisSubStatus IN ('Customer Update','Research','Screen Sharing Scheduled','Internal Assistance','Internal Update','Internal Review','Initial Review','Implemented in Test') and AMVisDateClosed IS NULL and t.AMVisIsAMSTicket!=false AND AMVisAssignedTo.Name.PrimaryString ='"+mytext+"' ORDER BY t.AMVisDateUpdated ASC ";}
var customerUpdate = customerUpdate();

data.append("query",customerUpdate);
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

    $('#CustomerUpdateTable').dataTable({
    "aaData": NAC,
	"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return  data = '<a href="https://support.wdf.sap.corp/sap/support/message/' + encodeURIComponent(data) + '">' + data + '</a>';
                },
                "targets": 0
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
function PendingCustomerInputTable(){ return " Select t.AMVisSRNumber as \"SR Number\",acc.AMVisShortName AS \"Account\",SUBSTRING(t.AMVisDescription,0,40) AS \"Description\",SUBSTRING(t.AMVisPriority,0,3) AS \"Priority\",Round((CurrentDate()-t.AMVisDateUpdated)) as \"PendingDays\" FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' AND AMVisSubStatus = 'Pending Customer Input' and AMVisDateClosed IS NULL and t.AMVisIsAMSTicket!=false AND AMVisAssignedTo.Name.PrimaryString ='"+mytext+"' ORDER BY t.AMVisDateUpdated ASC ";}
var PendingCustomerInputTable = PendingCustomerInputTable();

data.append("query",PendingCustomerInputTable);
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

    $('#PendingCustomerInputTable').dataTable({
    "aaData": NAC,
	"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return  data = '<a href="https://support.wdf.sap.corp/sap/support/message/' + encodeURIComponent(data) + '">' + data + '</a>';
                },
                "targets": 0
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
function PendingTSSTable(){ return " Select t.AMVisSRNumber as \"SR Number\",acc.AMVisShortName AS \"Account\",SUBSTRING(t.AMVisDescription,0,40) AS \"Description\",SUBSTRING(t.AMVisPriority,0,3) AS \"Priority\",Round((CurrentDate()-t.AMVisDateUpdated)) as \"PendingDays\" FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' AND AMVisSubStatus = 'TSS' and AMVisDateClosed IS NULL and t.AMVisIsAMSTicket!=false AND AMVisAssignedTo.Name.PrimaryString ='"+mytext+"' ORDER BY t.AMVisDateUpdated ASC ";}
var PendingTSSTable = PendingTSSTable();

data.append("query",PendingTSSTable);
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

    $('#PendingTSSTable').dataTable({
    "aaData": NAC,
	"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return  data = '<a href="https://support.wdf.sap.corp/sap/support/message/' + encodeURIComponent(data) + '">' + data + '</a>';
                },
                "targets": 0
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
function ActiveOpenTable(){ return " Select t.AMVisSRNumber as \"SR Number\",acc.AMVisShortName AS \"Account\",SUBSTRING(t.AMVisDescription,0,40) AS \"Description\",SUBSTRING(t.AMVisPriority,0,3) AS \"Priority\",Round((CurrentDate()-t.AMVisDateUpdated)) as \"PendingDays\", t.AMVisSubStatus \"Status\" FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' AND t.AMVisDateClosed IS NULL and t.AMVisIsAMSTicket!=false AND AMVisAssignedTo.Name.PrimaryString ='"+mytext+"' ORDER BY t.AMVisDateUpdated ASC ";}
var ActiveOpenTable = ActiveOpenTable();

data.append("query",ActiveOpenTable);
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

    $('#ActiveOpenTable').dataTable({
    "aaData": NAC,
	"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return  data = '<a href="https://support.wdf.sap.corp/sap/support/message/' + encodeURIComponent(data) + '">' + data + '</a>';
                },
                "targets": 0
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
function PendingClosureTable(){ return " Select t.AMVisSRNumber as \"SR Number\",acc.AMVisShortName AS \"Account\",SUBSTRING(t.AMVisDescription,0,40) AS \"Description\",SUBSTRING(t.AMVisPriority,0,3) AS \"Priority\",Round((CurrentDate()-t.AMVisDateUpdated)) as \"PendingDays\" FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' AND AMVisSubStatus in ('Resolved - Confirm','Pending Customer Confirmation') and t.AMVisIsAMSTicket!=false AND AMVisAssignedTo.Name.PrimaryString ='"+mytext+"' ORDER BY t.AMVisDateUpdated ASC ";}
var PendingClosureTable = PendingClosureTable();

data.append("query",PendingClosureTable);
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

    $('#PendingClosureTable').dataTable({
    "aaData": NAC,
	"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return  data = '<a href="https://support.wdf.sap.corp/sap/support/message/' + encodeURIComponent(data) + '">' + data + '</a>';
                },
                "targets": 0
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
function TSSReporter(){ return " SELECT Round(SUM(te.AMVisDuration)/60) FROM ariba.analytics.dimension.UserData ud LEFT OUTER JOIN amvis.analytics.fact.AMVisTicketEffort te ON (ud = te.AMVisUser ) LEFT OUTER JOIN ariba.analytics.dimension.Time t ON (te.AMVisStartDate = t) WHERE te.AMVisUser.UserName ='"+mytext+"' and CurrentDate() - t.Day < 8 AND t.Day - CurrentDate() < 1";}
var TSSReporter = TSSReporter();

data.append("query",TSSReporter);
data.append("useSQL", "");
data.append("type", "text");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var replaced = NAC.toString().replace(/\[.*\]/g,'');
	document.getElementById("TSSReport").innerHTML =
            replaced ;

  }
});


xhr.open("POST", "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);
