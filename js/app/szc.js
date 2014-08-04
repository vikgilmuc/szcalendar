


define (["jquery", "libspine","app/szc.model", "app/szc.shell"], function ($, lib,model, shell){
    
 
    var ocupanciedays={};
    
    var initModule= function($container ){
        
        model.initModule();
        shell.initModule( $container );
       
        var cal1_html=model.Ocupancies.tablify(ocupanciedays);
        $('#Calendar').append(cal1_html);
        PubSub.subscribe("insert", function(){
              $.each(szc.model.Ocupancies.records, 
                  function(index){ 
                         if (this.start.date)
                            {var date= new Date(this.start.date);
                            }
                        else 
                            {var date= new Date(this.start.dateTime)
                            }
                    var myTemplate = $.templates("#ocutmpl");
                    var calid= "#"+date.getDate()+szc.model.Ocupancies.room;
                    myTemplate.link(calid, this);
                 }
             );
        
       })
    }
    
    return { 
            initModule: initModule
             };
    
   
})
    

