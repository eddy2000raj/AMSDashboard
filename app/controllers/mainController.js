app.controller('MainController', function ($scope, $location, $http, $timeout, WidgetDrawing) {
	
	$scope.widgets  = [
		{
			myid: "Number_Of_Open_Tickets_P1",
			name:"Number Of Open Tickets",
			query:"SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND AMVisPriority='P1 - VERY HIGH'",
			type: "text"
		},
		{
			myid: "Open_SRs_in_24_hours",
			name:"Number Of Open Tickets",
			query:"SELECT count() FROM AMVisTicket WHERE CurrentDate() - AMVisDateCreated < 1 AND AMVisPriority='P1 - VERY HIGH'",
			type: "text"
		},
		{
			myid: "Open_SRs_in_24_hours_table",
			name:"Number Of Open Tickets",
			query:"SELECT AMVisSRNumber, AMVisContactName, AMVisPriority FROM AMVisTicket WHERE CurrentDate() - AMVisDateCreated < 1 ",
			type: "table"
		}
	];
		
		
	WidgetDrawing.registerWidgets($scope.widgets)
	
	
});
