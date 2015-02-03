(function() {

    var MediaManage = {

        getElem : function( value ) {
            return {
                type: value.type,
                url: value.url,
                htime: value.htime,
                autoplay: value.autoplay
            }
        },

        getMedia : function( type, video ) {
            var media;
            switch ( type ) {
                case 'vod':
                    media = new P.c.VodMedia( video );
                    break;
                case 'live':
                    media = new P.c.LiveMedia( video );
                    break;
            }

            return media;
        }
    }

    P.c.MediaManage = MediaManage;

})();