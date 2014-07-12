var monthproto = {
    lange: 30,
    name: "",
    getlenght: function () {
           return  this.lange;}           
}

var Month = function (month,year,raum) {
    
    var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    this.name= monthNames[month];
    this.lange= (new Date(year, month, 0)).getDate() ;
   this.year= year;
   this.month=month;
   this.raum=raum;
};

Month.prototype= { 
    //setlenght: function () {    
    //    this.lange=daysInMonth(month,2014) ;},

    sayname: function () {
        
        return "I have "+this.name;
    }   ,
    
    tablify: function (){
        var i=1;
        var table="<table><thead><tr><th>Raum "+this.raum+"</th></tr></thead><tbody>";
        for(i=1 ;i<=this.lange; i++) {
           table+="<tr"; 
           if (new Date(this.year,this.month,i).getDay()==0||
           new Date(this.year,this.month,i).getDay()==6){
               if (new Date().getDate()==i){table+=" class='today "}
                else table+=" class='";
               table+="we '";
                
               
          };
           table+="><td>"+i+"</td></tr>";
        };
       table+="</tbody></table>";
    return table
    }
    
};

