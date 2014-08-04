

requirejs.config({
    baseUrl: 'js/lib',
   
    paths:{
        app:'../app'
    }
    
});



requirejs(['jquery','libspine','app/szc'], function($,lib,szc){
    
    szc.initModule();
}
    
);



