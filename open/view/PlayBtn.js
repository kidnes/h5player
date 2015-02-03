(function( _super ) {

    var PlayBtn = P.Class('PlayBtn', {
        init: function( model ) {
            this._initDom( model.parentEl );

            this._addEvent();
        },

        _initDom : function( parent ) {

            this.$el = parent.find('.hv_start span');

            this.el = this.$el[0];
        },
        
        _addEvent : function() {
            this.$el.on( 'click touchstart', this._onBtnPlay, this );

            this.on( 'play pause ended', this._onVideoEvt, this );
        },

        _removeEvent : function() {
            this.$el.off( 'click touchstart', this._onBtnPlay, this );

            this.off( 'play pause ended', this._onVideoEvt, this );
        },

        _onBtnPlay : function() {
            switch( this.el.className ){
                case 'hv_ico_star':
                    this.fire( 'TO_Pause' );
                    break;
                case 'hv_ico_stop':
                    this.fire( 'TO_Play' );
                    break;
                case 'hv_ico_refresh':
                    this.fire( 'TO_Replay' );
                    break;
            }
        },

        _onVideoEvt : function( e ) {
            switch ( e.type ) {
                case 'play':
                    this.el.className = 'hv_ico_star';
                    break;
                case 'pause':
                    this.el.className = 'hv_ico_stop';
                    break;
                case 'ended':
                    this.el.className = 'hv_ico_refresh';
                    break;
            }
        }

    }, _super);

    P.v.PlayBtn = PlayBtn;

})( P.v.Component );