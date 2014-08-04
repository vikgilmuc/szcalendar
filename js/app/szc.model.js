define( function(){
    
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
                       new Date(thisMonth.year,thisMonth.month,i).getDay()==6){
                           if (new Date().getDate()==i){table+=" class='today "}
                            else table+=" class='";
                           table+="we '";
                            
                           
                      };
                       table+=">"
                       
                       for(j=1 ;j<=5; j++){
                       table+="<td id='"+i+j+"'>"+i;
                       
                       table+="</td>";
                       }
                       table+="</tr>";
                    };
                   table+="</tbody></table>";
                return table
                  }
           }) ;
           
   
    initModule= function(){
       
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
      }
   
  
    
    

return {
      initModule:initModule,
      Ocupancies: Ocupancies      
  };
})	
	
	
	
        
      
           