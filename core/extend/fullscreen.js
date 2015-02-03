(function( ) {

    var apiMap, specApi, browserApi, i;

    
    // map approach from Screenful.js - https://github.com/sindresorhus/screenfull.js
    apiMap = [
        // Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
        [
            'request',
            'exit',
            'element',
            'enabled',
            'change',
            'error'
        ],
        // WebKit
        [
            'webkitRequestFullScreen',
            'webkitExitFullscreen',
            'webkitFullscreenElement',
            'webkitFullscreenEnabled',
            'webkitfullscreenchange',
            'webkitfullscreenerror'
        ],
        // Old WebKit (Safari 5.1)
        [
            'webkitRequestFullscreen',
            'webkitCancelFullScreen',
            'webkitCurrentFullScreenElement',
            'webkitCancelFullScreen',
            'webkitfullscreenchange',
            'webkitfullscreenerror'
        ],
        // Mozilla
        [
            'mozRequestFullScreen',
            'mozCancelFullScreen',
            'mozFullScreenElement',
            'mozFullScreenEnabled',
            'mozfullscreenchange',
            'mozfullscreenerror'
        ],
        // Microsoft
        [
            'msRequestFullscreen',
            'msExitFullscreen',
            'msFullscreenElement',
            'msFullscreenEnabled',
            'MSFullscreenChange',
            'MSFullscreenError'
        ]
    ];

    specApi = apiMap[0];

    
    for ( i = 0; i < apiMap.length; i++ ) {
        if ( apiMap[i][1] in document ) {
            browserApi = apiMap[i];
            break;
        }
    }

    if ( browserApi ) {
        var result = {};

        for ( i = 0; i < browserApi.length; i++ ) {
            result[ specApi[i] ] = browserApi[i];
        }

        P.m.fullscreen = result;
    }
})();