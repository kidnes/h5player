/**
 * @file {Class} 声明显示层基类
 * @desc 使用实例化方式调用
 * @author liubin
 */

(function( _super ) {

    var Component = P.Class( {
        init: function( model ) {
            
        },
        show : function() {
            this.el.style.display = 'block';
        }, 
        hide : function() {
            this.el.style.display = 'none';
        },
        enable : function( flag ) { }

    }, _super);

    P.v.Component = Component;

})( P.Event );