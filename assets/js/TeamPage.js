var data = new FormData();
data.append("query", "Select t.AMVisAssignedTo.Name.PrimaryString, CASE t.AMVisAssignedTo.Supervisor.Name.PrimaryString WHEN 'Krishna Kuchimanchi' THEN 'AMERICAS' WHEN 'Tony Wu' THEN 'AMERICAS' WHEN 'Lukas Gunar' THEN 'EMEA' WHEN 'Michal Scerbak' THEN 'EMEA' WHEN 'Erik Ivancak' THEN 'EMEA' WHEN 'Krishna Veerappa' THEN 'APJ' WHEN 'Samir Sato' THEN 'APJ' ELSE 'GLOBAL' END as \"TeamLocation\", SUM(CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END) as OTP1, SUM(CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END) as OTP2, SUM(CASE t.AMVisPriority WHEN 'P3 - MEDIUM'THEN 1 ELSE 0 END) as OTP3, SUM(CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END) as OTP4, count(this) from config.amvis.core.AMVisTicket t Where CurrentDate() - t.AMVisDateAssigned Between 0 and 30 Group by t.AMVisAssignedTo.Name.PrimaryString, t.AMVisAssignedTo.Supervisor.Name.PrimaryString");
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
	 "deferRender": true,
	order: [[ 6, "dsc" ]],
	"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return data = '<a href="http://blrd50877161a.apj.global.corp.sap:8080/sr/dashboard/user-dashboard.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                },
                "targets": 0
            },
   ]
		
   });



    }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "SELECT us_1.mls_PrimaryString, CASE us_3.mls_PrimaryString WHEN 'Krishna Kuchimanchi' THEN 'AMERICAS' WHEN 'Tony Wu' THEN 'AMERICAS' WHEN 'Lukas Gunar' THEN 'EMEA' WHEN 'Michal Scerbak' THEN 'EMEA' WHEN 'Erik Ivancak' THEN 'EMEA' WHEN 'Krishna Veerappa' THEN 'APJ' WHEN 'Samir Sato' THEN 'APJ' ELSE 'GLOBAL' END, SUM(CASE datepart(month,AMV1.ati_AMVisDateClosed) WHEN 1 THEN 1 ELSE 0 END) AS January, SUM(CASE datepart(month,AMV1.ati_AMVisDateClosed) WHEN 2 THEN 1 ELSE 0 END) AS February, SUM(CASE datepart(month,AMV1.ati_AMVisDateClosed) WHEN 3 THEN 1 ELSE 0 END) AS March, SUM(CASE datepart(month,AMV1.ati_AMVisDateClosed) WHEN 4 THEN 1 ELSE 0 END) AS April, SUM(CASE datepart(month,AMV1.ati_AMVisDateClosed) WHEN 5 THEN 1 ELSE 0 END) AS May, SUM(CASE datepart(month,AMV1.ati_AMVisDateClosed) WHEN 6 THEN 1 ELSE 0 END) AS June, SUM(CASE datepart(month,AMV1.ati_AMVisDateClosed) WHEN 7 THEN 1 ELSE 0 END) AS July, SUM(CASE datepart(month,AMV1.ati_AMVisDateClosed) WHEN 8 THEN 1 ELSE 0 END) AS August, SUM(CASE datepart(month,AMV1.ati_AMVisDateClosed) WHEN 9 THEN 1 ELSE 0 END) AS September, SUM(CASE datepart(month,AMV1.ati_AMVisDateClosed) WHEN 10 THEN 1 ELSE 0 END) AS October, SUM(CASE datepart(month,AMV1.ati_AMVisDateClosed) WHEN 11 THEN 1 ELSE 0 END) AS November, SUM(CASE datepart(month,AMV1.ati_AMVisDateClosed) WHEN 12 THEN 1 ELSE 0 END) AS December, SUM(CASE datepart(quarter,AMV1.ati_AMVisDateClosed) WHEN 1 THEN 1 ELSE 0 END) AS Quarter1, SUM(CASE datepart(quarter,AMV1.ati_AMVisDateClosed) WHEN 2 THEN 1 ELSE 0 END) AS Quarter2, SUM(CASE datepart(quarter,AMV1.ati_AMVisDateClosed) WHEN 3 THEN 1 ELSE 0 END) AS Quarter3, SUM(CASE datepart(quarter,AMV1.ati_AMVisDateClosed) WHEN 4 THEN 1 ELSE 0 END) AS Quarter4, SUM(CASE datepart(year,AMV1.ati_AMVisDateClosed) WHEN 2019 THEN 1 ELSE 0 END) AS TOTAL FROM AMVisTicketTab AMV1 INNER JOIN us_UserTab us_1 ON(AMV1.ati_AMVisAssignedTo=us_1.rootId) INNER JOIN us_UserTab us_3 ON (us_1.cus_Supervisor=us_3.rootId) WHERE ( AMV1.ati_AMVisDateClosed BETWEEN '2019/01/01' AND '2019/12/31' AND AMV1.ati_AMVisAssignedTeam = 'GS APP MGMT') AND (AMV1.ati_Active = 1) AND (AMV1.ati_PurgeState = 0) AND (us_1.cus_Active = 1) AND (us_1.cus_PurgeState = 0) AND (us_3.cus_Active = 1) AND (us_3.cus_PurgeState = 0) GROUP BY us_1.mls_PrimaryString, us_3.mls_PrimaryString Order By 2,1");
data.append("type", "table");
data.append("useSQL", "true");

var xhr = new XMLHttpRequest();
var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

   var table= $('#CTS').dataTable({
    "aaData": NAC,
	order: [[ 18, "dsc" ]],
	"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return data = '<a href="http://blrd50877161a.apj.global.corp.sap:8080/sr/dashboard/user-dashboard.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                },
                "targets": 0
            },
   ]
		
   });



    }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);

var data = new FormData();
data.append("query", "Select t.AMVisAssignedTo.Name.PrimaryString,CASE t.AMVisAssignedTo.Supervisor.Name.PrimaryString WHEN 'Krishna Kuchimanchi' THEN 'AMERICAS' WHEN 'Tony Wu' THEN 'AMERICAS' WHEN 'Lukas Gunar' THEN 'EMEA' WHEN 'Michal Scerbak' THEN 'EMEA' WHEN 'Erik Ivancak' THEN 'EMEA' WHEN 'Krishna Veerappa' THEN 'APJ' WHEN 'Samir Sato' THEN 'APJ' ELSE 'GLOBAL' END as \"TeamLocation\",SUM(CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END)  as OTP1,SUM(CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END)  as OTP2,SUM(CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END)  as OTP3,SUM(CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END)  as OTP4,count(this) as Total from config.amvis.core.AMVisTicket t JOIN ariba.user.core.User u USING t.AMVisAssignedTo Where CurrentDate() - t.AMVisDateClosed Between 0 and 30 and t.AMVisIsAMSTicket!=false and AMVisAssignedTeam ='GS APP MGMT' Group by t.AMVisAssignedTo.Name.PrimaryString,t.AMVisAssignedTo.Supervisor.Name.PrimaryString");
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();
var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

   var table= $('#example77').dataTable({
    "aaData": NAC,
	order: [[ 6, "dsc" ]],
	"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return data = '<a href="http://blrd50877161a.apj.global.corp.sap:8080/sr/dashboard/user-dashboard.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                },
                "targets": 0
            },
   ]
		
   });



    }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);


var data = new FormData();
data.append("query", "SELECT AMVisAssignedTo.Name.PrimaryString as EmployeeName,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as OTP1,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as OTP2,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as OTP3,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as OTP4,SUM(CASE t.AMVisSubStatus When 'Research' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as RP1,SUM(CASE t.AMVisSubStatus When 'Research' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as RP2,SUM(CASE t.AMVisSubStatus When 'Research' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as RP3,SUM(CASE t.AMVisSubStatus When 'Research' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as RP4,SUM(CASE t.AMVisSubStatus When 'Customer Update' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as CUP1,SUM(CASE t.AMVisSubStatus When 'Customer Update' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as CUP2,SUM(CASE t.AMVisSubStatus When 'Customer Update' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as CUP3,SUM(CASE t.AMVisSubStatus When 'Customer Update' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as CUP4,SUM(CASE t.AMVisSubStatus When 'Pending Customer Input' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as PCIP1,SUM(CASE t.AMVisSubStatus When 'Pending Customer Input' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as PCIP2,SUM(CASE t.AMVisSubStatus When 'Pending Customer Input' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as PCIP3,SUM(CASE t.AMVisSubStatus When 'Pending Customer Input' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as PCIP4,SUM(CASE t.AMVisSubStatus When 'Pending Customer Confirmation' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as PCCIP1,SUM(CASE t.AMVisSubStatus When 'Pending Customer Confirmation' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as PCCIP2,SUM(CASE t.AMVisSubStatus When 'Pending Customer Confirmation' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as PCCIP3,SUM(CASE t.AMVisSubStatus When 'Pending Customer Confirmation' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as PCCIP4,SUM(CASE t.AMVisStatus When 'OPEN' THEN 1 ELSE 0 END) as ActiveOpen FROM config.amvis.core.AMVisTicket as t left outer join ariba.user.core.User as u using t.AMVisAssignedTo Where u.Supervisor.Name.PrimaryString in ('Krishna Veerappa','Samir Sato') and AMVisDateClosed IS NULL and t.AMVisIsAMSTicket!=false Group By AMVisAssignedTo.Name.PrimaryString");
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

   var table= $('#example4').dataTable({
    "aaData": NAC,
		"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return data = '<a href="http://blrd50877161a.apj.global.corp.sap:8080/sr/dashboard/user-dashboard.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                },
                "targets": 0
            },
            {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data +'/'+ row[2]+'/'+ row[3]+'/'+ row[4];
                },
                "targets": 1
            },
			{
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data +'/'+ row[6]+'/'+ row[7]+'/'+ row[8];
                },
                "targets": 5
            },
			{
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data +'/'+ row[10]+'/'+ row[11]+'/'+ row[12];
                },
                "targets": 9
            },
			{
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data +'/'+ row[14]+'/'+ row[15]+'/'+ row[16];
                },
                "targets": 13
            },
			{
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data +'/'+ row[18]+'/'+ row[19]+'/'+ row[20];
                },
                "targets": 17
            },
            { "visible": false,  "targets": [ 2,3,4,6,7,8,10,11,12,14,15,16,18,19,20 ] }

        ]






   });



    }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);




var data = new FormData();
data.append("query", "SELECT AMVisAssignedTo.Name.PrimaryString as EmployeeName,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as OTP1,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as OTP2,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as OTP3,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as OTP4,SUM(CASE t.AMVisSubStatus When 'Research' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as RP1,SUM(CASE t.AMVisSubStatus When 'Research' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as RP2,SUM(CASE t.AMVisSubStatus When 'Research' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as RP3,SUM(CASE t.AMVisSubStatus When 'Research' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as RP4,SUM(CASE t.AMVisSubStatus When 'Customer Update' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as CUP1,SUM(CASE t.AMVisSubStatus When 'Customer Update' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as CUP2,SUM(CASE t.AMVisSubStatus When 'Customer Update' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as CUP3,SUM(CASE t.AMVisSubStatus When 'Customer Update' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as CUP4,SUM(CASE t.AMVisSubStatus When 'Pending Customer Input' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as PCIP1,SUM(CASE t.AMVisSubStatus When 'Pending Customer Input' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as PCIP2,SUM(CASE t.AMVisSubStatus When 'Pending Customer Input' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as PCIP3,SUM(CASE t.AMVisSubStatus When 'Pending Customer Input' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as PCIP4,SUM(CASE t.AMVisSubStatus When 'Pending Customer Confirmation' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as PCCIP1,SUM(CASE t.AMVisSubStatus When 'Pending Customer Confirmation' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as PCCIP2,SUM(CASE t.AMVisSubStatus When 'Pending Customer Confirmation' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as PCCIP3,SUM(CASE t.AMVisSubStatus When 'Pending Customer Confirmation' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as PCCIP4,SUM(CASE t.AMVisStatus When 'OPEN' THEN 1 ELSE 0 END) as ActiveOpen FROM config.amvis.core.AMVisTicket as t left outer join ariba.user.core.User as u using t.AMVisAssignedTo Where u.Supervisor.Name.PrimaryString in ('Krishna Kuchimanchi','Tony Wu') and AMVisDateClosed IS NULL and t.AMVisIsAMSTicket!=false Group By AMVisAssignedTo.Name.PrimaryString");
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

   var table= $('#example3').dataTable({
    "aaData": NAC,
		"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return data = '<a href="http://blrd50877161a.apj.global.corp.sap:8080/sr/dashboard/user-dashboard.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                },
                "targets": 0
            },
            {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data +'/'+ row[2]+'/'+ row[3]+'/'+ row[4];
                },
                "targets": 1
            },
			{
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data +'/'+ row[6]+'/'+ row[7]+'/'+ row[8];
                },
                "targets": 5
            },
			{
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data +'/'+ row[10]+'/'+ row[11]+'/'+ row[12];
                },
                "targets": 9
            },
			{
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data +'/'+ row[14]+'/'+ row[15]+'/'+ row[16];
                },
                "targets": 13
            },
			{
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data +'/'+ row[18]+'/'+ row[19]+'/'+ row[20];
                },
                "targets": 17
            },
            { "visible": false,  "targets": [ 2,3,4,6,7,8,10,11,12,14,15,16,18,19,20 ] }

        ]






   });



    }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);




var data = new FormData();
data.append("query", "SELECT AMVisAssignedTo.Name.PrimaryString as EmployeeName,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as OTP1,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as OTP2,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as OTP3,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as OTP4,SUM(CASE t.AMVisSubStatus When 'Research' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as RP1,SUM(CASE t.AMVisSubStatus When 'Research' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as RP2,SUM(CASE t.AMVisSubStatus When 'Research' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as RP3,SUM(CASE t.AMVisSubStatus When 'Research' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as RP4,SUM(CASE t.AMVisSubStatus When 'Customer Update' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as CUP1,SUM(CASE t.AMVisSubStatus When 'Customer Update' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as CUP2,SUM(CASE t.AMVisSubStatus When 'Customer Update' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as CUP3,SUM(CASE t.AMVisSubStatus When 'Customer Update' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as CUP4,SUM(CASE t.AMVisSubStatus When 'Pending Customer Input' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as PCIP1,SUM(CASE t.AMVisSubStatus When 'Pending Customer Input' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as PCIP2,SUM(CASE t.AMVisSubStatus When 'Pending Customer Input' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as PCIP3,SUM(CASE t.AMVisSubStatus When 'Pending Customer Input' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as PCIP4,SUM(CASE t.AMVisSubStatus When 'Pending Customer Confirmation' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as PCCIP1,SUM(CASE t.AMVisSubStatus When 'Pending Customer Confirmation' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as PCCIP2,SUM(CASE t.AMVisSubStatus When 'Pending Customer Confirmation' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as PCCIP3,SUM(CASE t.AMVisSubStatus When 'Pending Customer Confirmation' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as PCCIP4,SUM(CASE t.AMVisStatus When 'OPEN' THEN 1 ELSE 0 END) as ActiveOpen FROM config.amvis.core.AMVisTicket as t left outer join ariba.user.core.User as u using t.AMVisAssignedTo Where u.Supervisor.Name.PrimaryString in ('Lukas Gunar','Michal Scerbak','Erik Ivancak') and AMVisDateClosed IS NULL and t.AMVisIsAMSTicket!=false Group By AMVisAssignedTo.Name.PrimaryString");
data.append("useSQL", "");
data.append("type", "table");

var xhr = new XMLHttpRequest();



xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {

	var NAC =JSON.parse(this.responseText);
	var NAC2 = NAC.shift();

   var table= $('#example2').dataTable({
    "aaData": NAC,
		"columnDefs": [
		    {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                   return data = '<a href="http://blrd50877161a.apj.global.corp.sap:8080/sr/dashboard/user-dashboard.html?name=' + encodeURIComponent(data) + '">' + data + '</a>';
                },
                "targets": 0
            },
            {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data +'/'+ row[2]+'/'+ row[3]+'/'+ row[4];
                },
                "targets": 1
            },
			{
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data +'/'+ row[6]+'/'+ row[7]+'/'+ row[8];
                },
                "targets": 5
            },
			{
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data +'/'+ row[10]+'/'+ row[11]+'/'+ row[12];
                },
                "targets": 9
            },
			{
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data +'/'+ row[14]+'/'+ row[15]+'/'+ row[16];
                },
                "targets": 13
            },
			{
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    return data +'/'+ row[18]+'/'+ row[19]+'/'+ row[20];
                },
                "targets": 17
            },
            { "visible": false,  "targets": [ 2,3,4,6,7,8,10,11,12,14,15,16,18,19,20 ] }

        ]






   });



    }
});


xhr.open("POST", "http://blrd50877161a.apj.global.corp.sap:93/AMMSourcing/Main/ad/fetchData/config.amvis.amsdashboard.GetJSONData");


xhr.send(data);