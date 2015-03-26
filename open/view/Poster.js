(function( _super ) {
    
    var Poster = P.Class( {
        init : function( model ) {

            this._initDom( model );

            this._initEvent();
        },

        _initDom : function( model ) {
            this.el = model.parentEl.find('.hv_play_poster')[0];

            model.poster && this._initPoster( model.poster );
        },

        _initEvent : function() {
            this.on( 'SetPoster', this._onSetPoster, this );

            this.on( 'Video::Playstart', this.hide, this );
            this.on( 'ended AD_ENDED', this.show, this);
        },

        _onSetPoster : function( e ) {
            e.data && this._initPoster( e.data );
        },

        _initPoster : function( imgUrl ){

            this.el.style.backgroundImage = 'url(' + imgUrl + ')';
            this.el.style.display = 'block';
        }

    }, _super );

    P.v.Poster = Poster;

})( P.v.Component );