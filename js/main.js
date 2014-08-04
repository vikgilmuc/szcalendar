

requirejs.config({
    baseUrl: 'js/lib',
   
    paths:{
        app:'../app'
    }
    
});



requirejs(['jquery','libspine',"jsviews","jsrender",'app/szc'], function($,lib,jsviews, jsrender,szc){
    
    szc.initModule();
}
    
);



