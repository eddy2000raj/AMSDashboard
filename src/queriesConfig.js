import moment from 'moment';
import 'url-search-params-polyfill';

const properties = {
 formatData(response){
  
  //let result=[];
    //aaa.sort((a, b) => a[3].localeCompare(b[3]));

     let result=[
                 {'key':'Closed',values:[]},
                 {'key':'Open',values:[]},
                 {'key':'Backlog',values:[]}],k=0,l=0,m=0,done=true;
   
       //let values=[];
       for(let j=0;j<response.length;j++){
            
         let d=response[j];//elements in order with keys
         
          //values.push({'x':j,'y':parseInt(aaa[j][2]),'idx':aaa[j][3]});
          //result[i]['values']=values;
          result[0]['values'].push({'x':(j+1),'y':parseInt(d['closed']),'idx':d['dataYear']});
         
      
          //values.push({'x':j,'y':parseInt(aaa[j][2]),'idx':aaa[j][3]});
          result[1]['values'].push({'x':(j+1),'y':parseInt(d['opened']),'idx':d['dataYear']});
          
         
          //values.push({'x':j,'y':parseInt(aaa[j][2]),'idx':aaa[j][3]});
          result[2]['values'].push({'x':(j+1),'y':parseInt(d['backlog']),'idx':d['dataYear']});
         }
      
      
  
  return result;
},
  formatTableData(data){

  let result={};
 
  let tableData=[['Backlog',0,0,0,0,0,0,0,0,0,0,0,0],
  ['Closed',0,0,0,0,0,0,0,0,0,0,0,0],
  ['Open',0,0,0,0,0,0,0,0,0,0,0,0]];


  let backlogHeader=[{'title':'Tickets Stats'}];
  let backlog=tableData[0];
  let closed=tableData[1];
  let open=tableData[2];

  for(let v in data){
  
      if(data[v]['key']=="Backlog"){
   
      let i=1;
      for(let b in data[v]['values']){
      
        let value=data[v]['values'][b];      
        backlog[i]=value['y'];
        tableData[0]=backlog;

        var obj={};
        obj['title']=value['idx'];
        backlogHeader.push(obj);

         i++;
      }
    
      //tableData[0]=.concat(backlog);
  
      }
  
      if(data[v]['key']=="Closed"){
   
        let i=1;
      for(let b in data[v]['values']){
      
      let value=data[v]['values'][b]
      
      
      closed[i]=value['y'];
      tableData[1]=closed;
        i++
      }
    
      //tableData[1].push(closed);
      //tableData[1]=tableData[1].concat(closed);
  
      }
  
      if(data[v]['key']=="Open"){
   
        let i=1;
      for(let b in data[v]['values']){
      
      let value=data[v]['values'][b];
      
      
      open[i]=value['y'];

      tableData[2]=open;
      
      i++;
      }
    
      //tableData[2].push(open);
      //tableData[2]=tableData[2].concat(open);
  
      }
   
}

    
    //callback(tableData,backlogHeader);

    result['tableData']=tableData || [];
    result['tableHeader']=backlogHeader || [{'title':"Column1"},{'title':"Column2"}];

    return result;
  
} ,
 openSRsCountbyCustomer:function(customerId){
   return "SELECT 'BMS' as \"tagName\",COUNT(AMV1.ati_AMVisSRNumber) as count FROM AMVisTicketTab AMV1 LEFT OUTER JOIN AMVisAccountTab AMV2 ON (AMV1.ati_AMVisAccount=AMV2.rootId) WHERE (AMV1.ati_AMVisSubStatus IN ('Pending Customer Input', 'Customer - Hold') AND AMV1.ati_AMVisStatus = 'OPEN' AND AMV2.aac_AMVisUniqueName = '"+customerId+"') AND (AMV1.ati_Active = 1) AND (AMV1.ati_PurgeState = 0) AND (AMV2.aac_Active = 1 OR (AMV1.ati_AMVisAccount IS NULL AND AMV2.aac_Active IS NULL)) AND (AMV2.aac_PurgeState = 0 OR (AMV1.ati_AMVisAccount IS NULL AND AMV2.rootId IS NULL)) UNION ALL SELECT  'AMS' as \"tagName\",COUNT(AMV101.ati_AMVisSRNumber) as count FROM AMVisTicketTab AMV101 LEFT OUTER JOIN AMVisAccountTab AMV102 ON (AMV101.ati_AMVisAccount=AMV102.rootId) WHERE (AMV101.ati_AMVisSubStatus IN ('Research', 'Customer Update', 'Internal Assistance', 'Screen Sharing Scheduled') AND AMV101.ati_AMVisStatus = 'OPEN' AND AMV102.aac_AMVisUniqueName = '"+customerId+"') AND (AMV101.ati_Active = 1) AND (AMV101.ati_PurgeState = 0) AND (AMV102.aac_Active = 1 OR (AMV101.ati_AMVisAccount IS NULL AND AMV102.aac_Active IS NULL)) AND (AMV102.aac_PurgeState = 0 OR (AMV101.ati_AMVisAccount IS NULL AND AMV102.rootId IS NULL)) UNION ALL SELECT 'Support' as \"tagName\",COUNT(AMV1.ati_AMVisSRNumber) as count FROM AMVisTicketTab AMV1 LEFT OUTER JOIN AMVisAccountTab AMV2 ON (AMV1.ati_AMVisAccount=AMV2.rootId) WHERE (AMV1.ati_AMVisSubStatus IN ('TSS','Fix ETA') AND AMV1.ati_AMVisStatus = 'OPEN' AND AMV2.aac_AMVisUniqueName = '"+customerId+"') AND (AMV1.ati_Active = 1) AND (AMV1.ati_PurgeState = 0) AND (AMV2.aac_Active = 1 OR (AMV1.ati_AMVisAccount IS NULL AND AMV2.aac_Active IS NULL)) AND (AMV2.aac_PurgeState = 0 OR (AMV1.ati_AMVisAccount IS NULL AND AMV2.rootId IS NULL)) UNION ALL SELECT 'Release' as \"tagName\",COUNT(AMV1.ati_AMVisSRNumber) as count FROM AMVisTicketTab AMV1 LEFT OUTER JOIN AMVisAccountTab AMV2 ON (AMV1.ati_AMVisAccount=AMV2.rootId) WHERE (AMV1.ati_AMVisSubStatus IN ('Implemented in Test','Pending Customer Confirmation') AND AMV1.ati_AMVisStatus = 'OPEN' AND AMV2.aac_AMVisUniqueName = '"+customerId+"') AND (AMV1.ati_Active = 1) AND (AMV1.ati_PurgeState = 0) AND (AMV2.aac_Active = 1 OR (AMV1.ati_AMVisAccount IS NULL AND AMV2.aac_Active IS NULL)) AND (AMV2.aac_PurgeState = 0 OR (AMV1.ati_AMVisAccount IS NULL AND AMV2.rootId IS NULL))";
 },
 openSRrsbyCustomer:function(customerId){
      return "SELECT t.AMVisSRNumber as \"SR Number\",t.AMVisProductLine as \"Product Category\" ,t.AMVisDateCreated as \"Date Created\", u.Name.PrimaryString as \"Contact Person\",t.AMVisDescription as \"Description\", t.AMVisPriority as \"Urgency\",t.AMVisContactName as \"Employee Responsible\",t.AMVisResolution as \"Current Status\", t.AMVisSubStatus as \"Status\" FROM AMVisTicket t LEFT OUTER JOIN ariba.user.core.User u USING t.AMVisAssignedTo WHERE t.AMVisAccount.AMVisUniqueName IN('"+customerId+"') AND t.AMVisStatus = 'OPEN' and (t.AMVisProductLine ='Ariba Application Management' or u.Name.PrimaryString is not null) AND t.AMVisIsAMSTicket!=false"
 },
 weeklyTrendAnalysis:function(customerId){
     return "SELECT 'Open', CONVERT(varchar,DATEPART(yy,att.ati_AMVisDateCreated)) + ' Week ' +  RIGHT('0' + CAST(datepart(week,att.ati_AMVisDateCreated) AS VARCHAR(2)),2), count(*) FROM dbo.AMVisTicketTab  att INNER JOIN AMVisAccountTab acc ON (att.ati_AMVisAccount=acc.rootId)  WHERE acc.aac_AMVisUniqueName = '"+customerId+"' AND att.ati_AMVisDateCreated > GETDATE() - 70 GROUP BY CONVERT(varchar,DATEPART(yy,att.ati_AMVisDateCreated)) + ' Week ' +  RIGHT('0' + CAST(datepart(week,att.ati_AMVisDateCreated) AS VARCHAR(2)),2)  UNION ALL SELECT 'Closed', CONVERT(varchar,DATEPART(yy,att.ati_AMVisDateClosed)) + ' Week ' +  RIGHT('0' + CAST(datepart(week,att.ati_AMVisDateClosed) AS VARCHAR(2)),2), count(*) FROM dbo.AMVisTicketTab att INNER JOIN AMVisAccountTab acc ON (att.ati_AMVisAccount=acc.rootId)  WHERE acc.aac_AMVisUniqueName= '"+customerId+"' AND att.ati_AMVisDateClosed > GETDATE() - 70 GROUP BY CONVERT(varchar,DATEPART(yy,att.ati_AMVisDateClosed)) + ' Week ' +  RIGHT('0' + CAST(datepart(week,att.ati_AMVisDateClosed) AS VARCHAR(2)),2)  ORDER BY 2 "
 },
 createRequestParams:function(q1,q2,q3,q4){
     const form = {};
     form["query"]=q1;
     form["type"]=q2;
     form["useSQL"]=q3;
     form["id"]=q4;

     /*const form = new FormData();
     form.append("query",q1);
     form.append("type",q2);
     form.append("useSQL",q3);
     form.append("id",q4);*/

     const data=new URLSearchParams(form);
     return data;
 },

 getOpenCloseTicketsCountsForLast12MonthsQuery:function(){
  
  let date=new Date();
	let $month=date.getMonth()+1;
	let $dateClosed ;
	if($month<10)
	   $month="0"+$month;
          
	let $prevyear=parseInt(moment().subtract(12, 'months').format("YYYY"));
	let $year=date.getFullYear();

  return "SELECT 'Closed' as status1,'' as status2,count(AMV2.ati_AMVisDateClosed),CONVERT(varchar,DATEPART(yy,AMV2.ati_AMVisDateClosed)) + '-' +  RIGHT('0' +CAST(datepart(month,AMV2.ati_AMVisDateClosed) AS VARCHAR(2)),2) FROM AMVisTicketTab AMV2 LEFT OUTER JOIN AMVisAccountTab AMV1 ON (AMV2.ati_AMVisAccount=AMV1.rootId) LEFT OUTER JOIN us_UserTab us_3 ON (AMV2.ati_AMVisAssignedTo=us_3.rootId) WHERE (AMV2.ati_AMVisDateClosed >= '"+$prevyear+"-"+$month+"-01 00:00:00' AND (AMV1.aac_AMVisShortName <> 'Ariba' or AMV1.aac_AMVisShortName is null) AND (us_3.rootId IS NOT NULL OR AMV2.ati_AMVisQueue IN ('APP_MGMT', 'APP_MAINT_L3P', 'APP_MAINT_L2P', 'APP_MAINT_L3I')) AND AMV2.ati_AMVisSubStatus <> 'Duplicate') AND (AMV2.ati_Active = 1) AND (AMV1.aac_Active = 1 OR (AMV2.ati_AMVisAccount IS NULL AND AMV1.aac_Active IS NULL)) AND (us_3.cus_Active = 1 OR (AMV2.ati_AMVisAssignedTo IS NULL AND us_3.cus_Active IS NULL)) group by CONVERT(varchar,DATEPART(yy,AMV2.ati_AMVisDateClosed)) + '-' +  RIGHT('0' +CAST(datepart(month,AMV2.ati_AMVisDateClosed) AS VARCHAR(2)),2) UNION ALL SELECT '' as status1,'Open' as status2,count(AMV2.ati_AMVisDateCreated ),CONVERT(varchar,DATEPART(yy,AMV2.ati_AMVisDateCreated )) + '-' +  RIGHT('0' +CAST(datepart(month,AMV2.ati_AMVisDateCreated ) AS VARCHAR(2)),2) FROM AMVisTicketTab AMV2 LEFT OUTER JOIN AMVisAccountTab AMV1 ON (AMV2.ati_AMVisAccount=AMV1.rootId) LEFT OUTER JOIN us_UserTab us_3 ON (AMV2.ati_AMVisAssignedTo=us_3.rootId) WHERE (AMV2.ati_AMVisDateCreated  >= '"+$prevyear+"-"+$month+"-01 00:00:00' AND (AMV1.aac_AMVisShortName <> 'Ariba' or AMV1.aac_AMVisShortName is null) AND (us_3.rootId IS NOT NULL OR AMV2.ati_AMVisQueue IN ('APP_MGMT', 'APP_MAINT_L3P', 'APP_MAINT_L2P', 'APP_MAINT_L3I')) AND AMV2.ati_AMVisSubStatus <> 'Duplicate') AND (AMV2.ati_Active = 1) AND (AMV1.aac_Active = 1 OR (AMV2.ati_AMVisAccount IS NULL AND AMV1.aac_Active IS NULL)) AND (us_3.cus_Active = 1 OR (AMV2.ati_AMVisAssignedTo IS NULL AND us_3.cus_Active IS NULL)) group by CONVERT(varchar,DATEPART(yy,AMV2.ati_AMVisDateCreated )) + '-' +  RIGHT('0' +CAST(datepart(month,AMV2.ati_AMVisDateCreated ) AS VARCHAR(2)),2)";

  /*let aa=var currentYear=(new Date()).getFullYear();
	var nextYear=currentYear+1;*/
	
	
	//var query="SELECT 'Opened',SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 1 THEN 1 ELSE 0 END) AS January,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 2 THEN 1 ELSE 0 END) AS February,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 3 THEN 1 ELSE 0 END) AS March,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 4 THEN 1 ELSE 0 END) AS April,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 5 THEN 1 ELSE 0 END) AS May, SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 6 THEN 1 ELSE 0 END) AS June,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 7 THEN 1 ELSE 0 END) AS July,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 8 THEN 1 ELSE 0 END) AS August,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 9 THEN 1 ELSE 0 END) AS September,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 10 THEN 1 ELSE 0 END) AS October,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 11 THEN 1 ELSE 0 END) AS November,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 12 THEN 1 ELSE 0 END) AS December FROM AMVisTicketTab AMV2 LEFT OUTER JOIN AMVisAccountTab AMV1 ON (AMV2.ati_AMVisAccount=AMV1.rootId) LEFT OUTER JOIN us_UserTab us_3 ON (AMV2.ati_AMVisAssignedTo=us_3.rootId) WHERE (AMV2.ati_AMVisDateCreated >= '"+prevYear+"-01-01 00:00:00' AND AMV2.ati_AMVisDateCreated < '"+currentYear+"-01-01 00:00:00'AND (AMV1.aac_AMVisShortName <> 'Ariba' or AMV1.aac_AMVisShortName is null) AND (us_3.rootId IS NOT NULL OR AMV2.ati_AMVisQueue IN ('APP_MGMT', 'APP_MAINT_L3P', 'APP_MAINT_L2P', 'APP_MAINT_L3I')) AND AMV2.ati_AMVisSubStatus <> 'Duplicate') AND (AMV2.ati_Active = 1) AND (AMV1.aac_Active = 1 OR (AMV2.ati_AMVisAccount IS NULL AND AMV1.aac_Active IS NULL)) AND (us_3.cus_Active = 1 OR (AMV2.ati_AMVisAssignedTo IS NULL AND us_3.cus_Active IS NULL)) UNION ALL SELECT 'Closed',SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 1 THEN 1 ELSE 0 END) AS January, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 2 THEN 1 ELSE 0 END) AS February, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 3 THEN 1 ELSE 0 END) AS March, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 4 THEN 1 ELSE 0 END) AS April, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 5 THEN 1 ELSE 0 END) AS May, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 6 THEN 1 ELSE 0 END) AS June, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 7 THEN 1 ELSE 0 END) AS July, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 8 THEN 1 ELSE 0 END) AS August, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 9 THEN 1 ELSE 0 END) AS September, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 10 THEN 1 ELSE 0 END) AS October, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 11 THEN 1 ELSE 0 END) AS November, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 12 THEN 1 ELSE 0 END) AS December FROM AMVisTicketTab AMV2 LEFT OUTER JOIN AMVisAccountTab AMV1 ON (AMV2.ati_AMVisAccount=AMV1.rootId) LEFT OUTER JOIN us_UserTab us_3 ON (AMV2.ati_AMVisAssignedTo=us_3.rootId) WHERE (AMV2.ati_AMVisDateClosed >= '"+prevYear+"-01-01 00:00:00' AND AMV2.ati_AMVisDateClosed < '"+currentYear+"-01-01 00:00:00' AND (AMV1.aac_AMVisShortName <> 'Ariba' or AMV1.aac_AMVisShortName is null) AND (us_3.rootId IS NOT NULL OR AMV2.ati_AMVisQueue IN ('APP_MGMT', 'APP_MAINT_L3P', 'APP_MAINT_L2P', 'APP_MAINT_L3I')) AND AMV2.ati_AMVisSubStatus <> 'Duplicate') AND (AMV2.ati_Active = 1) AND (AMV1.aac_Active = 1 OR (AMV2.ati_AMVisAccount IS NULL AND AMV1.aac_Active IS NULL)) AND (us_3.cus_Active = 1 OR (AMV2.ati_AMVisAssignedTo IS NULL AND us_3.cus_Active IS NULL))";

 },
 getBacklogTicketsCountsForLast12MonthsQuery:function(){

 	let d=moment().subtract(12, 'months').format('YYYY/MM');
  
	let dtr="";
	let abr,gbr ;
  
    for(var i=0;i<=13;i++){
    
    abr=moment(d).add(i, 'months').format('YYYY/MM')+"/01" ;
    gbr=moment(d).add(i-1, 'months').format('YYYY/MM')+"/01" ;
    //console.log(abr);
    if(i>1)
    dtr=dtr+",SUM(CASE WHEN AMV2.ati_AMVisDateCreated < '"+abr+"' And (AMV2.ati_AMVisDateClosed IS NULL OR AMV2.ati_AMVisDateClosed >= '"+abr+"') And GETDATE() > '"+gbr+"' and AMV2.ati_AMVisStatus != 'CLOSED' THEN 1 WHEN AMV2.ati_AMVisDateCreated < '"+abr+"' And (GETDATE() > '"+gbr+"') And AMV2.ati_AMVisDateClosed >= '"+abr+"' THEN 1 ELSE 0 END)";
      else
    dtr="SUM(CASE WHEN AMV2.ati_AMVisDateCreated < '"+abr+"' And (AMV2.ati_AMVisDateClosed IS NULL OR AMV2.ati_AMVisDateClosed >= '"+abr+"') And GETDATE() > '"+gbr+"' and AMV2.ati_AMVisStatus != 'CLOSED' THEN 1 WHEN AMV2.ati_AMVisDateCreated < '"+abr+"' And (GETDATE() > '"+gbr+"') And AMV2.ati_AMVisDateClosed >= '"+abr+"' THEN 1 ELSE 0 END)";
    
    }

 	return "SELECT 'Backlogs' as status,"+dtr+" FROM AMVisTicketTab AMV2 LEFT OUTER JOIN AMVisAccountTab AMV1 ON (AMV2.ati_AMVisAccount=AMV1.rootId) LEFT OUTER JOIN us_UserTab us_3 ON (AMV2.ati_AMVisAssignedTo=us_3.rootId) WHERE ((AMV1.aac_AMVisShortName <> 'Ariba' or AMV1.aac_AMVisShortName is null) AND (us_3.rootId IS NOT NULL OR AMV2.ati_AMVisQueue IN ('APP_MGMT', 'APP_MAINT_L3P', 'APP_MAINT_L2P', 'APP_MAINT_L3I')) AND AMV2.ati_AMVisSubStatus <> 'Duplicate') AND (AMV2.ati_Active = 1) AND (AMV1.aac_Active = 1 OR (AMV2.ati_AMVisAccount IS NULL AND AMV1.aac_Active IS NULL)) AND (us_3.cus_Active = 1 OR (AMV2.ati_AMVisAssignedTo IS NULL AND us_3.cus_Active IS NULL))";

 },
"backlogData":"select  t,t.AMVisBacklogUniqueName as dataYear,t.AMVisBacklog as backlog,t.AMVisOpen as opened,t.AMVisClosed as closed,t.year,t.month from config.amvis.core.AMVisBacklogData t where t.year>2018  AND t.month >month(currentDate()) union select t,t.AMVisBacklogUniqueName as dataYear,t.AMVisBacklog as backlog,t.AMVisOpen as opened,t.AMVisClosed as closed,t.year,t.month from config.amvis.core.AMVisBacklogData t where t.year>2019 order by t.year,t.month",
"stack_chart":"SELECT AMVisAccount.AMVisRegion, YEAR(AMVisDateCreated) , count() FROM AMVisTicket WHERE YEAR(AMVisDateCreated) > 2013  AND AMVisAccount.AMVisShortName != 'Ariba' AND AMVisSubStatus !='Duplicate' GROUP BY  AMVisAccount.AMVisRegion, YEAR(AMVisDateCreated)  ORDER BY 2",
"pie_datachart":"SELECT 'BMS' as \"tagName\",COUNT(AMV1.ati_AMVisSRNumber) as count FROM AMVisTicketTab AMV1 LEFT OUTER JOIN AMVisAccountTab AMV2 ON (AMV1.ati_AMVisAccount=AMV2.rootId) WHERE (AMV1.ati_AMVisSubStatus IN ('Pending Customer Input', 'Customer - Hold') AND AMV1.ati_AMVisStatus = 'OPEN' AND AMV2.aac_AMVisUniqueName = '0008260195') AND (AMV1.ati_Active = 1) AND (AMV1.ati_PurgeState = 0) AND (AMV2.aac_Active = 1 OR (AMV1.ati_AMVisAccount IS NULL AND AMV2.aac_Active IS NULL)) AND (AMV2.aac_PurgeState = 0 OR (AMV1.ati_AMVisAccount IS NULL AND AMV2.rootId IS NULL)) UNION ALL SELECT  'AMS' as \"tagName\",COUNT(AMV101.ati_AMVisSRNumber) as count FROM AMVisTicketTab AMV101 LEFT OUTER JOIN AMVisAccountTab AMV102 ON (AMV101.ati_AMVisAccount=AMV102.rootId) WHERE (AMV101.ati_AMVisSubStatus IN ('Research', 'Customer Update', 'Internal Assistance', 'Screen Sharing Scheduled') AND AMV101.ati_AMVisStatus = 'OPEN' AND AMV102.aac_AMVisUniqueName = '0008260195') AND (AMV101.ati_Active = 1) AND (AMV101.ati_PurgeState = 0) AND (AMV102.aac_Active = 1 OR (AMV101.ati_AMVisAccount IS NULL AND AMV102.aac_Active IS NULL)) AND (AMV102.aac_PurgeState = 0 OR (AMV101.ati_AMVisAccount IS NULL AND AMV102.rootId IS NULL)) UNION ALL SELECT 'Support' as \"tagName\",COUNT(AMV1.ati_AMVisSRNumber) as count FROM AMVisTicketTab AMV1 LEFT OUTER JOIN AMVisAccountTab AMV2 ON (AMV1.ati_AMVisAccount=AMV2.rootId) WHERE (AMV1.ati_AMVisSubStatus IN ('TSS','Fix ETA') AND AMV1.ati_AMVisStatus = 'OPEN' AND AMV2.aac_AMVisUniqueName = '0008260195') AND (AMV1.ati_Active = 1) AND (AMV1.ati_PurgeState = 0) AND (AMV2.aac_Active = 1 OR (AMV1.ati_AMVisAccount IS NULL AND AMV2.aac_Active IS NULL)) AND (AMV2.aac_PurgeState = 0 OR (AMV1.ati_AMVisAccount IS NULL AND AMV2.rootId IS NULL)) UNION ALL SELECT 'Release' as \"tagName\",COUNT(AMV1.ati_AMVisSRNumber) as count FROM AMVisTicketTab AMV1 LEFT OUTER JOIN AMVisAccountTab AMV2 ON (AMV1.ati_AMVisAccount=AMV2.rootId) WHERE (AMV1.ati_AMVisSubStatus IN ('Implemented in Test','Pending Customer Confirmation') AND AMV1.ati_AMVisStatus = 'OPEN' AND AMV2.aac_AMVisUniqueName = '0008260195') AND (AMV1.ati_Active = 1) AND (AMV1.ati_PurgeState = 0) AND (AMV2.aac_Active = 1 OR (AMV1.ati_AMVisAccount IS NULL AND AMV2.aac_Active IS NULL)) AND (AMV2.aac_PurgeState = 0 OR (AMV1.ati_AMVisAccount IS NULL AND AMV2.rootId IS NULL))",
"tsm_table":"SELECT 'Opened',SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 1 THEN 1 ELSE 0 END) AS January,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 2 THEN 1 ELSE 0 END) AS February,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 3 THEN 1 ELSE 0 END) AS March,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 4 THEN 1 ELSE 0 END) AS April,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 5 THEN 1 ELSE 0 END) AS May, SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 6 THEN 1 ELSE 0 END) AS June,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 7 THEN 1 ELSE 0 END) AS July,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 8 THEN 1 ELSE 0 END) AS August,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 9 THEN 1 ELSE 0 END) AS September,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 10 THEN 1 ELSE 0 END) AS October,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 11 THEN 1 ELSE 0 END) AS November,SUM(CASE datepart(month, AMV2.ati_AMVisDateCreated) WHEN 12 THEN 1 ELSE 0 END) AS December FROM AMVisTicketTab AMV2 LEFT OUTER JOIN AMVisAccountTab AMV1 ON (AMV2.ati_AMVisAccount=AMV1.rootId) LEFT OUTER JOIN us_UserTab us_3 ON (AMV2.ati_AMVisAssignedTo=us_3.rootId) WHERE (AMV2.ati_AMVisDateCreated >= '2019-01-01 00:00:00' AND AMV2.ati_AMVisDateCreated < '2020-01-01 00:00:00'AND (AMV1.aac_AMVisShortName <> 'Ariba' or AMV1.aac_AMVisShortName is null) AND (us_3.rootId IS NOT NULL OR AMV2.ati_AMVisQueue IN ('APP_MGMT', 'APP_MAINT_L3P', 'APP_MAINT_L2P', 'APP_MAINT_L3I')) AND AMV2.ati_AMVisSubStatus <> 'Duplicate') AND (AMV2.ati_Active = 1) AND (AMV1.aac_Active = 1 OR (AMV2.ati_AMVisAccount IS NULL AND AMV1.aac_Active IS NULL)) AND (us_3.cus_Active = 1 OR (AMV2.ati_AMVisAssignedTo IS NULL AND us_3.cus_Active IS NULL)) UNION ALL SELECT 'Closed',SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 1 THEN 1 ELSE 0 END) AS January, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 2 THEN 1 ELSE 0 END) AS February, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 3 THEN 1 ELSE 0 END) AS March, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 4 THEN 1 ELSE 0 END) AS April, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 5 THEN 1 ELSE 0 END) AS May, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 6 THEN 1 ELSE 0 END) AS June, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 7 THEN 1 ELSE 0 END) AS July, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 8 THEN 1 ELSE 0 END) AS August, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 9 THEN 1 ELSE 0 END) AS September, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 10 THEN 1 ELSE 0 END) AS October, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 11 THEN 1 ELSE 0 END) AS November, SUM(CASE datepart(month, AMV2.ati_AMVisDateClosed) WHEN 12 THEN 1 ELSE 0 END) AS December FROM AMVisTicketTab AMV2 LEFT OUTER JOIN AMVisAccountTab AMV1 ON (AMV2.ati_AMVisAccount=AMV1.rootId) LEFT OUTER JOIN us_UserTab us_3 ON (AMV2.ati_AMVisAssignedTo=us_3.rootId) WHERE (AMV2.ati_AMVisDateClosed >= '2019-01-01 00:00:00' AND AMV2.ati_AMVisDateClosed < '2020-01-01 00:00:00' AND (AMV1.aac_AMVisShortName <> 'Ariba' or AMV1.aac_AMVisShortName is null) AND (us_3.rootId IS NOT NULL OR AMV2.ati_AMVisQueue IN ('APP_MGMT', 'APP_MAINT_L3P', 'APP_MAINT_L2P', 'APP_MAINT_L3I')) AND AMV2.ati_AMVisSubStatus <> 'Duplicate') AND (AMV2.ati_Active = 1) AND (AMV1.aac_Active = 1 OR (AMV2.ati_AMVisAccount IS NULL AND AMV1.aac_Active IS NULL)) AND (us_3.cus_Active = 1 OR (AMV2.ati_AMVisAssignedTo IS NULL AND us_3.cus_Active IS NULL)) UNION ALL SELECT 'Backlogs', SUM(CASE WHEN AMV2.ati_AMVisDateCreated < '2019/02/01' And (AMV2.ati_AMVisDateClosed IS NULL OR AMV2.ati_AMVisDateClosed >= '2019/02/01') And GETDATE() > '2019/01/01' and AMV2.ati_AMVisStatus != 'CLOSED' THEN 1 WHEN AMV2.ati_AMVisDateCreated < '2019/02/01' And GETDATE() > '2019/01/01' AND AMV2.ati_AMVisDateClosed >= '2019/02/01' THEN 1 ELSE 0 END) AS January, SUM(CASE WHEN AMV2.ati_AMVisDateCreated < '2019/03/01' And (AMV2.ati_AMVisDateClosed IS NULL OR AMV2.ati_AMVisDateClosed >= '2019/03/01') And GETDATE() > '2019/02/01' and AMV2.ati_AMVisStatus != 'CLOSED' THEN 1 WHEN AMV2.ati_AMVisDateCreated < '2019/03/01' And GETDATE() > '2019/02/01' AND AMV2.ati_AMVisDateClosed >= '2019/03/01' THEN 1 ELSE 0 END) AS February, SUM(CASE WHEN AMV2.ati_AMVisDateCreated < '2019/04/01' And (AMV2.ati_AMVisDateClosed IS NULL OR AMV2.ati_AMVisDateClosed >= '2019/04/01') And GETDATE() > '2019/03/01' and AMV2.ati_AMVisStatus != 'CLOSED' THEN 1 WHEN AMV2.ati_AMVisDateCreated < '2019/04/01' And GETDATE() > '2019/03/01' AND AMV2.ati_AMVisDateClosed >= '2019/04/01' THEN 1 ELSE 0 END) AS March, SUM(CASE WHEN AMV2.ati_AMVisDateCreated < '2019/05/01' And (AMV2.ati_AMVisDateClosed IS NULL OR AMV2.ati_AMVisDateClosed >= '2019/05/01') And GETDATE() > '2019/04/01' and AMV2.ati_AMVisStatus != 'CLOSED' THEN 1 WHEN AMV2.ati_AMVisDateCreated < '2019/05/01' And GETDATE() > '2019/04/01' AND AMV2.ati_AMVisDateClosed >= '2019/05/01' THEN 1 ELSE 0 END) AS April, SUM(CASE WHEN AMV2.ati_AMVisDateCreated < '2019/06/01' And (AMV2.ati_AMVisDateClosed IS NULL OR AMV2.ati_AMVisDateClosed >= '2019/06/01') And GETDATE() > '2019/05/01' and AMV2.ati_AMVisStatus != 'CLOSED' THEN 1 WHEN AMV2.ati_AMVisDateCreated < '2019/06/01' And GETDATE() > '2019/05/01' AND AMV2.ati_AMVisDateClosed >= '2019/06/01' THEN 1 ELSE 0 END) AS May, SUM(CASE WHEN AMV2.ati_AMVisDateCreated < '2019/07/01' And (AMV2.ati_AMVisDateClosed IS NULL OR AMV2.ati_AMVisDateClosed >= '2019/07/01') And GETDATE() > '2019/06/01' and AMV2.ati_AMVisStatus != 'CLOSED' THEN 1 WHEN AMV2.ati_AMVisDateCreated < '2019/07/01' And GETDATE() > '2019/06/01' AND AMV2.ati_AMVisDateClosed >= '2019/07/01' THEN 1 ELSE 0 END) AS June, SUM(CASE WHEN AMV2.ati_AMVisDateCreated < '2019/08/01' And (AMV2.ati_AMVisDateClosed IS NULL OR AMV2.ati_AMVisDateClosed >= '2019/08/01') And GETDATE() > '2019/07/01' and AMV2.ati_AMVisStatus != 'CLOSED' THEN 1 WHEN AMV2.ati_AMVisDateCreated < '2019/08/01' And GETDATE() > '2019/07/01' AND AMV2.ati_AMVisDateClosed >= '2019/08/01' THEN 1 ELSE 0 END) AS July, SUM(CASE WHEN AMV2.ati_AMVisDateCreated < '2019/09/01' And (AMV2.ati_AMVisDateClosed IS NULL OR AMV2.ati_AMVisDateClosed >= '2019/09/01') And GETDATE() > '2019/08/01' and AMV2.ati_AMVisStatus != 'CLOSED' THEN 1 WHEN AMV2.ati_AMVisDateCreated < '2019/09/01' And GETDATE() > '2019/08/01' AND AMV2.ati_AMVisDateClosed >= '2019/09/01' THEN 1 ELSE 0 END) AS August, SUM(CASE WHEN AMV2.ati_AMVisDateCreated < '2019/10/01' And (AMV2.ati_AMVisDateClosed IS NULL OR AMV2.ati_AMVisDateClosed >= '2019/10/01') And GETDATE() > '2019/09/01' and AMV2.ati_AMVisStatus != 'CLOSED' THEN 1 WHEN AMV2.ati_AMVisDateCreated < '2019/10/01' And GETDATE() > '2019/09/01' AND AMV2.ati_AMVisDateClosed >= '2019/10/01' THEN 1 ELSE 0 END) AS September, SUM(CASE WHEN AMV2.ati_AMVisDateCreated < '2019/11/01' And (AMV2.ati_AMVisDateClosed IS NULL OR AMV2.ati_AMVisDateClosed >= '2019/11/01') And GETDATE() > '2019/10/01' and AMV2.ati_AMVisStatus != 'CLOSED' THEN 1 WHEN AMV2.ati_AMVisDateCreated < '2019/11/01' And GETDATE() > '2019/10/01' AND AMV2.ati_AMVisDateClosed >= '2019/11/01' THEN 1 ELSE 0 END) AS October, SUM(CASE WHEN AMV2.ati_AMVisDateCreated < '2019/12/01' And (AMV2.ati_AMVisDateClosed IS NULL OR AMV2.ati_AMVisDateClosed >= '2019/12/01') And GETDATE() > '2019/11/01' and AMV2.ati_AMVisStatus != 'CLOSED' THEN 1 WHEN AMV2.ati_AMVisDateCreated < '2019/12/01' And GETDATE() > '2019/11/01' AND AMV2.ati_AMVisDateClosed >= '2019/12/01' THEN 1 ELSE 0 END) AS November, SUM(CASE WHEN AMV2.ati_AMVisDateCreated < '2020/01/01' And (AMV2.ati_AMVisDateClosed IS NULL OR AMV2.ati_AMVisDateClosed >= '2020/01/01') And GETDATE() > '2019/12/01' and AMV2.ati_AMVisStatus != 'CLOSED' THEN 1 WHEN AMV2.ati_AMVisDateCreated < '2020/01/01' And GETDATE() > '2019/12/01' AND AMV2.ati_AMVisDateClosed >= '2020/01/01' THEN 1 ELSE 0 END) AS December FROM AMVisTicketTab AMV2 LEFT OUTER JOIN AMVisAccountTab AMV1 ON (AMV2.ati_AMVisAccount=AMV1.rootId) LEFT OUTER JOIN us_UserTab us_3 ON (AMV2.ati_AMVisAssignedTo=us_3.rootId) WHERE ((AMV1.aac_AMVisShortName <> 'Ariba' or AMV1.aac_AMVisShortName is null) AND (us_3.rootId IS NOT NULL OR AMV2.ati_AMVisQueue IN ('APP_MGMT', 'APP_MAINT_L3P', 'APP_MAINT_L2P', 'APP_MAINT_L3I')) AND AMV2.ati_AMVisSubStatus <> 'Duplicate') AND (AMV2.ati_Active = 1) AND (AMV1.aac_Active = 1 OR (AMV2.ati_AMVisAccount IS NULL AND AMV1.aac_Active IS NULL)) AND (us_3.cus_Active = 1 OR (AMV2.ati_AMVisAssignedTo IS NULL AND us_3.cus_Active IS NULL))",
"pie_chart":"SELECT SUBSTRING(AMVisPriority,0,4), count() FROM AMVisTicket WHERE Beginswith(AMVisPriority ,'P',true) AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba' and AMVisIsAMSTicket!=false AND AMVisSubStatus !='Duplicate' GROUP BY SUBSTRING(AMVisPriority,0,4)",
"utbc_table":"Select t.AMVisSRNumber as SRNumber,t.AMVisAccount.AMVisShortName,t.AMVisQueue,t.AMVisSubStatus,t.AMVisPriority,Round(CurrentDate() - t.AMVisDateCreated) as PendingDays From AMVisTicket t Where t.AMVisStatus='OPEN' and t.AMVisPriority='P1 - VERY HIGH' and t.AMVisStatus !='Confirmed' and t.AMVisQueue in ('APP_MGMT','APP_MAINT_L3I','APP_MAINT_L2P','APP_MAINT_L3P') and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') and AMVisDateClosed IS NULL AND t.AMVisSubStatus !='Duplicate' union all Select t.AMVisSRNumber,t.AMVisAccount.AMVisShortName,t.AMVisQueue,t.AMVisSubStatus,t.AMVisPriority,Round(CurrentDate() - t.AMVisDateCreated) as PendingDays From AMVisTicket t Where t.AMVisStatus='OPEN' and t.AMVisPriority='P2 - HIGH' and t.AMVisStatus !='Confirmed' and t.AMVisQueue in ('APP_MGMT','APP_MAINT_L3I','APP_MAINT_L2P','APP_MAINT_L3P') and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') and AMVisDateClosed IS NULL and CurrentDate() - t.AMVisDateUpdated>2 AND t.AMVisSubStatus !='Duplicate' union all Select t.AMVisSRNumber,t.AMVisAccount.AMVisShortName,t.AMVisQueue,t.AMVisSubStatus,t.AMVisPriority,Round(CurrentDate() - t.AMVisDateCreated) as PendingDays From AMVisTicket t Where t.AMVisStatus='OPEN' and t.AMVisPriority='P3 - MEDIUM' and t.AMVisStatus !='Confirmed' and t.AMVisQueue in ('APP_MGMT','APP_MAINT_L3I','APP_MAINT_L2P','APP_MAINT_L3P') and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') and AMVisDateClosed IS NULL and CurrentDate() - t.AMVisDateUpdated>5 union all Select t.AMVisSRNumber,t.AMVisAccount.AMVisShortName,t.AMVisQueue,t.AMVisSubStatus,t.AMVisPriority,Round(CurrentDate() - t.AMVisDateCreated) as PendingDays From AMVisTicket t Where t.AMVisStatus='OPEN' and t.AMVisPriority='P4 - LOW' and t.AMVisStatus !='Confirmed' and t.AMVisQueue in ('APP_MGMT','APP_MAINT_L3I','APP_MAINT_L2P','APP_MAINT_L3P') and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') and AMVisDateClosed IS NULL and CurrentDate() - t.AMVisDateUpdated>7 AND t.AMVisSubStatus !='Duplicate' Group By t.AMVisAccount.AMVisShortName,t.AMVisQueue,t.AMVisPriority,t.AMVisSubStatus,Round(CurrentDate() - t.AMVisDateCreated),t.AMVisSRNumber",
"utb_table":"Select t.AMVisAccount.AMVisShortName,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as P1,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as P2,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as P3,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as P4,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisQueue WHEN 'APP_MGMT' THEN 1 ELSE 0 END Else 0 END) as APP_MGMT,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisQueue WHEN 'APP_MAINT_L3I' THEN 1 ELSE 0 END Else 0 END) as APP_MAINT_L3I,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisQueue WHEN 'APP_MAINT_L2P' THEN 1 ELSE 0 END Else 0 END) as APP_MAINT_L2P,SUM(CASE t.AMVisStatus When 'OPEN' THEN CASE t.AMVisQueue WHEN 'APP_MAINT_L3P' THEN 1 ELSE 0 END Else 0 END) as APP_MAINT_L3P,SUM(CASE t.AMVisStatus When 'OPEN' THEN 1 ELSE 0 END) as OpenTickets From AMVisTicket t Where t.AMVisStatus='OPEN' and t.AMVisQueue is not null and AMVisDateClosed IS NULL and AMVisAssignedTeam ='GS APP MGMT' and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') AND t.AMVisSubStatus !='Duplicate' Group by t.AMVisAccount.AMVisShortName Order by t.AMVisAccount.AMVisShortName ASC",
"cts_table":"SELECT acc.aac_AMVisShortName as Account, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 1 THEN 1 ELSE 0 END) AS January, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 2 THEN 1 ELSE 0 END) AS February, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 3 THEN 1 ELSE 0 END) AS March, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 4 THEN 1 ELSE 0 END) AS April, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 5 THEN 1 ELSE 0 END) AS May, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 6 THEN 1 ELSE 0 END) AS June, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 7 THEN 1 ELSE 0 END) AS July, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 8 THEN 1 ELSE 0 END) AS August, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 9 THEN 1 ELSE 0 END) AS September, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 10 THEN 1 ELSE 0 END) AS October, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 11 THEN 1 ELSE 0 END) AS November, SUM(CASE datepart(month, AMV1.ati_AMVisDateClosed) WHEN 12 THEN 1 ELSE 0 END) AS December, SUM(CASE datepart(quarter,AMV1.ati_AMVisDateClosed) WHEN 1 THEN 1 ELSE 0 END) AS Quarter1, SUM(CASE datepart(quarter,AMV1.ati_AMVisDateClosed) WHEN 2 THEN 1 ELSE 0 END) AS Quarter2, SUM(CASE datepart(quarter,AMV1.ati_AMVisDateClosed) WHEN 3 THEN 1 ELSE 0 END) AS Quarter3, SUM(CASE datepart(quarter,AMV1.ati_AMVisDateClosed) WHEN 4 THEN 1 ELSE 0 END) AS Quarter4, SUM(CASE datepart(year, AMV1.ati_AMVisDateClosed) WHEN 2018 THEN 1 ELSE 0 END) AS TOTAL FROM AMVisTicketTab AMV1 INNER JOIN AMVisAccountTab acc ON(AMV1.ati_AMVisAccount=acc.rootId) WHERE AMV1.ati_AMVisDateClosed BETWEEN '2019/01/01' AND '2019/12/31' AND AMV1.ati_AMVisAssignedTeam = 'GS APP MGMT' AND acc.aac_AMVisCRMID IS NOT NULL AND AMV1.ati_AMVisSubStatus !='Duplicate' GROUP BY acc.aac_AMVisShortName ORDER BY 1",
"pos_table":"Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P1 - VERY HIGH' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P1 - VERY HIGH' and AMVisStatus='OPEN' Group By t.AMVisPriority union all Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P2 - HIGH' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P2 - HIGH' and AMVisStatus='OPEN' Group By t.AMVisPriority union all Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P3 - MEDIUM' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P3 - MEDIUM' and AMVisStatus='OPEN' Group By t.AMVisPriority union all Select t.AMVisPriority,SUM(CASE t.AMVisQueue When 'APP_MGMT' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as APPMGMT,SUM(CASE t.AMVisQueue When 'APP_MAINT_L2P' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as L2p,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3P' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as L3P,SUM(CASE t.AMVisQueue When 'APP_MAINT_L3I' THEN CASE t.AMVisPriority WHEN 'P4 - LOW' THEN 1 ELSE 0 END Else 0 END) as L3I from AMVisTicket t Where t.AMVisPriority ='P4 - LOW' and AMVisStatus='OPEN' and t.AMVisQueue is not null and AMVisDateClosed IS NULL AND t.AMVisSubStatus !='Duplicate' Group By t.AMVisPriority",
"example_table":"SELECT Distinct t.AMVisSRNumber AS \"SR Number\", acc.AMVisShortName AS \"Account\",SUBSTRING(t.AMVisDescription, 0, 40) AS \"Description\",SUBSTRING(t.AMVisPriority, 0, 3) AS \"Priority\",t.AMVisSubStatus AS \"SubStatus\",t.AMVisDateUpdated AS \"Last Activity\",t.AMVisDateCreated AS \"Create Date\",Count(AMVisTicketHistoryRecords) FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN config.amvis.core.AMVisTicketHist AS TicketHist INCLUDE INACTIVE ON t.AMVisSRNumber = TicketHist.AMVisSRNumberTicketHistory LEFT OUTER JOIN config.amvis.core.AMVisTicketHistoryRecords as AMVisTicketHistoryRecords using TicketHist.AMVisTicketHistoryRecords WHERE t.AMVisStatus = 'OPEN' and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisAccount.AMVisShortName not in ('Amtrak', 'Ariba', 'American Express') AND t.AMVisSubStatus !='Duplicate' and t.AMVisIsAMSTicket!=false group by t.AMVisSRNumber,acc.AMVisShortName,SUBSTRING(t.AMVisDescription, 0, 40),SUBSTRING(t.AMVisPriority, 0, 3) ,t.AMVisSubStatus,t.AMVisDateUpdated,t.AMVisDateCreated",
"example2_table":"Select Distinct AMVisShortName,AMVisName,AMVisRegion,AMVisUniqueName,AMVisCustomerAMSTerminatedDate  from config.amvis.core.AMVisAccount t Where AMVisCRMID is not null and  AMVisName not like '%On Behalf%'",
"example4_table":"SELECT t.AMVisSRNumber AS \"SR Number\",acc.AMVisShortName AS \"Account\",AssignedTo.Name.PrimaryString as AssignedTo,t.AMVisSubStatus AS \"SubStatus\",SUBSTRING(t.AMVisPriority,0,3) AS \"Priority\",ROUND((CurrentDate()-t.AMVisDateUpdated),0) as PendingDays FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE t.AMVisStatus = 'OPEN' and t.AMVisAccount.AMVisShortName not in ('Amtrak','Ariba','American Express') and (CurrentDate()-t.AMVisDateUpdated) >20 and AMVisDateClosed IS NULL and AMVisAssignedTeam ='GS APP MGMT' AND t.AMVisSubStatus not in ('Resolved - Close','Resolved - Confirm') AND t.AMVisSubStatus !='Duplicate' ORDER BY t.AMVisDateUpdated ASC",
"p1tile":"Select count(*) FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount WHERE t.AMVisStatus = 'OPEN' AND  beginswith(AMVisPriority, 'P1', true) and t.AMVisIsAMSTicket!=false AND t.AMVisSubStatus !='Duplicate' and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisAccount.AMVisShortName not in ('Amtrak', 'Ariba', 'American Express')",
"p124tile":"SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND CurrentDate() - AMVisDateCreated < 1 AND AMVisPriority='P1 - VERY HIGH' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba' and AMVisIsAMSTicket!=false",
"p2tile":"Select count(*) FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount WHERE t.AMVisStatus = 'OPEN' AND  beginswith(AMVisPriority, 'P2', true) and t.AMVisIsAMSTicket!=false AND t.AMVisSubStatus !='Duplicate' and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisAccount.AMVisShortName not in ('Amtrak', 'Ariba', 'American Express')",
"p224tile":"SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND CurrentDate() - AMVisDateCreated < 1 AND AMVisPriority='P2 - HIGH' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' AND AMVisAccount.AMVisShortName != 'Ariba' and AMVisIsAMSTicket!=false",
"p3tile":"Select count(*) FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount WHERE t.AMVisStatus = 'OPEN' AND  beginswith(AMVisPriority, 'P3', true) and t.AMVisIsAMSTicket!=false AND t.AMVisSubStatus !='Duplicate' and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisAccount.AMVisShortName not in ('Amtrak', 'Ariba', 'American Express')",
"p324tile":"SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND CurrentDate() - AMVisDateCreated < 1 AND AMVisPriority='P3 - MEDIUM' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' and AMVisIsAMSTicket!=false AND AMVisAccount.AMVisShortName != 'Ariba' ",
"p4tile":"Select count(*) FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount WHERE t.AMVisStatus = 'OPEN' AND  beginswith(AMVisPriority, 'P4', true) and t.AMVisIsAMSTicket!=false AND t.AMVisSubStatus !='Duplicate' and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisSubStatus not in('Resolved - Confirm', 'Resolved - Close') and t.AMVisAccount.AMVisShortName not in ('Amtrak', 'Ariba', 'American Express')",
"p424tile":"SELECT count() FROM AMVisTicket WHERE AMVisDateClosed IS NULL AND CurrentDate() - AMVisDateCreated < 1 AND AMVisPriority='P4 - LOW' and AMVisAssignedTeam ='GS APP MGMT' AND AMVisStatus ='OPEN' and AMVisIsAMSTicket!=false AND AMVisAccount.AMVisShortName != 'Ariba'",
"customer_update_table":"Select t.AMVisSRNumber as \"SR Number\",acc.AMVisShortName AS \"Account\",AssignedTo.Name.PrimaryString as \"AssignedTo\",CASE t.AMVisAssignedTo.Supervisor.Name.PrimaryString WHEN 'Krishna Kuchimanchi' THEN 'AMERICAS' WHEN 'Tony Wu' THEN 'AMERICAS' WHEN 'Lukas Gunar' THEN 'EMEA' WHEN 'Michal Scerbak' THEN 'EMEA' WHEN 'Erik Ivancak' THEN 'EMEA' WHEN 'Krishna Veerappa' THEN 'APJ' WHEN 'Samir Sato' THEN 'APJ' ELSE 'GLOBAL' END as \"TeamLocation\",SUBSTRING(t.AMVisDescription, 0, 40) AS \"Description\",SUBSTRING(t.AMVisPriority, 0, 3) AS \"Priority\",Round((CurrentDate()-t.AMVisDateUpdated)) as \"PendingDays\" FROM config.amvis.core.AMVisTicket t JOIN config.amvis.core.AMVisAccount acc USING t.AMVisAccount JOIN ariba.user.core.User as AssignedTo using t.AMVisAssignedTo WHERE CurrentDate()-t.AMVisDateUpdated > 4 AND  t.AMVisStatus = 'OPEN' AND AMVisSubStatus = 'Customer Update' and t.AMVisIsAMSTicket!=false and AMVisDateClosed IS NULL  AND t.AMVisSubStatus !='Duplicate' ORDER BY t.AMVisDateUpdated ASC",
"line_chart":"SELECT 'Backlog', tm.AMVisWeekString, SUM(CASE t.AMVisDateClosed WHEN NULL THEN 1 ELSE CASE SIGN(t.AMVisDateClosed - tm.AMVisDate) WHEN -1 THEN 0 ELSE 1 END END) FROM config.amvis.core.AMVisTicket t, config.amvis.core.AMVisTime tm WHERE(CurrentDate() - tm.AMVisDate < 70 AND tm.AMVisDate < CurrentDate()) AND (t.AMVisDateClosed IS NULL OR CurrentDate() - t.AMVisDateClosed < 70) AND (CurrentDate() - tm.AMVisDate < 70) AND t.AMVisDateCreated < tm.AMVisDate AND tm.AMVisDayOfWeek=1 AND t.AMVisAssignedTeam='GS APP MGMT' AND beginswith(AMVisPriority, 'P', true) and t.AMVisIsAMSTicket!=false AND t.AMVisAccount.AMVisShortName not in ('Ariba')  AND t.AMVisSubStatus !='Duplicate' GROUP BY tm.AMVisWeekString ORDER BY tm.AMVisWeekString"
};

export default properties ;