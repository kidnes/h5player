(function( _super ) {

    var ProgressBar = P.Class('ProgressBar', {
        init: function( model, core ) {
            this.core = core;

            this.count = 0;

            this._initDom( model.parentEl );

            this._addEvent();
        },

        _initDom : function( parent ) {

            this.$el = parent.find('.hv_scroll_cnt');

            this.el = this.$el[0];

            this.e_curtime = parent.find('.time_cur')[0];

            this.e_totaltime = parent.find('.time_total')[0];

            this.e_curtbar = parent.find('.porgress_playback')[0];

            this.e_bufferbar = parent.find('.progress_download')[0];

            this.$e_slider = parent.find('.hv_ico_playing');


            this.slider = new P.m.Touchable( this.$e_slider );
        },
        
        _addEvent : function() {

            this.on( 'timeupdate', this._onTimeUpdate, this );

            this.on( 'progress', this.setBufferBar, this );

            this.on( 'touchstart', this._onTouchStart, this );
            this.on( 'touchmove', this._onTouchMove, this );
            this.on( 'touchend', this._onTouchEnd, this );

            this.on( 'Video::Durachange Video::Seeked', this._onVideoEvt, this );
        },

        _removeEvent : function() {

            this.off( 'timeupdate', this._onTimeUpdate, this);

            this.off( 'progress', this.setBufferBar, this );

            this.off( 'touchstart', this._onTouchStart, this );
            this.off( 'touchmove', this._onTouchMove, this );
            this.off( 'touchend', this._onTouchEnd, this );

            this.off( 'Video::Durachange Video::Seeked', this._onVideoEvt, this );
        },

        _onTouchStart: function( e ) {
            
            var nativeEvt = e.data[1];

            nativeEvt.preventDefault();

            this.isSeeking = true;

            var elOffset = this.$el.offset(),
                sliderOffset = this.$e_slider.offset();

            this.diffX = e.data[0].startTouch.x - sliderOffset.left + elOffset.left;
            this.barWidth = elOffset.width - sliderOffset.width;

            document.body.focus();
            document.onselectstart = function() {
                return false;
            };
        },

        _onTouchMove : function( e ) {

            var targetSilderX = e.data[0].currentTouch.x - this.diffX;

            var time = targetSilderX / this.barWidth * this.dura;

            time = Math.max( time, 0 );
            time = Math.min( time, this.dura );

            this.setProgress( time );
        },

        _onTouchEnd : function( e ) {

            var targetSilderX = e.data[0].currentTouch.x - this.diffX;

            var time = targetSilderX / this.barWidth * this.dura;

            this._toSeek( time );

            this.fire( 'TouchSeekEnd', time );

            document.onselectstart = null;
        },

        _toSeek : function( time ) {

            var me = this;

            this.seekId && clearTimeout(this.seekId);

            this.seekId = setTimeout( function() {

                me.fire( 'TO_Seek', time );

                me.fire( 'TO_Play' );

            }, 100 );
        },

        _onVideoEvt : function( e ) {
            
            switch ( e.type ) {

                case 'Video::Seeked':
                    this.isSeeking = false;

                    break;
                
                case 'Video::Durachange':
                    this.dura = e.data;

                    this.e_totaltime.innerHTML = this.formatTime( this.dura );

                    this.setBufferBar();
                    break;
            }
        },

        _onTimeUpdate : function() {
            if( this.isSeeking ) return;

            this.setProgress( this.core.getCurrentTime() );
        },

        _setProTime : function( time ) {
            if ( this.proTime === time ) return;

            this.proTime = time;

            this.e_curtime.innerHTML = this.formatTime( time );

        },

        _setPlayedBar : function( ) {

            this.e_curtbar.style.width = this.percent + '%';

            this._setProTime( parseInt( this.currTime ) );

            this._setTimePositon();
        },

        _setTimePositon : function( ) {
            if ( ++this.count < 5 ) return;
            this.count = 0;

            var elOffset = this.$el.offset(),
                sliderOffset = this.$e_slider.offset();

            if ( sliderOffset.left - elOffset.left > 45 ) {

                if ( !this.isTimeLeft ) {
                    this.e_curtime.style.right = '0px';
                    this.isTimeLeft = true;
                }

            } else {
                
                if ( this.isTimeLeft ) {
                    this.e_curtime.style.right = '-62px';
                    this.isTimeLeft = false;
                }
            }

            if ( elOffset.left + elOffset.width - sliderOffset.left - sliderOffset.width > 60 ) {
                if ( !this.gdurShow ) {
                    this.e_totaltime.style.display = 'block';
                    this.gdurShow = true;
                }
            } else {
                if ( this.gdurShow ) {
                    this.e_totaltime.style.display = 'none';
                    this.gdurShow = false;
                }
            }
        },

        setProgress : function( time ) {

            if ( this.currTime === time ) return;

            this.currTime = time;

            this.percent = time / this.dura * 100;

            this._setPlayedBar( );
        },

        setBufferBar : function( ) {
            if ( !this.dura ) return;

            var buffered = this.core.getBuffered();

            if ( !buffered || !(buffered.length > 0) ) return;

            var buffTime = buffered.end( buffered.length - 1 );

            if ( buffTime > this.currTime ) {
                var percent = buffTime / this.dura * 100;

                percent = Math.max( percent, this.percent || 0 );

                this.e_bufferbar.style.width = percent + '%';
            }
        },

        formatTime : function( second ) {

            var m = Math.floor( second / 60 );
            m < 10 && ( m = "0" + m );

            var s = Math.floor( second % 60 );
            s < 10 && ( s = "0" + s );

            return m + ":" + s;
        }
        
    }, _super);

    P.v.ProgressBar = ProgressBar;

})( P.v.Component );