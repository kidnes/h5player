define(function(require, exports, module) {

    var baseMedia = require('./BaseMedia');

    var LiveMedia = Q.Class('P2PMedia', {
        init : function( video ) {
            this.video = video;
        }

        
    }, baseMedia );

    module.exports = P2PMedia;
});