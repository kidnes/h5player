(function ( _super ) {

    var CoreVideo = P.Class( {

        init : function( model ) {

            this.model = model;

            this._initVideo( model );

            this._initEvent();
        },

        _initVideo : function( model ) {

            this.video = model.parentEl.find('video')[0];

            this.base = new P.c.BaseVideo( this.video );

            var opt = {
                type        : model.type,
                url         : model.url,
                autoplay    : model.autoplay,
                autoload    : model.autoload
            }

            model.url && this.playTV( opt );
        },

        _initEvent : function() {
            this.on( 'PlayTV', this._onPlayTV, this );

            this.on( 'TO_Play TO_Pause TO_Seek TO_Stop TO_Replay TO_VideoFull', this._listNotifi, this );
        },

        _listNotifi : function( e ) {
            switch ( e.type ) {
                case 'TO_Seek':
                    this.base.seek( e.data );
                    break;
                case 'TO_Play':
                    this.base.resume();
                    break;
                case 'TO_Pause':
                    this.base.pause();
                    break;
                case 'TO_Stop':
                    this.base.stop();
                    break;
                case 'TO_VideoFull':
                    this.base.changeFull( e.data );
                    break;
                case 'TO_Replay':
                    this.base.seek(0);
                    this.base.resume();
                    break;
            }
        },

        _onPlayTV : function( e ) {

            this.base.play( e.data );
        },

        playTV : function( elem ) {
            
            this.base.play( elem );
        },

        getCurrentTime : function() {
            return this.base.currentTime();
        },

        getBuffered : function() {
            return this.base.getBuffered();
        }

    } , _super );

    P.v.CoreVideo = CoreVideo;

})( P.Event );