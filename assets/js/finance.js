var app = angular.module('plunker', []);


var AMVisCommentsQuill,AMVisCustomerSpecificQuill;

var server_url="http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData";


function resetForm(){

	 //reset form
	   $("#customerInfoForm input.form-control,textarea.form-control").each(function(i,v){ 


		  	if($(v).attr("type")=="radio" ){
                

		  		if($(v).attr("value")=="false"){
		  			$(v).closest(".radio").addClass("checked");
		  		}

		  		if($(v).attr("value")=="true"){
		  			$(v).closest(".radio").removeClass("checked");
		  		}

		  		if($(v).attr("value")=="onDemand"){
		  			$(v).closest(".radio").addClass("checked");
		  		}

		  		if($(v).attr("value")=="onPremise"){
		  			$(v).closest(".radio").removeClass("checked");
		  		}

		  		if($(v).attr("value")=="both"){
		  			$(v).closest(".radio").removeClass("checked");
		  		}


		  	}

		  	if($(v).attr("type")=="text"){
               $(v).val("");  
		  	}

  		});

	   //reset form
	   $("#customerInfoForm select.form-control").each(function(i,v){ 
                
                $(v).val("na");

  		});

	    $("#AMVisPM").val([]);
	    $("#AMVisPM").trigger("change");

	    $("#AMVisPME").val([]);
        $("#AMVisPME").trigger("change");

        $("#AMVisKeyAMSExperts").val([]);
        $("#AMVisKeyAMSExperts").trigger("change");

        $("#AMVisModules").val([]); 
        $("#AMVisModules").trigger("change");

        $("#customerInfoForm .ql-editor").html("");

        validatorForm.resetForm();

}

//reset modal on close
$('[data-dismiss=modal]').on('click', function (e) {
   
      resetForm();
	  
})


app.controller("accountTable",function($scope,$http,$templateCache,$compile){

	$scope.allUsers=[];

	$http({
				method : "POST",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url : server_url,
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj){
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
					return str.join("&");
				},
				data: {
						"query":"SELECT us_1.CUS_UNIQUENAME as id, ISNULL(us_2.val, us_1.mls_PrimaryString) as text FROM us_UserTab us_1 LEFT OUTER JOIN us_ApproverStringTab us_2 ON (us_1.mls_Translations=us_2.lvId AND us_1.rootId=us_2.rootId AND us_2.lvIndex = 7) WHERE (us_1.cus_Active = 1) AND (us_1.cus_PurgeState = 0) ORDER BY 2 ASC",
						"useSQL":"true",
						"type":"json"
					}
				}).then(
				function mySucces(response) {
					
					$scope.allUsers=response.data;
					$("#AMVisPM").select2({data:$scope.allUsers}); 
					$("#AMVisPME").select2({data:$scope.allUsers}); 
					$("#AMVisKeyAMSExperts").select2({data:$scope.allUsers});
					

				},
                function myError(response) {

                	$("#AMVisPM").select2({data:[]}); 
					$("#AMVisPME").select2({data:[]}); 
					$("#AMVisKeyAMSExperts").select2({data:[]});
					
				});

   $scope.allModules=["Ariba Travel and Expense Professional",
						"Ariba Contract Invoice Creation",
						"Ariba Procure-to-Pay Basic",
						"Ariba Spot Buy Catalog",
						"Ariba Travel and Expense Basic",
						"Ariba Custom Form",
						"Ariba Procure-to-Pay Professional",
						"Ariba Requisition-to-Receipt",
						"Ariba Mobile",
						"Ariba Procurement Content",
						"Ariba Spot Buy",
						"Ariba Invoice - Enterprise mode",
						"Ariba Collaborative Sourcing Pro",
						"Ariba Supplier Risk - Compliance package",
						"Ariba Supplier Lifecycle and Performance",
						"Ariba Custom Reporting",
						"Ariba Start Contracts",
						"Ariba Start Sourcing",
						"Ariba Sourcing Pro",
						"Ariba QuickSource",
						"Ariba Spend Visibility Pro",
						"Ariba Contracts Pro",
						"Ariba SPM",
						"Ariba Spend Visibility Basic",
						"Ariba SSP Reporting",
						"Ariba Contracts Basic",
						"Ariba Supplier Management Basic",
						"Ariba Operational Service",
						"Ariba Supplier Risk",
						"Ariba Contractor Management",
						"Ariba Spot Quote"];

   $("#AMVisModules").select2({data:$scope.allModules}); 

    $scope.allSolutions=["Ariba Travel and Expense Professional",
						"Ariba Contract Invoice Creation",
						"Ariba Procure-to-Pay Basic",
						"Ariba Spot Buy Catalog",
						"Ariba Travel and Expense Basic",
						"Ariba Custom Form",
						"Ariba Procure-to-Pay Professional",
						"Ariba Requisition-to-Receipt",
						"Ariba Mobile",
						"Ariba Procurement Content",
						"Ariba Spot Buy",
						"Ariba Invoice - Enterprise mode",
						"Ariba Collaborative Sourcing Pro",
						"Ariba Supplier Risk - Compliance package",
						"Ariba Supplier Lifecycle and Performance",
						"Ariba Custom Reporting",
						"Ariba Start Contracts",
						"Ariba Start Sourcing",
						"Ariba Sourcing Pro",
						"Ariba QuickSource",
						"Ariba Spend Visibility Pro",
						"Ariba Contracts Pro",
						"Ariba SPM",
						"Ariba Spend Visibility Basic",
						"Ariba SSP Reporting",
						"Ariba Contracts Basic",
						"Ariba Supplier Management Basic",
						"Ariba Operational Service",
						"Ariba Supplier Risk",
						"Ariba Contractor Management",
						"Ariba Spot Quote"];

   $("#AMVisSolutionsInScope").select2({data:$scope.allSolutions}); 

	$scope.showForm=function(){

	   	$("#customerInfoForm .update").hide();
	    $("#customerInfoForm .save").show();

		$("#myModal").modal("show")
		
	    }
});


app.controller("saveCustomerController",function($scope,$http){

	

	$("#AMVisStartDate").datepicker({format: "dd/mm/yyyy",
    startDate: "01/01/2010",
    endDate: "01/01/2025",
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
   });/*.on('changeDate', function(ev) {
    //startDate.hide();
    $scope.contract.startDate =  $("#startDate").val();
    $scope.$apply();
    });*/


	$("#AMVisCustomerStartDate").datepicker({format: "dd/mm/yyyy",
    startDate: "01/01/2010",
    endDate: "01/01/2025",
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
	});/*.on('changeDate', function(ev) {
    //endDate.hide();
    $scope.contract.endDate = $("#endDate").val();
    $scope.$apply();
	});
*/

	$("#AMVisAMSSupportStarted").datepicker({format: "dd/mm/yyyy",
    startDate: "01/01/2010",
    endDate: "01/01/2025",
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
    startDate: "01/01/2010",
    endDate: "01/01/2025",
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
	}).on('change', function(ev) {
	
		if($(this).val()!=''){
          $('#AMVisTerminationReason').attr('required',true);
          $("[for=AMVisTerminationReason]").show();
		}
        else{
         $('#AMVisTerminationReason').attr('required',false);
         $("[for=AMVisTerminationReason]").hide();
        }
	});


	//$(".datetimepicker").css("opacity",1);
    //$(".datetimepicker").css("visibility","visible");
	//$("#AMVisWeeklyMeetingDayAndTime").datetimepicker({format: 'DD/MM/YYYY HH:mm:ss'});


	/*AMVisCommentsQuill=new Quill('#AMVisCommentsOrNotes', {
		  modules: {
		    toolbar: [
		      [{ header: [1, 2, false] }],
		      ['bold', 'italic', 'underline']
		    ]
		  },
		  placeholder: 'Add a text...',
		  theme: 'snow'  // or 'bubble'
	});*/

	/*AMVisCustomerSpecificQuill=new Quill('#AMVisCustomerspecificProcess', {
		  modules: {
		    toolbar: [
		      [{ header: [1, 2, false] }],
		      ['bold', 'italic', 'underline']
		    ]
		  },
		  placeholder: 'Add a text...',
		  theme: 'snow'  // or 'bubble'
	});*/


	var BackgroundClass = Quill.import('attributors/class/background');
	var ColorClass = Quill.import('attributors/class/color');
	var SizeStyle = Quill.import('attributors/style/size');
	Quill.register(BackgroundClass, true);
	Quill.register(ColorClass, true);
	Quill.register(SizeStyle, true);

	AMVisCommentsQuill=new Quill('#AMVisCommentsOrNotes', {
		  modules: {
		    toolbar: '#toolbar-container'
		  },
		  placeholder: 'Add a text...',
		  theme: 'snow'  // or 'bubble'
	});


	AMVisCustomerSpecificQuill=new Quill('#AMVisCustomerspecificProcess', {
		 modules: {
		    toolbar: '#toolbar-container1'
		  },
		  placeholder: 'Add a text...',
		  theme: 'snow'  // or 'bubble'
	});

	$scope.submitUpdate=function(e){

		
		var valid=$("#customerInfoForm").valid();

		if(!valid)
			return false;

		$("#divLoading").show();


		var values = {"isCustomerUpdate":true};

		$.each($('#customerInfoForm').serializeArray(), function(i, field) {
		    values[field.name] = field.value;
		});


		$.each($('#customerInfoForm .checked'), function(i, field) {
		    values[$(field).find(".form-control").attr("name")] = $(field).find(".form-control").attr("value");
		});

	

    	values["AMVisPM"]=$("#AMVisPM").val();
    	values["AMVisPME"]=$("#AMVisPME").val();
    	values["AMVisModules"]=$("#AMVisModules").val();
    	values["AMVisSolutionsInScope"]=$("#AMVisSolutionsInScope").val();
    	values["AMVisKeyAMSExperts"]=$("#AMVisKeyAMSExperts").val();

    	var customerSpecificData=AMVisCustomerSpecificQuill.getContents();
    	/*customerSpecificData.ops=customerSpecificData.ops.map(function(value,index){
    		       var obj=value;
   				   obj.insert=obj.insert.replace(/ /g, '&nbsp;');
   				   return obj;
		});*/
		//var specificQuillhtml= document.querySelector('#AMVisCustomerspecificProcess');
		//var customerSpecificData = specificQuillhtml.children[0].innerHTML;

    	values["AMVisCustomerspecificProcess"]=JSON.stringify(customerSpecificData);//$("#AMVisCustomerspecificProcess").find(".ql-editor").html();

    	//var commentsQuillhtml= document.querySelector('#AMVisCommentsOrNotes');
		//var customerNotesData = commentsQuillhtml.children[0].innerHTML;
    	var customerNotesData=AMVisCommentsQuill.getContents();
    	/*customerNotesData.ops=customerNotesData.ops.map(function(value,index){
   				   var obj=value;
   				   obj.insert=obj.insert.replace(/ /g, '&nbsp;');
   				   return obj;
		});*/

    	values["AMVisCommentsOrNotes"]=JSON.stringify(customerNotesData);


    	/*values["AMVisCustomerspecificProcess"]=$("#AMVisCustomerspecificProcess").find(".ql-editor").html();

    	values["AMVisCommentsOrNotes"]=$("#AMVisCommentsOrNotes").find(".ql-editor").html();*/

		console.log(values);

		$http({
				method : "POST",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url : server_url,
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
				
				    if(response.data[0].status=="account updated successfully"){

				    		$("#divLoading").hide();
							$("#myModal").modal("hide");
							
							 $.notify({
		                				icon: 'ti-gift',
		                				message: "Account updated successfully"

						            },{
						                type: 'success',
						                timer: 2000,
						                z_index: 9999999
						            });
							resetForm();
						    loadCustomerTable();
					}else{
							  $("#divLoading").hide();

							  $.notify({
		                				icon: 'ti-gift',
		                				message: response.data[0].status

						            },{
						                type: 'success',
						                timer: 2000,
						                z_index: 9999999
						            })
					}
					
				},
                function myError(response) {

					$("#divLoading").hide();

					$.notify({
                				icon: 'ti-gift',
                				message: response.data[0].status

				            },{
				                type: 'error',
				                timer: 2000,
				                z_index: 9999999
				            })
				});

	}

	$scope.submit=function(e){

		var valid=$("#customerInfoForm").valid();

		if(!valid)
			return false;

		$("#divLoading").show();

	    
		var values = {"isCustomer":true};

		$.each($('#customerInfoForm').serializeArray(), function(i, field) {
		    values[field.name] = field.value;
		});


		$.each($('#customerInfoForm .checked'), function(i, field) {
		    values[$(field).find(".form-control").attr("name")] = $(field).find(".form-control").attr("value");
		});

	

    	values["AMVisPM"]=$("#AMVisPM").val();
    	values["AMVisPME"]=$("#AMVisPME").val();
    	values["AMVisModules"]=$("#AMVisModules").val();
    	values["AMVisSolutionsInScope"]=$("#AMVisSolutionsInScope").val();
    	values["AMVisKeyAMSExperts"]=$("#AMVisKeyAMSExperts").val();

    	var customerSpecificData=AMVisCustomerSpecificQuill.getContents();

    	values["AMVisCustomerspecificProcess"]=JSON.stringify(customerSpecificData);//$("#AMVisCustomerspecificProcess").find(".ql-editor").html();

    	var customerNotesData=AMVisCommentsQuill.getContents();

    	values["AMVisCommentsOrNotes"]=JSON.stringify(customerNotesData);

    	//var customerSpecificData=AMVisCustomerSpecificQuill.getContents();
    	/*customerSpecificData.ops=customerSpecificData.ops.map(function(value,index){
    		       var obj=value;
   				   obj.insert=obj.insert.replace(/ /g, '&nbsp;');
   				   return obj;
		});*/
		//var specificQuillhtml= document.querySelector('#AMVisCustomerspecificProcess');
		//var customerSpecificData = specificQuillhtml.children[0].innerHTML;

    	//values["AMVisCustomerspecificProcess"]=customerSpecificData;//$("#AMVisCustomerspecificProcess").find(".ql-editor").html();

    	//var commentsQuillhtml= document.querySelector('#AMVisCommentsOrNotes');
		//var customerNotesData = commentsQuillhtml.children[0].innerHTML;
    	//var customerNotesData=AMVisCommentsQuill.getContents();
    	/*customerNotesData.ops=customerNotesData.ops.map(function(value,index){
   				   var obj=value;
   				   obj.insert=obj.insert.replace(/ /g, '&nbsp;');
   				   return obj;
		});*/

    	//values["AMVisCommentsOrNotes"]=customerNotesData;

    	/*values["AMVisCustomerspecificProcess"]=$("#AMVisCustomerspecificProcess").find(".ql-editor").html();

    	values["AMVisCommentsOrNotes"]=$("#AMVisCommentsOrNotes").find(".ql-editor").html();*/

		console.log(values);

		$http({
				method : "POST",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url : server_url,
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

					if(response.data[0].status=="Account saved successfully"){

							$("#divLoading").hide();
							$("#myModal").modal("hide");
							//$("#myModal").on('hidden.bs.modal');
							 $.notify({
		                				icon: 'ti-gift',
		                				message: response.data[0].status

						            },{
						                type: 'success',
						                timer: 2000,
						                z_index: 9999999
						            });
							 resetForm();
							 loadCustomerTable();
					}else{
						      $("#divLoading").hide();
							  $.notify({
		                				icon: 'ti-gift',
		                				message: response.data[0].status

						            },{
						                type: 'success',
						                timer: 2000,
						                z_index: 9999999
						            })
					}
					
					
				},
                function myError(response) {
					//$scope.data = response.statusText;
					//console.log("failed");
					//$("#myModal").modal("hide");
					//$("#myModal").on('hidden.bs.modal');
					//$("#successPage").modal();
					$("#divLoading").hide();
					$.notify({
                				icon: 'ti-gift',
                				message: response.data[0].status

				            },{
				                type: 'error',
				                timer: 2000,
				                z_index: 9999999
				            })
				});



	}

})





function showEditForm(id){

	$("#divLoading").show();


	   resetForm();

	   $("#customerInfoForm .save").hide();
	   $("#customerInfoForm .update").show();

		var data = new FormData();

		//var query="SELECT ISNULL(AMV1.aac_AMVisCustomerSupportTierL,'na') as AMVisCustomerSupportTierLevel,aac_AMVISModulesN as AMVisModules,AMV1.aac_AMVISINSTANCETYPEN as AMVisInstanceType,AMV1.aac_AMVisUniqueName as AMVisUniqueName, AMV1.aac_AMVisName as AMVisName, AMV1.aac_AMVisShortName as AMVisShortName, ISNULL(AMV1.aac_AMVisRegion,'na') as AMVisRegion, AMV1.aac_AMVisCRMID as AMVisCRMID,ISNULL(AMV1.aac_AMVisCustomerCategory,'na') as AMVisCustomerCategory, AMV1.aac_AMVisSOProjectId as AMVisSOProjectId, AMV1.aac_AMVisTCV as AMVisTCV,CONVERT(VARCHAR(10),AMV1.aac_AMVisStartDate, 103)  as AMVisStartDate, ISNULL('na',AMV1.aac_AMVisNPSSurvey) as AMVisNPSSurvey, AMV1.aac_AMVisVOCSurvey as AMVisVOCSurvey, AMV1.aac_AMVisWeeklyCall as AMVisWeeklyCall, AMV1.aac_AMVisReportGenerated as AMVisReportGenerated, AMV1.aac_AMVisSRUpdateNeedBy as AMVisSRUpdateNeedBy, AMV1.aac_AMVisNetNPS as AMVisNetNPS,ISNULL(AMV1.aac_AMVisNetVOC,0) as AMVisNetVOC,ISNULL(AMV1.aac_AMVisActiveAMS,0) as AMVisActiveAMS,ISNULL(AMV1.aac_AMVisFullAMS,0) as AMVisFullAMS, ISNULL(AMV1.aac_AMVisActiveContract,0) as AMVisActiveContract,ISNULL(AMV1.aac_AMVisInPipeline,0) as AMVisInPipeline, ISNULL(AMV1.aac_AMVisSurveyPeriodN,'na') as AMVisSurveyPeriod, AMV1.aac_AMVisCustomerNotes as AMVisCustomerNotes, ISNULL(AMV1.aac_AMVisCategory,'na') as AMVisCategory, AMV1.aac_AMVisAMSSupportStarted as AMVisAMSSupportStarted,CONVERT(VARCHAR(10),AMV1.aac_AMVisCustomerStartDate, 103) as AMVisCustomerStartDate,CONVERT(VARCHAR(10),AMV1.aac_AMVisCustomerAMSTD, 103) as AMVisCustomerAMSTerminatedDate, AMV1.aac_AMVisTerminationReason as AMVisTerminationReason, AMV1.aac_AMVisCustomerActiveOrInA as AMVisCustomerActiveOrInActive, AMV1.aac_AMVisOnPOrOnD as AMVisOnPOrOnD, AMV1.aac_AMVisCustomerType as AMVisCustomerType, AMV1.aac_AMVisCEX as AMVisCEX, AMV1.aac_AMVisPreferredCareContact as AMVisPreferredCareContact, AMV1.aac_AMVisPreferredCareScope as AMVisPreferredCareScope, AMV1.aac_AMVisSolutionsInScope as AMVisSolutionsInScope,AMV1.aac_AMVisERP as AMVisERP,ISNULL(AMV1.aac_AMVisFPC,0)  as AMVisFPC,ISNULL( AMV1.aac_AMVisDataCenter,'na') as AMVisDataCenter, AMV1.aac_AMVisRealmName as AMVisRealmName, AMV1.aac_AMVisCustomerspecificP as AMVisCustomerspecificProcess, AMV1.aac_AMVisCustomerDSC as AMVisCustomerDSC,ISNULL(AMV1.aac_AMVisWeeklyMeetingDayAndT,'na')  as AMVisWeeklyMeetingDayAndTime, AMV1.aac_AMVisAMSSharedMailBox as AMVisAMSSharedMailBox, AMV1.aac_AMVisAMSMonitoring as AMVisAMSMonitoring, AMV1.aac_AMVisDeploymentJamPage as AMVisDeploymentJamPage, AMV1.aac_AMVisAdditionalCustomerC as AMVisAdditionalCustomerContact, AMV1.aac_AMVisCommentsOrNotes as AMVisCommentsOrNotes, AMV1.aac_AMVisExceptions as AMVisExceptions FROM AMVisAccountTab AMV1 WHERE (AMV1.aac_Active = 1) AND (AMV1.aac_PurgeState = 0) AND (AMV1.aac_AMVisUniqueName ='"+id+"')";//acc.AMVisUniqueName="+id
		var query="SELECT ISNULL(AMV1.aac_AMVisCustomerSupportTierL,'na') as AMVisCustomerSupportTierLevel,aac_AMVISModulesN as AMVisModules,AMV1.aac_AMVISINSTANCETYPEN as AMVisInstanceType,AMV1.aac_AMVisUniqueName as AMVisUniqueName, AMV1.aac_AMVisName as AMVisName, AMV1.aac_AMVisShortName as AMVisShortName, ISNULL(AMV1.aac_AMVisRegion,'na') as AMVisRegion, AMV1.aac_AMVisCRMID as AMVisCRMID,ISNULL(AMV1.aac_AMVisCustomerCategory,'na') as AMVisCustomerCategory, AMV1.aac_AMVisSOProjectId as AMVisSOProjectId, AMV1.aac_AMVisTCV as AMVisTCV,CONVERT(VARCHAR(10),AMV1.aac_AMVisStartDate, 103)  as AMVisStartDate, ISNULL('na',AMV1.aac_AMVisNPSSurvey) as AMVisNPSSurvey, AMV1.aac_AMVisVOCSurvey as AMVisVOCSurvey, AMV1.aac_AMVisWeeklyCall as AMVisWeeklyCall, AMV1.aac_AMVisReportGenerated as AMVisReportGenerated, AMV1.aac_AMVisSRUpdateNeedBy as AMVisSRUpdateNeedBy, AMV1.aac_AMVisNetNPS as AMVisNetNPS,ISNULL(AMV1.aac_AMVisNetVOC,0) as AMVisNetVOC,ISNULL(AMV1.aac_AMVisActiveAMS,0) as AMVisActiveAMS,ISNULL(AMV1.aac_AMVisFullAMS,0) as AMVisFullAMS, ISNULL(AMV1.aac_AMVisActiveContract,0) as AMVisActiveContract,ISNULL(AMV1.aac_AMVisInPipeline,0) as AMVisInPipeline, ISNULL(AMV1.aac_AMVisSurveyPeriodN,'na') as AMVisSurveyPeriod, AMV1.aac_AMVisCustomerNotes as AMVisCustomerNotes, ISNULL(AMV1.aac_AMVisCategory,'na') as AMVisCategory, AMV1.aac_AMVisAMSSupportStarted as AMVisAMSSupportStarted,CONVERT(VARCHAR(10),AMV1.aac_AMVisCustomerStartDate, 103) as AMVisCustomerStartDate,CONVERT(VARCHAR(10),AMV1.aac_AMVisCustomerAMSTD, 103) as AMVisCustomerAMSTerminatedDate, AMV1.aac_AMVisTerminationReason as AMVisTerminationReason, AMV1.aac_AMVisCustomerActiveOrInA as AMVisCustomerActiveOrInActive, AMV1.aac_AMVisOnPOrOnD as AMVisOnPOrOnD, AMV1.aac_AMVisCustomerType as AMVisCustomerType, AMV1.aac_AMVisCEX as AMVisCEX, AMV1.aac_AMVisPreferredCareContact as AMVisPreferredCareContact, AMV1.aac_AMVisPreferredCareScope as AMVisPreferredCareScope,AMV1.ls_Strings as AMVisSolutionsInScope,AMV1.aac_AMVisERP as AMVisERP,ISNULL(AMV1.aac_AMVisFPC,0)  as AMVisFPC,ISNULL( AMV1.aac_AMVisDataCenter,'na') as AMVisDataCenter, AMV1.aac_AMVisRealmName as AMVisRealmName, AMV1.aac_AMVisCustomerDSC as AMVisCustomerDSC,ISNULL(AMV1.aac_AMVisWeeklyMeetingDayAndT,'na')  as AMVisWeeklyMeetingDayAndTime, AMV1.aac_AMVisAMSSharedMailBox as AMVisAMSSharedMailBox, AMV1.aac_AMVisAMSMonitoring as AMVisAMSMonitoring, AMV1.aac_AMVisDeploymentJamPage as AMVisDeploymentJamPage, AMV1.aac_AMVisAdditionalCustomerC as AMVisAdditionalCustomerContact,AMV1.ls0_Strings as AMVisCustomerspecificProcess,AMV1.ls1_Strings as AMVisCommentsOrNotes, AMV1.aac_AMVisExceptions as AMVisExceptions FROM AMVisAccountTab AMV1 WHERE (AMV1.aac_Active = 1) AND (AMV1.aac_PurgeState = 0) AND (AMV1.aac_AMVisUniqueName ='"+id+"')";
		data.append("query", query);
		data.append("useSQL", "true");
		data.append("type", "json");

		var xhr = new XMLHttpRequest();

		xhr.addEventListener("readystatechange", function () {
			
		  	if (this.readyState === 4) {
		  		 
					loadDropDownsforCustomerForm(this.responseText,id);
		    				}
		});
		
		
		xhr.open("POST", server_url);
		xhr.send(data);


}




function loadDropDownsforCustomerForm(formData,id){
   
    
		var data = new FormData();
		var query="SELECT 'PM' as type,us_3.cus_UniqueName as id, us_3.mls_PrimaryString as UniqueName FROM AMVisAccountTab AMV2 LEFT OUTER JOIN BaseIdTab Bas1 ON (AMV2.aac_AMVisPMs=Bas1.lvId AND AMV2.rootId=Bas1.rootId) LEFT OUTER JOIN us_UserTab us_3 ON (Bas1.val=us_3.rootId) WHERE (AMV2.aac_Active = 1) AND (AMV2.aac_PurgeState = 0) AND (AMV2.aac_AMVisUniqueName = '"+id+"') UNION SELECT 'PME' as type,us_3.cus_UniqueName as id, us_3.mls_PrimaryString as UniqueName FROM AMVisAccountTab AMV2 LEFT OUTER JOIN BaseIdTab Bas1 ON (AMV2.aac_AMVisPME=Bas1.lvId AND AMV2.rootId=Bas1.rootId) LEFT OUTER JOIN us_UserTab us_3 ON (Bas1.val=us_3.rootId) WHERE (AMV2.aac_Active = 1) AND (AMV2.aac_PurgeState = 0) AND (AMV2.aac_AMVisUniqueName ='"+id+"') UNION SELECT 'Experts' as type,us_3.cus_UniqueName as id,us_3.mls_PrimaryString as UniqueName FROM AMVisAccountTab AMV2 LEFT OUTER JOIN BaseIdTab Bas1 ON (AMV2.aac_AMVisKeyAMSExperts=Bas1.lvId AND AMV2.rootId=Bas1.rootId) LEFT OUTER JOIN us_UserTab us_3 ON (Bas1.val=us_3.rootId) WHERE (AMV2.aac_Active = 1) AND (AMV2.aac_PurgeState = 0) AND (AMV2.aac_AMVisUniqueName ='"+id+"')";//acc.AMVisUniqueName="+id
		data.append("query", query);
		data.append("useSQL", "true");
		data.append("type", "json");

		var xhr = new XMLHttpRequest();

		xhr.addEventListener("readystatechange", function () {
			
		  	if (this.readyState === 4) {
					setUpEditForm(formData,JSON.parse(this.responseText));
		    				}
		});
		 
		xhr.open("POST", server_url);
		xhr.send(data);

}

function setUpEditForm(formData,dropdownData){



  var formValues =JSON.parse(formData);

  //setting up all radio buttons
  $("#customerInfoForm label.radio").each(function(i,v){
       $(v).removeClass("checked");
  });
  
  //setting up all input box
  $("#customerInfoForm input.form-control").each(function(i,v){ 

  	if($(v).attr("type")=="text")
  	   $(v).val(formValues[0][$(v).attr("name")]); 

  	if($(v).attr("type")=="radio" ){
  		//$(v).parent().; 
  		
  		if($(v).attr("value")=="true" && formValues[0][$(v).attr("name")]=="1"){
  			$(v).closest(".radio").addClass("checked");
  		}
  		if($(v).attr("value")=="false" && formValues[0][$(v).attr("name")]=="0"){
  			$(v).closest(".radio").addClass("checked");
  		}

  		if($(v).attr("value")=="onDemand" &&  formValues[0][$(v).attr("name")]=="onDemand"){
		  			$(v).closest(".radio").addClass("checked");
		 }

		if($(v).attr("value")=="onPremise" &&  formValues[0][$(v).attr("name")]=="onPremise"){
		  			$(v).closest(".radio").addClass("checked");
		}

		if($(v).attr("value")=="both"  &&  formValues[0][$(v).attr("name")]=="both"){
		  			$(v).closest(".radio").removeClass("checked");
		 }
  	}

  });

  //setting up all input box
  $("#customerInfoForm textarea.form-control").each(function(i,v){ 

  	if($(v).attr("type")=="text")
  	   $(v).val(formValues[0][$(v).attr("name")]); 

  });



  $("#customerInfoForm select.form-control").each(function(i,v){ 
       
       if(typeof(formValues[0][$(v).attr("name")])!="undefined")
  	   $(v).val(formValues[0][$(v).attr("name")]); 

  });

  for(var i=0;i<dropdownData.length;i++){

    if(dropdownData[i].type=="PM")
  	$("#AMVisPM option[value='"+dropdownData[i].id+"']").prop("selected", true);

    if(dropdownData[i].type=="PME")
  	$("#AMVisPME option[value='"+dropdownData[i].id+"']").prop("selected", true);

  	if(dropdownData[i].type=="Experts")
  	$("#AMVisKeyAMSExperts option[value='"+dropdownData[i].id+"']").prop("selected", true);

  }

  //var AmvisDatetime=formValues[0]["AMVisWeeklyMeetingDayAndTime"];

/*  
  var dateTime = new Date(AmvisDatetime);
  dateTime = moment(AmvisDatetime).format("DD/MM/YYYY HH:mm A");
 
  $("input[name='AMVisWeeklyMeetingDayAndTime']").val(dateTime);
*/


  var modules=formValues[0]["AMVisModules"];

  if(typeof(modules)!="undefined")
   modules=modules.split(",");

  for(var i=0;i<modules.length;i++){
  	$("#AMVisModules option[value='"+modules[i]+"']").prop("selected", true);
  }

  var AMVisSolutionsInScope=formValues[0]["AMVisSolutionsInScope"];

  if(typeof(AMVisSolutionsInScope)!="undefined")
   AMVisSolutionsInScope=AMVisSolutionsInScope.split(",");

  for(var i=0;i<AMVisSolutionsInScope.length;i++){
  	$("#AMVisModules option[value='"+AMVisSolutionsInScope[i]+"']").prop("selected", true);
  }


  $("#AMVisPM").trigger("change");
  $("#AMVisPME").trigger("change");
  $("#AMVisModules").trigger("change");
  $("#AMVisSolutionsInScope").trigger("change");
  $("#AMVisKeyAMSExperts").trigger("change");

  var AMVisCustomerspecificProcess=formValues[0]["AMVisCustomerspecificProcess"];
  var AMVisCommentsOrNotes=formValues[0]["AMVisCommentsOrNotes"];

  try{

  	if(/<\/?[a-z][\s\S]*>/i.test(AMVisCustomerspecificProcess)){

  		AMVisCustomerSpecificQuill.clipboard.dangerouslyPasteHTML(0,AMVisCustomerspecificProcess);

  	}else{


  	  if(typeof(AMVisCustomerspecificProcess)!="undefined" && (AMVisCustomerspecificProcess.indexOf('insert')!=-1)){
  	  	//AMVisCustomerspecificProcess=AMVisCustomerspecificProcess.replace(/?/gi,'');
	  	AMVisCustomerspecificProcess=JSON.parse(AMVisCustomerspecificProcess);
		AMVisCustomerSpecificQuill.setContents(AMVisCustomerspecificProcess);
			
	  }else{

	  	var delta={"ops":[]};
	    delta.ops=[{"insert":AMVisCustomerspecificProcess}];
	    AMVisCustomerSpecificQuill.setContents(delta);
	  }


  	}


  	  }catch(err){
  			console.log(err);
  	  }		


  	  try{

  	 if(/<\/?[a-z][\s\S]*>/i.test(AMVisCommentsOrNotes)){

  		AMVisCommentsQuill.clipboard.dangerouslyPasteHTML(0,AMVisCommentsOrNotes);

  	}else{


  	   if(typeof(AMVisCommentsOrNotes)!="undefined" && (AMVisCommentsOrNotes.indexOf('insert')!=-1)){
  	   //	AMVisCommentsOrNotes=AMVisCommentsOrNotes.replace(/?/gi,'');
	  	AMVisCommentsOrNotes=JSON.parse(AMVisCommentsOrNotes);
	  	AMVisCommentsQuill.setContents(AMVisCommentsOrNotes);
	  }else{

	    var delta={"ops":[]};  
	    delta.ops=[{"insert":AMVisCommentsOrNotes}];
	    AMVisCommentsQuill.setContents(delta);
	  }


  	}

  	  }catch(err){
  	  	console.log(err);
  	  }



  $("#divLoading").hide();

  $("#myModal").modal("show");
  
/*
  if(typeof(AMVisCommentsOrNotes)!="undefined")
  $("#AMVisCommentsOrNotes").html(AMVisCommentsOrNotes);*/

  

  

}


//loding account table


function loadCustomerTable(){

$("#example2").dataTable().fnDestroy();

var data = new FormData();
data.append("query", "Select Distinct AMVisShortName,AMVisName,AMVisRegion,AMVisUniqueName from config.amvis.core.AMVisAccount Where AMVisCRMID is not null");
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
			            },
			            {
			                targets:3,
			                render: function ( data, type, row, meta ) {
			                    if(type === 'display'){
			                       var data="'"+data+"'";
			                        data = '<a onclick="showEditForm('+ data +')"  class="btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
			                    }

			                    return data;
			                }
			            }
			        ]
				
						});
    				}
});
 

xhr.open("POST", server_url);


xhr.send(data);

}

loadCustomerTable();








