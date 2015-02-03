/**
 *  声明 object 操作相关
 */
(function() {
    P.object = {
        extend : function( obj1, obj2 ) {
            obj2 = obj2 || {};

            for ( var attrname in obj2 ) {
                if ( obj2.hasOwnProperty( attrname ) ) {

                    obj1[attrname] = obj2[attrname];
                }
            }
            return obj1;
        },

        forEach : function( elem, callback ) {
            var i, key
            if ( typeof elem.length == 'number' ) {
                for (i = 0; i < elem.length; i++)
                    if (callback.call(this, i, elem[i]) === false) return elem
            } else {
                for (key in elem)
                    if (callback.call(this, key, elem[key]) === false) return elem
            }

            return elem
        },

        parseToJSON : function( str ) {
            if ( !str ) return { };

            var obj = {}, r, 
                reg = /(.+?)=(.+)/, 
                arr = str.replace( /^[?&]/, '' ).split('&');

            arr.forEach( function( item ){

                r = item.match( reg );
                if ( r!=null ) obj[r[1]] = unescape( r[2] );
                
            } );

            return obj;
        }
    }

})();
