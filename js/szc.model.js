szc.model= (function(){

 var ocupancies= [];
           var Month = function (month,year,raum) {
            
                var monthNames = [ "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ];
                this.name= monthNames[month];
                this.lange= (new Date(year, month, 0)).getDate() ;
               this.year= year;
               this.month=month;
               this.raume=5;
                };
        
           Month.prototype= { 
            setlenght: function () {    
              this.lange=daysInMonth(7,2014) ;},
            };
        
            thisMonth= new Month(7,2014,5);
        
           function daysInMonth(month,year) {
                         return new Date(year, month, 0).getDate();
            }
             today = new Date();
                    
  
  
  
   
   var Ocupancies= Model.create();
   
   Ocupancies.extend({
       tablify: function(ocupanciedays){
           /***** this doesn't match here, but (still) don't know where----*/
           
        var i=1, j=1;
        var table="<table><thead><tr>"
        for(j=1 ;j<=5; j++)
        table+= "<th>Raum "+j+"</th>";
        table+= "</tr></thead><tbody>";
        for(i=1 ;i<=thisMonth.lange; i++) {
           table+="<tr"; 
           if (new Date(thisMonth.year,thisMonth.month,i).getDay()==0||
           new Date(thisMonth.year,thisMonth.month,i).getDay()==6|| today.getDate()==i){ 
               table+=" class='";
               if (new Date().getDate()!=i) table+="we '"
                else table+="today'";
                
               
            };
           
           
           table+=">"
           
           for(j=1 ;j<=5; j++){
           table+="<td>"+i+"<span id='"+i+j+"'>";
           
           table+="</span></td>";
           }
           table+="</tr>";
        };
       table+="</tbody></table>";
    return table
      }
   }) 

   initModule= function(){
       
       var calendars_id=['lm4ac6bt0i9ogdvho49j3e77fo@group.calendar.google.com','2t7r6pgspu3p0el4omkfqvk7os@group.calendar.google.com', 'df74thb0ufev0n2k7tsm9jcucs@group.calendar.google.com','ib6qioa059in1oc2222pg749eg@group.calendar.google.com',
       'n2ajrefh42loj3bo2ipj89ptg4@group.calendar.google.com'];
       
      for (var i=1; i<=5; i++)
           {
               (function (e) {
                    $.ajax({
                    url: 'https://www.googleapis.com/calendar/v3/calendars/'+
                    calendars_id[e-1]+
                    '/events?timeMax=2014-08-31T00%3A00%3A00%2B00%3A00&timeMin=2014-08-01T00%3A00%3A00%2B00%3A00&key=AIzaSyD9k14jGF8mF3O0wn5kBV8C_AVs41bYKNs',
                    dataType: 'jsonp',
                    success: function(daten) {
                       Ocupancies.room=e; 
                        Ocupancies.populate(daten.items);
                        ocupancies[e]=Ocupancies.init({room: e});
                        ocupancies[e].records= Ocupancies.records;
                        ocupancies[e].save();
                        PubSub.publish("insert");}
                    });
                })(i);
            }
     }    
   
   
  return {
      initModule:initModule,
      Ocupancies: Ocupancies,
  };
    
})();	



	
	
	
	
        
      
           