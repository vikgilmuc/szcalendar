


define (["jquery", "libspine","app/szc.model", "app/szc.shell","jsviews","jsrender"], function ($, lib, model, shell,jsviews,jsrender){
    
 
    var ocupanciedays={};
    
    var initModule= function($container ){
        
        model.initModule();
        shell.initModule( $container );
       
        var cal1_html=model.Ocupancies.tablify(ocupanciedays);
        $('#Calendar').append(cal1_html);
        lib.PubSub.subscribe("insert", function(){
              $.each(model.Ocupancies.records, 
                  function(index){ 
                      console.log(this);
                         if (this.start.date)
                            {var date= new Date(this.start.date);
                            }
                        else 
                            {var date= new Date(this.start.dateTime)
                            }
                    var myTemplate = $.templates("#ocutmpl");
                    var calid= "#"+date.getDate()+model.Ocupancies.room;
                    myTemplate.link(calid, this);
                 }
             );
        
       })
    }
    
    return { 
            initModule: initModule
             };
    
   
})
    

