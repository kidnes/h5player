/**
 * @file 类的声明与继承
 * @namespace base.class
 * @author liubin
 */

(function() {

    P.Class = function( name, object, superClass ) {
        object = object || {};
        superClass = superClass || Object;

        var uuid = 1;
        var init = object['init'] || object.init || this.prototype['init'] || this.prototype.init || function() {};
        
        function klass() {
            if ( typeof superClass === 'function' ) {

                // this.super = new superClass( arguments );
                
                var args = arguments;

                switch ( args.length ) {
                    case 1:
                        this.super = new superClass( args[0] );
                        break;
                    case 2:
                        this.super = new superClass( args[0], args[1] );
                        break;
                    case 3:
                        this.super = new superClass( args[0], args[1], args[2] );
                        break;
                    default:
                        this.super = new superClass();
                        break;
                }

            } else {
                this.super = superClass;
            }

            !this.eventNs && (this.eventNs = '.Player' + uuid++);

            init.apply(this, arguments);
        }

        klass.superClass = superClass;

        if ( typeof superClass === 'function' ) {
            klass.prototype = Object.create( superClass.prototype );
        } else {
            P.object.extend( klass.prototype, superClass );
        }
       
        klass.prototype.constructor = superClass;

        P.object.extend( klass.prototype, object );

        return klass;
    }


})();
