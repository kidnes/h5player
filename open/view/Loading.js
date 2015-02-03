(function( _super ) {
    
    var Loading = P.Class( 'Loading', {

        init : function( model ) {

            this.model = model;

            this._initDom( this.model.parentEl );

            this._initEvent();
        },

        _initDom : function( parent ) {
            this.el = parent.find('.hv_ico_loading')[0];
        },

        _initEvent : function() {
            this.on('canplay canplaythrough play playing seeked paused ended', this.hide, this);
            this.on('seeking waiting error', this.show, this);
        }

    }, _super );

    P.v.Loading = Loading;

})( P.v.Component );