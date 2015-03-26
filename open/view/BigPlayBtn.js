(function( _super ) {
    
    var BigPlayBtn = P.Class( {
        init : function( model ) {

            this._initDom( model.parentEl );

            this._initEvent();
        },

        _initDom : function( parent ) {
            this.$el = parent.find('.hv_ico_pasued');
            this.el = this.$el[0];
        },

        _initEvent : function() {
            this.$el.on( 'click', this._onclick, this );

            this.on( 'Video::Playstart', this.hide, this );
            this.on( 'ended', this.show, this);
        },

        _onclick : function() {
            this.hide();

            this.fire('TO_Loading');

            this.fire('TO_Play');
        }

    }, _super );

    P.v.BigPlayBtn = BigPlayBtn;

})( P.v.Component );