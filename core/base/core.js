/**
 * @file 声明内核命名空间
 * @author liubin
 */
(function() {
    var core = { };

    function extend( obj1, obj2 ) {

        for ( var attrname in obj2 ) {
            if ( obj2.hasOwnProperty( attrname ) ) {
                
                obj1[attrname] = obj2[attrname];
            }
        }
        return obj1;
    }


    core.debug = location.href.slice(-6) === "#debug";

    core.v = { }; //view
    core.c = { }; //core
    core.m = { }; //module
    core.tpl = { }; //tpl

    window.P = window.P || {};

    extend( window.P, core );

})();