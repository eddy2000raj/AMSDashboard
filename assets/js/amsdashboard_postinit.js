$(document).ready(function(){

        	//demo.initChartist();

        	$.notify({
            	icon: 'ti-gift',
            	message: "Welcome to the <b>AMS Dashboard</b>! Designed to make managing AMS projects simple and easy!"

            },{
                type: 'success',
                timer: 4000
            });
			
			$(".table-filter").dataTable();
    	});