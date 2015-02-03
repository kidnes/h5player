/**
 * @file Event相关，参考GMU事件实现
 * @import core/base/event.js
 * @module P.Event
 * @description event对象，包含一套event操作方法。
 *
 * 技术点：
 * 1、每个播放器内绑定一个事件命名空间，事件在同一播放器可任意发送和监听；
 * 2、事件保存在object内，没有使用GMU的数组，提高事件查找效率；
 * 3、事件删除时，没有更新长度，为了对应事件的ID，同时减少操作；
 *
 */
(function() {

    var slice = [].slice,
        separator = /\s+/,
        _events = {};

    function eachEvent( events, callback, iterator ) {

        (events || '').split( separator ).forEach(function( type ) {
            iterator( type, callback );
        });
    }

    function parse( name, ns ) {

        if ( ns ) return {
            e: name,
            ns: ns
        }

        var parts = ('' + name).split( '.' );

        return {
            e: parts[ 0 ],
            ns: parts.length > 1 ? parts[1] : 'ns'
        };
    }

    function findHandlers( arr, name, callback, context ) {

        return arr.filter(function( handler ) {
            return handler &&
                    (handler.e === name) &&
                    (!callback || handler.cb === callback) &&
                    (!context || handler.ctx === context);
        });
    }

    //扩展自定义事件
    var evt = {
        on: function( name, callback, context ) {
            var me = this,
                parts = parse( name, this.eventNs ),
                ns = _events[ parts.ns ] || ( _events[ parts.ns ] = {} );

            if ( !callback ) {
                return this;
            }

            eachEvent( parts.e, callback, function( name, callback ) {
                !ns[ name ] && ( ns[ name ] = [ ] );

                var handler = { e : name };

                handler.cb = callback;
                handler.ctx = context;
                handler.ctx2 = context || me;
                handler.id = ns[ name ].length;
                ns[ name ].push( handler );
            } );

            return this;
        },

        one: function( name, callback, context ) {
            var me = this;

            if ( !callback ) {
                return this;
            }

            eachEvent( name, callback, function( name, callback ) {
                var once = function() {
                        me.off( name, once );
                        return callback.apply( context || me, arguments );
                    };

                once._cb = callback;
                me.on( name, once, context );
            } );

            return this;
        },

        off: function( name, callback, context ) {
            var events,
                parts = parse( name, this.eventNs ),
                ns = _events[ parts.ns ];

            if ( !ns ) return this;

            if ( !name && !callback && !context ) {
                return this;
            }

            eachEvent( parts.e, callback, function( name, callback ) {
                if ( !ns[ name ] ) return;

                events = ns[ name ];

                findHandlers( events, name, callback, context )
                        .forEach(function( handler ) {
                            delete events[ handler.id ];
                        });
            } );

            return this;
        },

        fire: function( name ) {
            var i = -1,
                parts = parse( name, this.eventNs ),
                ns = _events[ parts.ns ],
                events,
                data,
                evt = { type : parts.e },
                ev,
                len;

            if ( !ns || !ns[ name ] || !ns[ name ].length) return this;

            data = slice.call( arguments, 1 );
            data.length === 1 && (data = data[0]);

            evt.data = data;    // handler中可以直接通过e.data获取数据

            events = ns[ name ];

            if ( events ) {
                len = events.length;

                while ( ++i < len ) {
                    if ( ( ev = events[ i ] ) &&  false === ev.cb.call( ev.ctx2, evt ) ) {
                        break;
                    }
                }
            }

            return this;
        }
    };

    P.Event = evt;
    
})();