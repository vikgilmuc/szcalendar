szc.model= (function(){

    
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
       
       $.ajax({
          // url:'https://www.googleapis.com/calendar/v3/users/me/calendarList?key=AIzaSyD9k14jGF8mF3O0wn5kBV8C_AVs41bYKNs',
          // dataType: 'jsonp',
          //  success: function(daten) {
                
               
           //             }
       });
       
       
       
         $.ajax({
            url: 'https://www.googleapis.com/calendar/v3/calendars/lm4ac6bt0i9ogdvho49j3e77fo%40group.calendar.google.com/events?timeMax=2014-08-31T00%3A00%3A00%2B00%3A00&timeMin=2014-08-01T00%3A00%3A00%2B00%3A00&key=AIzaSyD9k14jGF8mF3O0wn5kBV8C_AVs41bYKNs',
            dataType: 'jsonp',
            success: function(daten) {
                
                Ocupancies.room=1;
                Ocupancies.populate(daten.items);
                var ocupancies1= Ocupancies.init({room: 1});
                ocupancies1.records= Ocupancies.records;
                ocupancies1.save();
              //  localStorage.setItem("loc_ocupancies1", JSON.stringify(ocupancies1));
                PubSub.publish("insert");
                        }
                        
        }); 
         $.ajax({
            url: 'https://www.googleapis.com/calendar/v3/calendars/2t7r6pgspu3p0el4omkfqvk7os@group.calendar.google.com/events?timeMax=2014-08-31T00%3A00%3A00%2B00%3A00&timeMin=2014-08-01T00%3A00%3A00%2B00%3A00&key=AIzaSyD9k14jGF8mF3O0wn5kBV8C_AVs41bYKNs',
            dataType: 'jsonp',
            success: function(daten) {
                Ocupancies.room = 2;
                Ocupancies.populate(daten.items);    
                var ocupancies2= Ocupancies.init({room: 2}); 
                ocupancies2.records= Ocupancies.records; 
                ocupancies2.save();    
               // localStorage.setItem("loc_ocupancies2", JSON.stringify(ocupancies2));  
                PubSub.publish("insert");
                        }
                        
        }); 
   
    $.ajax({
            url: 'https://www.googleapis.com/calendar/v3/calendars/df74thb0ufev0n2k7tsm9jcucs@group.calendar.google.com/events?timeMax=2014-08-31T00%3A00%3A00%2B00%3A00&timeMin=2014-08-01T00%3A00%3A00%2B00%3A00&key=AIzaSyD9k14jGF8mF3O0wn5kBV8C_AVs41bYKNs',
            dataType: 'jsonp',
            success: function(daten) {
                Ocupancies.room = 3;
                Ocupancies.populate(daten.items);    
                var ocupancies3= Ocupancies.init({room: 3}); 
                ocupancies3.records= Ocupancies.records; 
                ocupancies3.save();    
               // localStorage.setItem("loc_ocupancies2", JSON.stringify(ocupancies2));  
                PubSub.publish("insert");
                        }
                        
        }); 
   
    $.ajax({
            url: 'https://www.googleapis.com/calendar/v3/calendars/ib6qioa059in1oc2222pg749eg@group.calendar.google.com/events?timeMax=2014-08-31T00%3A00%3A00%2B00%3A00&timeMin=2014-08-01T00%3A00%3A00%2B00%3A00&key=AIzaSyD9k14jGF8mF3O0wn5kBV8C_AVs41bYKNs',
            dataType: 'jsonp',
            success: function(daten) {
                Ocupancies.room = 4;
                Ocupancies.populate(daten.items);    
                var ocupancies4= Ocupancies.init({room: 4}); 
                ocupancies4.records= Ocupancies.records; 
                ocupancies4.save();    
               // localStorage.setItem("loc_ocupancies2", JSON.stringify(ocupancies2));  
                PubSub.publish("insert");
                        }
                        
        }); 
   $.ajax({
            url: 'https://www.googleapis.com/calendar/v3/calendars/2n2ajrefh42loj3bo2ipj89ptg4@group.calendar.google.com/events?timeMax=2014-08-31T00%3A00%3A00%2B00%3A00&timeMin=2014-08-01T00%3A00%3A00%2B00%3A00&key=AIzaSyD9k14jGF8mF3O0wn5kBV8C_AVs41bYKNs',
            dataType: 'jsonp',
            success: function(daten) {
                Ocupancies.room = 5;
                Ocupancies.populate(daten.items);    
                var ocupancies5= Ocupancies.init({room: 5}); 
                ocupancies5.records= Ocupancies.records; 
                ocupancies5.save();    
               // localStorage.setItem("loc_ocupancies2", JSON.stringify(ocupancies2));  
                PubSub.publish("insert");
                        }
                        
        }); 
   
   
   
   }
   
  return {
      initModule:initModule,
      Ocupancies: Ocupancies
      
  };
    
})();	



	
	
	
	
        
      
           