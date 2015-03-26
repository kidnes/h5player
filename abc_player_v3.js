
(function(window){
    window.console || (console={log:function(){},dir:function(){},error:function(){}});

    var ver = {
        /*<VER>*/
/*<VER>*/
        "_": "201212/22/lejs_0/"
    };

    window.__loadjs = function(js){
        document.write('<script type="text/javascript" src="http://js.letvcdn.com/js/'+(ver[js]||ver._).split('|')[0]+js+'.js"></script>');
    };

    try{
        document.domain = 'letv.com';
    }catch(e){}
    
    window.__INFO__ || (__INFO__ = {});
})(window);
