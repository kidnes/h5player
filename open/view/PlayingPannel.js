(function( _super ) {
    
    var PlayingPannel = P.Class( 'PlayingPannel', {

        init : function( model ) {

            this.model = model;

            this.moveCount = 0;

            this._initDom( model );

            // this._addEvent();

            // this._autoHidePannel();
        },

        _initDom : function( model ) {
            this.$el = model.parentEl;

            this.pannel = this.$el.find('.hv_play_bg');
        },

        _addEvent : function() {
            this.pannel.on( 'mousemove', this._onMouseMove, this );
        },

        _onMouseMove : function() {
            if ( this.moveCount++ < 10 ) return;

            this.moveCount = 0;
            this._showPannel();
        },

        _showPannel: function(){
            this.$el.removeClass('hv_box_hide');
            this._autoHidePannel();
        },

        _autoHidePannel: function(){
            this.autoHideId && clearTimeout( this.autoHideId );

            var me = this;
            this.autoHideId = setTimeout( function() {
                me.$el.addClass('hv_box_hide');
            }, 10000);
        },

    }, _super );

    P.v.PlayingPannel = PlayingPannel;

})( P.v.Component );