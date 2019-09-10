var data = new FormData();
data.append("query", "Select FeatureName1, FeatureID1, SuiteName1, ModuleName1, YearOfRelease1, MonthOfRelease1, FeatureURL1 from config.amvis.core.FeatureLists Where SuiteName1 = 'Operational Procurement'");
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();
var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

   var table= $('#example7').dataTable({
    "aaData": NAC,
	 dom: 'Blfrtip',
	 "deferRender": true,
	order: [[ 6, "dsc" ]],
	"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return data = '<a href="' + encodeURIComponent(data) + '">' + "Documentation" + '</a>';
                },
                "targets": 6
            },
   ],
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
data.append("query", "Select FeatureName1, FeatureID1, SuiteName1, ModuleName1, YearOfRelease1, MonthOfRelease1, FeatureURL1 from config.amvis.core.FeatureLists Where SuiteName1 = 'Strategic Procurement'");
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();
var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

   var table= $('#example8').dataTable({
    "aaData": NAC,
	 "deferRender": true,
	order: [[ 6, "dsc" ]],
	"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return data = '<a href="' + encodeURIComponent(data) + '">' + "Documentation" + '</a>';
                },
                "targets": 6
            },
   ]
		
   });



    }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "Select FeatureName1, FeatureID1, SuiteName1, ModuleName1, YearOfRelease1, MonthOfRelease1, FeatureURL1 from config.amvis.core.FeatureLists Where SuiteName1 = 'Platform & Technology'");
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();
var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

   var table= $('#example9').dataTable({
    "aaData": NAC,
	 "deferRender": true,
	order: [[ 6, "dsc" ]],
	"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return data = '<a href="' + encodeURIComponent(data) + '">' + "Documentation" + '</a>';
                },
                "targets": 6
            },
   ]
		
   });



    }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "Select FeatureName1, FeatureID1, SuiteName1, ModuleName1, YearOfRelease1, MonthOfRelease1, FeatureURL1 from config.amvis.core.FeatureLists Where SuiteName1 = 'Catalog and Spot Buy'");
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();
var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

   var table= $('#example10').dataTable({
    "aaData": NAC,
	 "deferRender": true,
	order: [[ 6, "dsc" ]],
	"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return data = '<a href="' + encodeURIComponent(data) + '">' + "Documentation" + '</a>';
                },
                "targets": 6
            },
   ]
		
   });



    }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);


var data = new FormData();
data.append("query", "Select FeatureName1, FeatureID1, SuiteName1, ModuleName1, YearOfRelease1, MonthOfRelease1, FeatureURL1 from config.amvis.core.FeatureLists Where SuiteName1 not in ('Operational Procurement','Strategic Procurement','Platform & Technology','Catalog and Spot Buy') ");
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();
var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

   var table= $('#example12').dataTable({
    "aaData": NAC,
	 "deferRender": true,
	order: [[ 6, "dsc" ]],
	"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return data = '<a href="' + encodeURIComponent(data) + '">' + "Documentation" + '</a>';
                },
                "targets": 6
            },
   ]
		
   });



    }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);



