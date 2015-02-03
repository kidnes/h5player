/**
 * @file {Class} 声明 BaseVideo 类
 * @desc 使用实例化方式调用
        接口：
        function initialize( video ) : void;
        function playMovie( $vid:String ) : void;
        function stop() : void;
        function pause() : void;
        function play() : void;
        function seek($time:Number) : void;
        function get status() : VideoStatusEnum;
        function get currentTime() : Number;
        function get bufferTime() : Number;
        function get totalTime() : Number;
 * @author liubin
 */

(function ( _super ) {

    var mediaManage = P.c.MediaManage,
        full = P.m.fullscreen;

    var BaseVideo = P.Class('BaseVideo', {
        
        init : function( video ) {
            this.video = video;
        },

        /**  
         * MediaElement 数据
         * 
         * {param} type media视频类型
         * {param} url 视频播放地址
         * {param} htime 续播时间
         * {param} autoplay 自动播放 
         */
        play : function( elem ) {
            elem = mediaManage.getElem( elem );

            this.media = this.media || mediaManage.getMedia( elem.type, this.video );

            this.media.on('canplay', function(){console.log('canplay')});

            this.media.play( elem );
        },

        seek : function( time ) {
            this.media.seek( time );
        },

        pause: function() {
            try {
                this.video.pause();
            } catch(e) {};
        },

        resume : function() {
            try {
                this.video.play();
            } catch(e) {};
        },

        replay : function() {
            
        },

        stop : function() {

        },

        currentTime : function( value ) {
            if ( value ) {
                this.video.currentTime = value;
            } else {
                return this.video.currentTime;
            }
        },

        getBuffered : function() {
            return this.video.buffered;
        },

        changeFull : function( value ) {
            if ( value ) {
                this.video[ full['request'] ]();
            } else {
                this.video[ full['exit'] ]();
            }
        }
    } , _super );

    P.c.BaseVideo = BaseVideo;

})( P.Event );