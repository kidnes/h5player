(function ( _super ) {

    var VodMedia = P.Class( {
        init : function( video ) {
            this.video = video;

            this._initEvt();
        },

        _initEvt : function() {

            this.on( 'durationchange', this._onDura, this);
        },

        _onDura : function() {
            var gdur = this.video.duration;

            if ( !isNaN( gdur ) && gdur > 1 && isFinite( gdur ) ) {
                this.gdur = gdur;

                this.fire( 'Video::Durachange', gdur );

                if ( this.startTime > 0 ) this.seek( this.startTime );
            }
        },

        seek : function( time ) {
            P.log.log('seek::'+ time);

            if ( isNaN( time ) ) return;

            time = Math.max( time, 1 );
            time = Math.min( time, this.gdur - 5 );

            this.seekId && clearTimeout( this.seekId );

            var me = this,
                seekable= this.video.seekable;
            
            if ( seekable ) {
                if ( seekable.length === 1 && seekable.end( 0 ) > time ) {
                    
                    this.seekTo( time );
                } else {
                    
                    this.seekId = setTimeout( function() {
                        me.seek( time );

                    }, 1000)
                }
            }

        },

        seekTo : function( time ) {
            try {
                this.video.currentTime = time;

                this.one( "timeupdate", function() {

                    this.fire("Video::Seeked");
                }, this);

            } catch ( e ) {

                this.one( "canplay", function() {
                    this.video.currentTime = time;
                }, this);
            }
        },

        play : function( elem ) {
            this.super.play( elem );

            this.startTime = elem.htime || -1;
        }
        
    }, _super );

    P.c.VodMedia = VodMedia;

})( P.c.BaseMedia );