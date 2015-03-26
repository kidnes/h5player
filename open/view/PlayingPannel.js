(function( _super ) {
    
    var PlayingPannel = P.Class( {

        init : function( model ) {

            this.model = model;

            this.moveCount = 0;

            this._initDom( model );

            this._initEvent();

            this._autoHidePannel();
        },

        _initDom : function( model ) {
            this.$el = model.parentEl;

            this.pannel = this.$el.find('.hv_play_bg');
        },

        _initEvent : function() {
            this.on( 'Video::Playstart ended', this._onVideoEvt, this );
        },

        _addEvent : function() {
            this.pannel.on( 'mousemove', this._onMouseMove, this );
        },

        _removeEvent : function() {
            this.pannel.off( 'mousemove', this._onMouseMove, this );
        },

        _onVideoEvt : function( e ) {

            switch (e.type) {

                case 'Video::Playstart':
                    this._showPannel();

                    this.enable( true );
                    break;

                case 'ended':
                    this._hidePannel();
                    
                    this.enable( false );
                    break;
            }
        },

        _onMouseMove : function() {
            if ( this.moveCount++ < 5 ) return;
            
            this.moveCount = 0;
            this._showPannel();
        },

        _showPannel : function(){
            this.$el.removeClass('hv_box_hide');
            this._autoHidePannel();
        },

        _hidePannel : function() {
            this.$el.addClass('hv_box_hide');
        },

        _autoHidePannel : function(){
            this.autoHideId && clearTimeout( this.autoHideId );

            var me = this;
            this.autoHideId = setTimeout( function() {
                me._hidePannel();
            }, 10000);
        },

        enable : function( flag ) {

            this._enable = flag;
            
            flag ? this._addEvent() : this._removeEvent();
        }

    }, _super );

    P.v.PlayingPannel = PlayingPannel;

})( P.v.Component );