(function( _super ) {

    var FullBtn = P.Class('FullBtn', {
        init : function( model ) {

            this._initDom( model.parentEl );

            this._addEvent();
        },

        _initDom : function( parent ) {

            this.$el = parent.find('.hv_ico_screen');

            this.el = this.$el[0];
        },
        
        _addEvent : function() {
            this.$el.on( 'click touchstart', this._onBtnFull, this );
        },

        _removeEvent : function() {
            this.$el.off( 'click touchstart', this._onBtnFull, this );
        },

        _onBtnFull : function( e ) {
            this.fire( 'TO_VideoFull' , true );
        }
    }, _super );

    P.v.FullBtn = FullBtn;

})( P.v.Component );