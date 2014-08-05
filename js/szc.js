var szc = (function () {
    var ocupanciedays={};
    var initModule = function ( $container ) {
        szc.model.initModule();
        szc.shell.initModule( $container );
            var cal1_html=szc.model.Ocupancies.tablify(ocupanciedays);
            $('#Calendar').append(cal1_html);
            $('table').stickyTableHeaders();
            PubSub.subscribe("insert", function(){
           
                $.each(szc.model.Ocupancies.records, function(index){ 
                     if (this.start.date)
                        {var date= new Date(this.start.date);
                        }
                    else 
                        {var date= new Date(this.start.dateTime)
                        }
                var myTemplate = $.templates("#ocutmpl");
                var calid= "#"+date.getDate()+szc.model.Ocupancies.room;
                myTemplate.link(calid, this);
            })
         });
    };
    return { initModule: initModule,
   };
}());



