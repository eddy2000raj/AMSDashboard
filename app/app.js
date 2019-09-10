//var app = angular.module('AMSDashboard', ['ui','ui.bootstrap','ngRoute','nvd3','angular-pivottable']);
var app = angular.module('AMSDashboard', ['ngRoute']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/main',
            {
                controller: 'MainController',
                templateUrl: 'app/partials/main.html'
            })
        .when('/customer',
            {
                controller: 'CustomerController',
                templateUrl: 'app/partials/customer.html'
            })
		.when('/team',
            {
                controller: 'TeamController',
                templateUrl: 'app/partials/team.html'
            })
		.when('/userdashboard',
            {
                controller: 'UserDashboardController',
                templateUrl: 'app/partials/user-dashboard.html'
            })
        .otherwise({ redirectTo: '/main' });
});

app.controller('IndexController', ['$scope', '$location', function($scope, $location) {
    $scope.locationPath = $location.path();
}]);

/*
app.config(
	function ($tooltipProvider) {
        $tooltipProvider.options( { appendToBody: true } );
});
*/



app.factory('WidgetDrawing', function($http){
	var allWidgets = [];
	
	return {
		registerWidgets : function(widgets){
			allWidgets = allWidgets.concat(widgets);
		},
    	redrawWidget: function(widget){
    		widget.status="loading";
			$http({
				method : "POST",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				url : "http://localhost.ariba.com/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData",
				//url : "http://ams.ariba.com:93/Sourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData",
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj){
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
					return str.join("&");
				},
				data: { "query" : widget.query instanceof Function ? widget.query() : widget.query, 
						"type" : widget.type == "url" ? "text" : widget.type , 
						"useSQL" : widget.useSQL}
			}).then(
				function mySucces(response) {
					widget.data = response.data;
					widget.status = "loaded";
				}, 
				function myError(response) {
					widget.error = response.statusText;
					widget.status = "error";
				}
			);
    	},
		
		redrawAllWidgets: function(widgets){
			for(var i=0; i < widgets.length; i++){
				this.redrawWidget(widgets[i]);
			}
		},
		
		findRegisteredWidget: function(widgetId){
			return this.findWidget(widgetId, allWidgets);
		},
		
		findWidget: function(widgetId, widgets){
			for(var i=0; i < widgets.length; i++){
				if(widgets[i].myid == widgetId){
					return widgets[i];
				}
			}
		}
		
	};
	
});






