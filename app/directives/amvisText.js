app.directive('amvisText', function(WidgetDrawing) {
	return {
		restrict : 'E',
		scope : {},
		templateUrl : 'app/directives/amvisText.html',
		link: function($scope, $element, attributes) {
			var widgetId = attributes.id
			//console.log("Triggering link " + widgetId);
			$scope.widget = WidgetDrawing.findRegisteredWidget(widgetId);
			//trigger the query execution
			WidgetDrawing.redrawWidget($scope.widget);
			//let two way binding do the magic.. we just use the {{widget.data[0]}}  in the html 
		}
	}
});