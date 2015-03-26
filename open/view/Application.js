/**
 * @file {Class} 声明显示层应用类
 * @desc 使用实例化方式调用
 * @author liubin
 */

(function( _super ) {

    var Application = P.Class( {
        init : function( views ) {
            this.views = views;

            // this._initEvent();
        },

        _initEvent : function() {
            this.on( 'Video::Playstart', this._onVideoEvt, this );
        },

        _onVideoEvt : function( e ) {
            switch ( e.type ) {

                case 'Video::Playstart':
                    this.views.bar.enable( true );
                    break;
            }
        }

    }, _super);

    P.v.Application = Application;

})( P.Event );