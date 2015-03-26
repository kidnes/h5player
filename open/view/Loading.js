(function( _super ) {
    
    var Loading = P.Class( {

        init : function( model ) {

            this.model = model;

            this._initDom( this.model.parentEl );

            this._initEvent();
        },

        _initDom : function( parent ) {
            this.el = parent.find('.hv_ico_loading')[0];
        },

        _initEvent : function() {
            this.on('ended', this.hide, this);
            this.on('seeking waiting error TO_Loading', this.show, this);
        },

        show : function() {
            this.el.style.display = 'block';

            this.on('timeupdate', this.hide, this);
        },

        hide : function() {
            this.el.style.display = 'none';

            this.off('timeupdate', this.hide, this);
        }

    }, _super );

    P.v.Loading = Loading;

})( P.v.Component );