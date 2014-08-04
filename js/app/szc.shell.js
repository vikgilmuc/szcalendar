define(function (){
    
    var initModule = function ($container) {
        
        /*----------------- controller calendar ---------*/
       
      
           $(function($){
                szc.controller = Controller.create({
                    elements: {
                        "input[type=search]":"searchInput",
                        "form":"searchForm",
                        "#newvisit":"newvisit"
                    },
                
                    events: {
                        "submit form": "search",
                        "mouseover #newvisit":"openwindow"
                    },
                    
                    init: function(element){
                      this.el = $(element);
                      this.refreshElements();
                      this.searchForm.submit(this.proxy(this.search));
                    },
                    search: function(){
                        console.log("Searching:",this.searchInput.val());
                        return false;
                    },
                    
                
                    openwindow: function(){
                        console.log("openwindow");
                        return false;
                    },
                 });
             new szc.controller({el: $("#users")});
        })
    
    };
    
 return { initModule : initModule };
 
 
});