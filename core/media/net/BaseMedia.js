(function ( _super ) {

    var events = "loadstart play waiting progress durationchange loadedmetadata canplay  \
                    playing timeupdate pause error ended seeked";


    var BaseMedia = P.Class( {

        init : function( video ) {

            this.video = video;

            this._initEvt();

            this._checkStart();
        },

        _initEvt : function() {

            var _video = P.$(this.video);

            _video.on( events, this._onEvt, this );

            _video.on( P.m.fullscreen['change'], this._onFullChange, this );

            this.on( 'ended', this._checkStart, this );
        },

        _onEvt : function( e ) {
            if ( e.type !== 'timeupdate' ) {
                // console.log('_onEvt:'+e.type);
            }

            this.fire( e.type );
        },

        _onFullChange : function( e ) {
            this.isFull = !this.isFull;
            this.fire( 'Video::Fullchange', this.isFull );
        },

        _checkStart : function() {
            this.on( 'timeupdate', this._onTimeupdate, this );
        },

        _onTimeupdate : function( e ) {

            if ( this.video.currentTime > 0 ) {  //chrome浏览器无自动播放时，会触发一次timeupdate
                this.fire( 'Video::Playstart' );

                this.off( 'timeupdate', this._onTimeupdate );
            }
            
        },

        _autoplay : function( ) {
            this.video.play();

            !this.video.fake && this._fakeClick();  //只有第一次调用，切换清晰度等不调用
        },

        _autoload : function() {
            
            this.video.load();
        },

        _fakeClick: function() {

            var tag = document.createElement( 'a' );
            tag.setAttribute( 'id', 'fakeClick' );
            tag.setAttribute( 'href', '#' );

            tag.onclick = function( e ) {
                e.preventDefault();
            }

            var e, head = document.head;

            head.insertBefore( tag, head.firstChild );

            if ( document.createEvent ) {
                e = document.createEvent( "MouseEvents" );
                if ( e.initMouseEvent ) {
                    e.initMouseEvent( "click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
                    var el = P.$( "#fakeClick" )[0];
                    el.dispatchEvent( e );

                    this.video.fake = true;
                }
            }

            head.removeChild( tag );
        },

        play : function( elem ) {

            this.video.setAttribute('preload', elem.autoload ? 'auto' : 'none');

            this.src( elem.url );
            
            elem.autoload && this._autoload();
            elem.autoplay && this._autoplay();
        },

        src : function( src ) {
            
            this.video.setAttribute('src', src);
        },

        setStatus : function( status ) {
            this.fire( status );
        }
        
    } , _super );

    P.c.BaseMedia = BaseMedia;

})( P.Event );