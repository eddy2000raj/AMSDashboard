var app = angular.module('plunker', ['nvd3']);

/*app.directive("serializer", function(){
  return {
    restrict: "A",
    scope: {
      onSubmit: "&serializer"
    },
    link: function(scope, element){
      // assuming for brevity that directive is defined on <form>

      var form = element;
	      if(form.submit!=undefined){
	      	 form.submit(function(event){
	         event.preventDefault();
	         var serializedData = form.serialize();

	         scope.onSubmit({data: serializedData});
	      });
	      }
      

    }
  };
});*/

app.controller("accountTable",function($scope,$http){

	$scope.allUsers=[];

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
				data: {
						"query":"SELECT us_1.ROOTID as id, ISNULL(us_2.val, us_1.mls_PrimaryString) as text FROM us_UserTab us_1 LEFT OUTER JOIN us_ApproverStringTab us_2 ON (us_1.mls_Translations=us_2.lvId AND us_1.rootId=us_2.rootId AND us_2.lvIndex = 7) WHERE (us_1.cus_Active = 1) AND (us_1.cus_PurgeState = 0) ORDER BY 2 ASC",
						"useSQL":"true",
						"type":"json"
					}
				}).then(
				function mySucces(response) {
					//$scope.data = response.data;	
					$scope.allUsers=response.data;
					//console.log("account saved");
					// $("#myModal").modal("hide");
					//  $.notify({
     //            				icon: 'ti-gift',
     //            				message: "Account Saved Successfully"

				 //            },{
				 //                type: 'success',
				 //                timer: 400
				 //            })
					//$("#successPage").modal();
				},
                function myError(response) {
					//$scope.data = response.statusText;
					//console.log("failed");
					//$("#myModal").modal("hide");
					//$("#successPage").modal();

					/*$.notify({
                				icon: 'ti-gift',
                				message: "Error in Saving"

				            },{
				                type: 'error',
				                timer: 400
				            })*/
				});

	
	$scope.showForm=function(){
		$("#myModal").modal();
		//var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
		autocomplete(document.getElementById("AMVisPM"), $scope.allUsers);
		//autocomplete(document.getElementById("AMVisPME"), $scope.allUsers);

		$("#AMVisPM").css('width', '100%'); // make it responsive
		$("#AMVisPM").select2({data:$scope.allUsers}); 

		$("#AMVisPME").css('width', '100%'); // make it responsive
		$("#AMVisPME").select2({data:$scope.allUsers}); 

		  
		$("#AMVisKeyAMSExperts").css('width', '100%'); // make it responsive
		$("#AMVisKeyAMSExperts").select2({data:$scope.allUsers}); 
		
	}
});


app.controller("saveCustomerController",function($scope,$http){

	$scope.showTimer=function(){

		$(".datetimepicker").css("opacity",1);
		$(".datetimepicker").css("visibility","visible");
		$("#AMVisWeeklyMeetingDayAndTime").datetimepicker('show');
		

	}

	$("#AMVisStartDate").datepicker({format: "dd/mm/yyyy",
    startDate: "01/01/1970",
    endDate: "01/01/2020",
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
   });/*.on('changeDate', function(ev) {
    //startDate.hide();
    $scope.contract.startDate =  $("#startDate").val();
    $scope.$apply();
    });*/


	$("#AMVisCustomerStartDate").datepicker({format: "dd/mm/yyyy",
    startDate: "01/01/1970",
    endDate: "01/01/2020",
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
	});/*.on('changeDate', function(ev) {
    //endDate.hide();
    $scope.contract.endDate = $("#endDate").val();
    $scope.$apply();
	});
*/

    $("#AMVisCustomerAMSTerminatedDate").datepicker({format: "dd/mm/yyyy",
    startDate: "01/01/1970",
    endDate: "01/01/2020",
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
	});

	/*$("#").datepicker({format: "dd/mm/yyyy",
    startDate: "01/01/1970",
    endDate: "01/01/2020",
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
	});*/

	$scope.submit=function(e){

	    
		var values = {"isCustomer":true};

		$.each($('#customerInfoForm').serializeArray(), function(i, field) {
		    values[field.name] = field.value;
		});

		$.each($('#customerInfoForm input[type=radio]'), function(i, field) {
		    values[field.name] = field.value;
		});

		/*$('#customerInfoForm input[type=radio]').each(function() {     
        if (!this.checked) {
            $(this).attr("value","0");
        }else{
            $(this).attr("value","1");
        }
    	});*/

		console.log(values);

		
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
				data: values
				}).then(
				function mySucces(response) {
					//$scope.data = response.data;	
					//console.log("account saved");
					$("#myModal").modal("hide");
					 $.notify({
                				icon: 'ti-gift',
                				message: "Account Saved Successfully"

				            },{
				                type: 'success',
				                timer: 400
				            })
					//$("#successPage").modal();
				},
                function myError(response) {
					//$scope.data = response.statusText;
					//console.log("failed");
					$("#myModal").modal("hide");
					//$("#successPage").modal();

					$.notify({
                				icon: 'ti-gift',
                				message: "Error in Saving"

				            },{
				                type: 'error',
				                timer: 400
				            })
				});



	}

})

/*app.controller('MainCtrl',function($scope, $http) {
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
				data: { query:" SELECT AMVisAccount.AMVisRegion, YEAR(AMVisDateCreated) , count() FROM AMVisTicket WHERE YEAR(AMVisDateCreated) > 2013  AND AMVisAccount.AMVisShortName != 'Ariba' AND AMVisSubStatus !='Duplicate' GROUP BY  AMVisAccount.AMVisRegion, YEAR(AMVisDateCreated)  ORDER BY 2  ",
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


app.controller('MainCtrl2',function($scope, $http) {
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
				data: { "query" : " SELECT SUBSTRING(AMVisPriority,0,4), count() FROM AMVisTicket WHERE Beginswith(AMVisPriority ,'P',true) AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba' and AMVisIsAMSTicket!=false AND AMVisSubStatus !='Duplicate' GROUP BY SUBSTRING(AMVisPriority,0,4)", 
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
form.append("query", "Select t.AMVisSRNumber,t.AMVisAccount.AMVisShortName,t.AMVisQueue,t.AMVisSubStatus,t.AMVisPriority,Round(CurrentDate() - t.AMVisDateCreated) as PendingDays From AMVisTicket t Where t.AMVisStatus='OPEN' and t.AMVisPriority='P1 - VERY HIGH' and t.AMVisStatus !='Confirmed' and t.AMVisQueue in ('APP_MGMT','APP_MAINT_L3I','APP_MAINT_L2P','APP_MAINT_L3P') and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') and AMVisDateClosed IS NULL AND t.AMVisSubStatus !='Duplicate' union all Select t.AMVisSRNumber,t.AMVisAccount.AMVisShortName,t.AMVisQueue,t.AMVisSubStatus,t.AMVisPriority,Round(CurrentDate() - t.AMVisDateCreated) as PendingDays From AMVisTicket t Where t.AMVisStatus='OPEN' and t.AMVisPriority='P2 - HIGH' and t.AMVisStatus !='Confirmed' and t.AMVisQueue in ('APP_MGMT','APP_MAINT_L3I','APP_MAINT_L2P','APP_MAINT_L3P') and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') and AMVisDateClosed IS NULL and CurrentDate() - t.AMVisDateUpdated>2 AND t.AMVisSubStatus !='Duplicate' union all Select t.AMVisSRNumber,t.AMVisAccount.AMVisShortName,t.AMVisQueue,t.AMVisSubStatus,t.AMVisPriority,Round(CurrentDate() - t.AMVisDateCreated) as PendingDays From AMVisTicket t Where t.AMVisStatus='OPEN' and t.AMVisPriority='P3 - MEDIUM' and t.AMVisStatus !='Confirmed' and t.AMVisQueue in ('APP_MGMT','APP_MAINT_L3I','APP_MAINT_L2P','APP_MAINT_L3P') and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') and AMVisDateClosed IS NULL and CurrentDate() - t.AMVisDateUpdated>5 union all Select t.AMVisSRNumber,t.AMVisAccount.AMVisShortName,t.AMVisQueue,t.AMVisSubStatus,t.AMVisPriority,Round(CurrentDate() - t.AMVisDateCreated) as PendingDays From AMVisTicket t Where t.AMVisStatus='OPEN' and t.AMVisPriority='P4 - LOW' and t.AMVisStatus !='Confirmed' and t.AMVisQueue in ('APP_MGMT','APP_MAINT_L3I','APP_MAINT_L2P','APP_MAINT_L3P') and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') and AMVisDateClosed IS NULL and CurrentDate() - t.AMVisDateUpdated>7 AND t.AMVisSubStatus !='Duplicate' Group By t.AMVisAccount.AMVisShortName,t.AMVisQueue,t.AMVisPriority,t.AMVisSubStatus,Round(CurrentDate() - t.AMVisDateCreated),t.AMVisSRNumber ");
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
                        data = '<a href="http://blrd50877161a.apj.global.corp.sap:8080/sr/dashboard/customer.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
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
 

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(form);


var form = new FormData();
form.append("query", "Select t.AMVisAccount.AMVisShortName,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as P1,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as P2,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as P3,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as P4,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisQueue WHEN 'APP_MGMT' THEN 1 ELSE 0 END Else 0 END) as APP_MGMT,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisQueue WHEN 'APP_MAINT_L3I' THEN 1 ELSE 0 END Else 0 END) as APP_MAINT_L3I,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisQueue WHEN 'APP_MAINT_L2P' THEN 1 ELSE 0 END Else 0 END) as APP_MAINT_L2P,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisQueue WHEN 'APP_MAINT_L3P' THEN 1 ELSE 0 END Else 0 END) as APP_MAINT_L3P,SUM(CASE t.AMVisStatus When 'OPEN' THEN 1 ELSE 0 END) as OpenTickets From AMVisTicket t Where t.AMVisStatus='OPEN' and t.AMVisQueue is not null and AMVisDateClosed IS NULL and AMVisAssignedTeam ='GS APP MGMT' and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') AND t.AMVisSubStatus !='Duplicate' Group by t.AMVisAccount.AMVisShortName Order by t.AMVisAccount.AMVisShortName ASC ");
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
                        data = '<a href="http://blrd50877161a.apj.global.corp.sap:8080/sr/dashboard/customer.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                    }

                    return data;
                }
            },
			
        ]
		 
});
  }
});
 

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(form);


var form = new FormData();
form.append("query", "SELECT acc.aac_AMVisShortName as Account, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 1 THEN 1 ELSE 0 END) AS January, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 2 THEN 1 ELSE 0 END) AS February, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 3 THEN 1 ELSE 0 END) AS March, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 4 THEN 1 ELSE 0 END) AS April, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 5 THEN 1 ELSE 0 END) AS May, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 6 THEN 1 ELSE 0 END) AS June, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 7 THEN 1 ELSE 0 END) AS July, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 8 THEN 1 ELSE 0 END) AS August, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 9 THEN 1 ELSE 0 END) AS September, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 10 THEN 1 ELSE 0 END) AS October, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 11 THEN 1 ELSE 0 END) AS November, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 12 THEN 1 ELSE 0 END) AS December, SUM(CASE datepart(quarter,AMV1.ati_AMVisDateClosed) WHEN 1 THEN 1 ELSE 0 END) AS Quarter1, SUM(CASE datepart(quarter,AMV1.ati_AMVisDateClosed) WHEN 2 THEN 1 ELSE 0 END) AS Quarter2, SUM(CASE datepart(quarter,AMV1.ati_AMVisDateClosed) WHEN 3 THEN 1 ELSE 0 END) AS Quarter3, SUM(CASE datepart(quarter,AMV1.ati_AMVisDateClosed) WHEN 4 THEN 1 ELSE 0 END) AS Quarter4, SUM(CASE datepart(year, AMV1.ati_AMVisDateClosed) WHEN 2018 THEN 1 ELSE 0 END) AS TOTAL FROM AMVisTicketTab AMV1 INNER JOIN AMVisAccountTab acc ON(AMV1.ati_AMVisAccount=acc.rootId) WHERE AMV1.ati_AMVisDateClosed BETWEEN '2019/01/01' AND '2019/12/31' AND AMV1.ati_AMVisAssignedTeam = 'GS APP MGMT' AND acc.aac_AMVisCRMID IS NOT NULL AND AMV1.ati_AMVisSubStatus !='Duplicate' GROUP BY acc.aac_AMVisShortName ORDER BY 1");
form.append("type", "table");
form.append("useSQL", "true");

var xhr = new XMLHttpRequest();


xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NA =JSON.parse(this.responseText);
	
	var NAC2 = NA.shift();
	
    $('#CTS').dataTable({
    "aaData": NA,
	order: [[ 17, "dsc" ]],
	columnDefs: [
           
			{
                targets:0,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a href="http://blrd50877161a.apj.global.corp.sap:8080/sr/dashboard/customer.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                    }

                    return data;
                }
            },
			
        ]
		 
});
  }
});
 

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");

xhr.send(form);


var form = new FormData();
form.append("query", "Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P1 - VERY HIGH' and AMVisStatus='OPEN' Group By t.AMVisPriority union all Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P2 - HIGH' and AMVisStatus='OPEN' Group By t.AMVisPriority union all Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P3 - MEDIUM' and AMVisStatus='OPEN' Group By t.AMVisPriority union all Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P4 - LOW' and AMVisStatus='OPEN' and t.AMVisQueue is not null and AMVisDateClosed IS NULL AND t.AMVisSubStatus !='Duplicate' Group By t.AMVisPriority ");
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
 

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(form);


var data = new FormData();
data.append("query", "SELECT Distinct t.AMVisSRNumber AS \"SR Number\", acc.AMVisShortName AS \"Account\",SUBSTRING(t.AMVisDescription, 0, 40) AS \"Description\",SUBSTRING(t.AMVisPriority, 0, 3) AS \"Priority\",t.AMVisSubStatus AS \"SubStatus\",t.AMVisDateUpdated AS \"Last Activity\",t.AMVisDateCreated AS \"Create Date\",Count(AMVisTicketHistoryRecords) FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN config.amvis.core.AMVisTicketHist AS TicketHist INCLUDE INACTIVE ON t.AMVisSRNumber = TicketHist.AMVisSRNumberTicketHistory LEFT OUTER JOIN config.amvis.core.AMVisTicketHistoryRecords as AMVisTicketHistoryRecords using TicketHist.AMVisTicketHistoryRecords WHERE t.AMVisStatus = 'OPEN' and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisAccount.AMVisShortName not in ('Amtrak', 'Ariba', 'American Express') AND t.AMVisSubStatus !='Duplicate' and t.AMVisIsAMSTicket!=false group by t.AMVisSRNumber,acc.AMVisShortName,SUBSTRING(t.AMVisDescription, 0, 40),SUBSTRING(t.AMVisPriority, 0, 3) ,t.AMVisSubStatus,t.AMVisDateUpdated,t.AMVisDateCreated");
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
                        data = '<a href="http://blrd50877161a.apj.global.corp.sap:8080/sr/dashboard/customer.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                    }

                    return data;
                }
            },
        ]
    
});
  }
});
 

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);*/

var data = new FormData();
data.append("query", "Select Distinct AMVisShortName,AMVisName,AMVisRegion,AMVisUniqueName from config.amvis.core.AMVisAccount Where AMVisCRMID is not null and AMVisName not like '%On Behalf%'");
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NAS =JSON.parse(this.responseText);
	var NAC2 = NAS.shift();

	
	
    $('#example2').dataTable({
    "aaData": NAS,
    "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
											var clients=['IBM','Ford','Nokia','Intel','SCB','CVS','LVS','PPG','Lenovo','Amgen','HZL','Nestle','Auchan','Tapestry','Ferrero'];
											if ( clients.includes(aData[0]) )
											$(nRow).addClass( "hightlightRow" );
											return nRow;
										},
	columnDefs: [
            {
                targets:0,
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                   
                        data = '<a href="http://blrd50877161a.apj.global.corp.sap:8080/sr/dashboard/customer.html?name=' + encodeURIComponent(data) + '&uniqueName=' + encodeURIComponent(row[3]) +'">' + data + '</a>';
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



function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i]["text"].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i]["text"].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i]["text"].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i]["text"]+ "' >";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
} 


/*var data = new FormData();
data.append("query", "SELECT t.AMVisSRNumber AS \"SR Number\",acc.AMVisShortName AS \"Account\",AssignedTo.Name.PrimaryString as AssignedTo,t.AMVisSubStatus AS \"SubStatus\",SUBSTRING(t.AMVisPriority,0,3) AS \"Priority\",ROUND((CurrentDate()-t.AMVisDateUpdated),0) as PendingDays FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') and (CurrentDate()-t.AMVisDateUpdated) >20 and AMVisDateClosed IS NULL and AMVisAssignedTeam ='GS APP MGMT' AND t.AMVisSubStatus not in ('Resolved - Close','Resolved - Confirm') AND t.AMVisSubStatus !='Duplicate' ORDER BY t.AMVisDateUpdated ASC");
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();




xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    
	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();
	
    $('#example4').dataTable({
    "aaData": NAC,
	 dom: 'Blfrtip',
	
	
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
                        data = '<a href="http://blrd50877161a.apj.global.corp.sap:8080/sr/dashboard/customer.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                    }

                    return data;
                }
            },
			{
			targets:2,
				render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a href="http://blrd50877161a.apj.global.corp.sap:8080/sr/dashboard/user-dashboard.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
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
        ] ,
			
 buttons: [
    {
      extend: 'csv',
      text: 'Export CSV',
      className: 'exportExcel',
      filename: 'Export csv',
      exportOptions: {
		  
		  modifier: {
            page: 'all'
          }
        
      }
    }, 
    
    {
        extend: 'excel',
        text: 'Export Excel',
        className: 'exportExcel',
        filename: 'Export_Excel',
        exportOptions: {
          modifier: {
            page: 'all'
          }
        }
      },
	  
	   {
          extend: 'pdf',
          text: 'Export pdf',
          className: 'exportExcel',
          filename: 'Export_pdf',
          orientation: 'portrait', //portrait
			pageSize: 'A4',
          exportOptions: {
        	  columns: ':visible',
				search: 'applied',
				order: 'applied',
            modifier: {
              page: 'all'
            }
          },
          
          customize: function (doc) {
				//Remove the title created by datatTables
				doc.content.splice(0,1);
				//Create a date string that we use in the footer. Format is dd-mm-yyyy
				var now = new Date();
				var jsDate = now.getDate()+'-'+(now.getMonth()+1)+'-'+now.getFullYear();
				var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAAoCAMAAADE3ZjrAAAAk1BMVEX/////tQAAg8YAe8MAgcX/sAAAfsT/swAAecIAd8HK2ezF2ez/rgAAcr/Z5/PO3e53rdj+9e2pyeX1+fyixOIpjMq+1er/9ujJ3u5Vms/g7Pbn7/fs9PmRut3/4bX/tCH/6cn/vEX/7tdoo9P/wln/ynb/1JX/1593ptX/yG3//PaEsdn/wE9Ck8z/z4j/uC8Aa7zt5ZzaAAAEOUlEQVRYhe1XW3vqKhBNgCA0kmhiaMyluk3r3tXe/v+vOzOAJLGxPS+enm9/rodmoKOsLIY1GAQ33HDDDTf8HTgszeMe8MNMRrjfzB/wuZ9H898/TWaAp1kYmWADwf9HsV0UhrM9Rg9ROHv6aToeL7MwDOemxN5BsN1P83HYglyh02k7D2cvX+SmWZuVflRr7QZ5YlDl4/RY67OZQONU4z/4BX7Nwtl76HR6BMG2lzLLQlBOZaHduJNC2ehOUQPeVYP8Sgm1OvsOmEqCWMnX72hhTb3tQKdHHN1D8H4hM5GMSSE4k60ZN4wRYTneUcKQFuM06T/QcsKKc14SeQm2/o4XFv096jTf4hDP5sN0ZsfZOmmSP4Ipo0omCGGd48UKrbOWseGChBEiq/GXNHUd/Btee+Cxtzr9wvESDkE0ncqYSPG5InatNbAgtDnxwmdMCfcVlUrCCbfa5jlM60VuA8Mr11ltE/NEZ2f1tpyH4eYQDHTaR840PqFgvBsMa8rWC0azIa+GOqKIBect7KyNqVh1UuaB5NLuo6ZCyCOyOjJJqeTpcC1P5wD7uTEBmKs1jXO0At7/mJ70WFGawQKvQ14l6OXzJSP5K5Gl5UgKTlUeUEaRFymgHBmR8FYEzhLjjKnBUru+zEGnyDShy+baSXh9ybrUyQfSCEIrxytO4xUZSKoFX0Dps4XjxV8zOCQgqOHFuzIuCL6Vlm2VNwUTcb/SwBYOGzBX3FE0jvm0ucYdE0gN5a8k1vyC0zaw51FI+B8ltX8LRsugEnYjF9ydEMfL1H0C9CC9Ceo0WzOe+XVGNup12p5MYwJ5CQoQqdEEeJskGTcbCLyIgHopWl/1OWxjUlWggza86OoTr0DhIMgKoRTo2fNCZUyfPoxGLyfTOIM78nAO/+AChINjAZ/E7mNV1cPkzFoaI4bCNC+Jg7XgpC27gV69QmOdvGmMpTqqo1sReKWCwFsqBVtx7Ot+AGAvENZKJnnVivAmluboHHnPC0+eVcoewJcvzTX9ILQDSWBroKagejR4UR6DIlO8aiBUIgpjJee8CIuxAkkRrDhyTIter9+Rv95YnXYnnQ4nVxthBX0IGiRUMsuNCZhZ0ONugheWnwtw3c+8JLc+oSUcYqqIry90rJmJ3k+6PQ/MNfp8c9WF4Bwa97oOMqUWdnKh5Br6tiTjXCI/rME2H9ipO+k6uOmPGvp2h2aKhbGWYKpZp5R9j36zULc3M7VEOzMMvWmMUbZtu8LOnKSp8/UmTVP7Z4i8n4CoDir840Y5pidBkmX2IMWZbjDBdnx/czgMOiJ2y2/M9drwlvo2LHLc27Fp/MfYTt+4Hk57CrfYi+Z6Tfhm8zy+ob6fdHq8YK7XBeryjMHu7EbvddxNmuuVcdhE0cz+AoJg1KSf4cftFoMnCC7cXK/Ha7lcWhvwgQfMLMfBDX8F/gGjIktd8pF/OgAAAABJRU5ErkJggg==';
				doc.pageMargins = [20,60,20,30];
				// Set the font size fot the entire document
				doc.defaultStyle.fontSize = 7;
				// Set the fontsize for the table header
				doc.styles.tableHeader.fontSize = 7;
				// Create a header object with 3 columns
				// Left side: Logo
				// Middle: brandname
				// Right side: A document title
				
				// balaji
				doc['header']=(function() {
					return {
						columns: [
							{
								image: logo,
								width: 24
							}
						],
						margin: 20
					}
			});
				// Create a footer object with 2 columns
				// Left side: report creation date
				// Right side: current page and total pages
				doc['footer']=(function(page, pages) {
					return {
						columns: [
							{
								alignment: 'left',
								text: ['Created on: ', { text: jsDate.toString() }]
							},
							{
								alignment: 'right',
								text: ['page ', { text: page.toString() },	' of ',	{ text: pages.toString() }]
							}
						],
						margin: 20
					}
				});
				// Change dataTable layout (Table styling)
				// To use predefined layouts uncomment the line below and comment the custom lines below
				// doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
				var objLayout = {};
				objLayout['hLineWidth'] = function(i) { return .5; };
				objLayout['vLineWidth'] = function(i) { return .5; };
				objLayout['hLineColor'] = function(i) { return '#aaa'; };
				objLayout['vLineColor'] = function(i) { return '#aaa'; };
				objLayout['paddingLeft'] = function(i) { return 4; };
				objLayout['paddingRight'] = function(i) { return 4; };
				doc.content[0].layout = objLayout;
		}
        }
	]
	
   });
  }
});
 
 

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "Select count(*) FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount WHERE t.AMVisStatus = 'OPEN' AND  beginswith(AMVisPriority, 'P1', true) and t.AMVisIsAMSTicket!=false AND t.AMVisSubStatus !='Duplicate' and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisAccount.AMVisShortName not in ('Amtrak', 'Ariba', 'American Express')");
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
 

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND CurrentDate() - AMVisDateCreated < 1 AND AMVisPriority='P1 - VERY HIGH' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba' and AMVisIsAMSTicket!=false");
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
 

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "Select count(*) FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount WHERE t.AMVisStatus = 'OPEN' AND  beginswith(AMVisPriority, 'P2', true) and t.AMVisIsAMSTicket!=false AND t.AMVisSubStatus !='Duplicate' and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisAccount.AMVisShortName not in ('Amtrak', 'Ariba', 'American Express')");
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
 

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND CurrentDate() - AMVisDateCreated < 1 AND AMVisPriority='P2 - HIGH' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba' and AMVisIsAMSTicket!=false");
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
 

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "Select count(*) FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount WHERE t.AMVisStatus = 'OPEN' AND  beginswith(AMVisPriority, 'P3', true) and t.AMVisIsAMSTicket!=false AND t.AMVisSubStatus !='Duplicate' and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisAccount.AMVisShortName not in ('Amtrak', 'Ariba', 'American Express')");
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
 

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND CurrentDate() - AMVisDateCreated < 1 AND AMVisPriority='P3 - MEDIUM' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' and AMVisIsAMSTicket!=false AND AMVisAccount.AMVisShortName != 'Ariba' ");
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
 

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);





var data = new FormData();
data.append("query", "Select count(*) FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount WHERE t.AMVisStatus = 'OPEN' AND  beginswith(AMVisPriority, 'P4', true) and t.AMVisIsAMSTicket!=false AND t.AMVisSubStatus !='Duplicate' and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisAccount.AMVisShortName not in ('Amtrak', 'Ariba', 'American Express')");
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
 

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND CurrentDate() - AMVisDateCreated < 1 AND AMVisPriority='P4 - LOW' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' and AMVisIsAMSTicket!=false AND AMVisAccount.AMVisShortName != 'Ariba'");
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
 

xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
function customerUpdate(){ return " Select t.AMVisSRNumber as \"SR Number\",acc.AMVisShortName AS \"Account\",AssignedTo.Name.PrimaryString as \"AssignedTo\",CASE t.AMVisAssignedTo.Supervisor.Name.PrimaryString WHEN 'Krishna Kuchimanchi' THEN 'AMERICAS' WHEN 'Tony Wu' THEN 'AMERICAS' WHEN 'Lukas Gunar' THEN 'EMEA' WHEN 'Michal Scerbak' THEN 'EMEA' WHEN 'Erik Ivancak' THEN 'EMEA' WHEN 'Krishna Veerappa' THEN 'APJ' WHEN 'Samir Sato' THEN 'APJ' ELSE 'GLOBAL' END as \"TeamLocation\",SUBSTRING(t.AMVisDescription, 0, 40) AS \"Description\",SUBSTRING(t.AMVisPriority, 0, 3) AS \"Priority\",Round((CurrentDate()-t.AMVisDateUpdated)) as \"PendingDays\" FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE CurrentDate()-t.AMVisDateUpdated > 4 AND  t.AMVisStatus = 'OPEN' AND AMVisSubStatus = 'Customer Update' and t.AMVisIsAMSTicket!=false and AMVisDateClosed IS NULL  AND t.AMVisSubStatus !='Duplicate' ORDER BY t.AMVisDateUpdated ASC";}
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
                        data = '<a href="http://blrd50877161a.apj.global.corp.sap:8080/sr/dashboard/customer.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                    }

                    return data;
                }
            },{
			targets:2,
				render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a href="http://blrd50877161a.apj.global.corp.sap:8080/sr/dashboard/user-dashboard.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                    }

                    return data;
                }
			},
			{
                targets:6,
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

app.controller('backlog',function($scope,$http) {

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
				"data":{ "query" : "SELECT 'Backlog', tm.AMVisWeekString, SUM(CASE t.AMVisDateClosed WHEN NULL THEN 1 ELSE CASE SIGN(t.AMVisDateClosed - tm.AMVisDate) WHEN -1 THEN 0 ELSE 1 END END) FROM config.amvis.core.AMVisTicket t, config.amvis.core.AMVisTime tm WHERE(CurrentDate() - tm.AMVisDate < 70 AND tm.AMVisDate < CurrentDate()) AND (t.AMVisDateClosed IS NULL OR CurrentDate() - t.AMVisDateClosed < 70) AND (CurrentDate() - tm.AMVisDate < 70) AND t.AMVisDateCreated < tm.AMVisDate AND tm.AMVisDayOfWeek=1 AND t.AMVisAssignedTeam='GS APP MGMT' AND beginswith(AMVisPriority, 'P', true) and t.AMVisIsAMSTicket!=false AND t.AMVisAccount.AMVisShortName not in ('Ariba')  AND t.AMVisSubStatus !='Duplicate' GROUP BY tm.AMVisWeekString ORDER BY tm.AMVisWeekString",
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
});*/



(function() {
    var origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        console.log('request started!');
        this.addEventListener('load', function() {
            console.log('request completed!');
            console.log(this.readyState); //will always be 4 (ajax is completed successfully)
            console.log(this.responseText); //whatever the response was
        });
        origOpen.apply(this, arguments);
    };
})();