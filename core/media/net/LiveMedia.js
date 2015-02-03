(function ( _super ) {

    P.object.extend( LiveMedia, _super );

    function LiveMedia( video ) {
        this.video = video;
    }

    LiveMedia.prototype = {

    }

    P.c.LiveMedia = LiveMedia;

})( P.c.BaseMedia );