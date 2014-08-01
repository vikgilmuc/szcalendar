szc.shell = (function () {
    var initModule;
    
    initModule = function ($container) 
    {
        console.log("hier szc.shell"); 
        
                        /*----------------- controller ---------*/
                    jQuery(function($){
                        exports.szc.controller = Controller.create({
                            elements: {
                                "input[type=search]":"searchInput",
                                "form":"searchForm",
                                "#newvisit":"newvisit"
                            },
                        
                        events: {
                            "submit form": "search",
                            "mouseover #newvisit":"openwindow"
                        },
                        
                        init: function(){
                            
                        },
                        search: function(){
                            console.log("Searching:",this.searchInput.val());
                            return false;
                        },
                        
                        
                        openwindow: function(){
                            console.log("openwindow");
                            return false;
                        },
                        // Private
                        // Split on the first space
                        
                        
                        
                           
                     });
                
                          new szc.controller({el: $("#users")});
                    });
                        
       
        
    };
    
   
    return { initModule : initModule };

}());
