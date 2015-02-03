/**
 * @file 声明选择器命名空间
 * @desc 实现DOM选择器
 * @namespace base.selector
 * @author liubin
 */

(function() {

    var undefined, filter = [].filter, slice = [].slice,
        class2type = {},
        classSelectorRE = /^\.([\w-]+)$/,
        idSelectorRE = /^#([\w-]*)$/,
        tagSelectorRE = /^[\w-]+$/;

    /**
     *  @desc Q.$框架入口，实现DOM选择器
     *
     */
    var $ = function(selector, context) {
        return new $.fn.init(selector, context);
    }

    var qsa = function(element, selector) {
        var found
        try{
        return (isDocument(element) && idSelectorRE.test(selector)) ?
            ((found = element.getElementById(RegExp.$1)) ? [found] : []) :
            (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
            slice.call(
                classSelectorRE.test(selector) ? (
                    element.getElementsByClassName ? element.getElementsByClassName(RegExp.$1) : qsc(element, RegExp.$1) ) :
                tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) :
                element.querySelectorAll(selector)
        )}
        catch(e){return []}
    }

    var Z = function(me, dom, selector) {
        dom = dom || []
        me.selector = selector || ''
        me.length = dom.length
        for (var i=0, j=dom.length; i<j; i++) {
            me[i] = dom[i];
        }
        return me
    }

    var isZ = function(object) {
        return object instanceof Z
    }

    var qsc = function(parent, id) {
        if (parent.getElementsByTagName) {
            var el = parent.getElementsByTagName('*');
            var pattern = new RegExp("(^|\\s)" + id + "(\\s|$)");
            for(var i=0,j=el.length; i<j; i++){
                if(pattern.test(el[i].className)){
                    return [el[i]];
                }
            }
        }
        return [];
    }

    $.fn = {
        init: function(selector, context) {
            if (!selector) return Z(this);
            else if(selector.nodeType) return Z(this, [selector])
            else {
                var dom
                if (isArray(selector)) dom = compact(selector)
                else if (context !== undefined) return $(context).find(selector)
                else dom = qsa(document, selector)
                return Z(this, dom, selector);
            }
        },
        find: function(selector) {
            var result, me = this;
            if (typeof selector == 'object')
                result = $(selector).filter(function() {
                    var node = this
                    return [].some.call(me, function(parent) {
                        return $.contains(parent, node)
                    })
                })
            else if (this.length == 1) result = $(qsa(this[0], selector))
            else result = this.map(function() {
                return qsa(this, selector)
            })
            return result
        },
        each: function(callback){
            if([].every){
                [].every.call(this, function(el, idx) {
                    return callback.call(el, idx, el) !== false
                });
            }else{
                for(var i= 0,len=this.length;i<len;i++){
                    callback.call(this[i],i,this[i]);
                }
            }

            return this
        },
        hasClass: function(name){
            var me = this[0];
            return new RegExp('(\\s|^)'+name+'(\\s|$)').test(me.className);
        },
        addClass: function(name) {
            var classNameArray = (name || '').split(/\s+/);
            return this.each(function(){
                var currClassName = this.className;
                for(var i = 0, len = classNameArray.length; i < len; i++){
                    if (!$(this).hasClass(classNameArray[i])){
                        currClassName += ' ' + classNameArray[i];
                    }
                }
                this.className = currClassName;
            });
        },
        removeClass: function(name) {
            var classNameArray = (name || '').split(/\s+/);
            return this.each(function() {
                var currClassName = this.className;
                for(var i = 0, len = classNameArray.length; i < len; i++){
                    var reg = new RegExp('(\\s|^)' + classNameArray[i] + '(\\s|$)');
                    currClassName = currClassName.replace(reg,' ');
                }

                this.className = $.trim(currClassName);
            })
        },
        on: function( name, callback, context ) {
            return this.each(function(i, element) {
                eachEvent( name, callback, function(name, callback) {
                    var evtDelagate = function(e) {
                        e.target = e.target || e.srcElement;
                        callback.call(context, e)
                    }
                    if (!element['domid']) element['domid'] = String(Math.random()).slice(-4);
                    var guid = name+'_'+element['domid'];
                    callback[guid] = evtDelagate;


                    if(element.addEventListener){
                        element.addEventListener(name, evtDelagate, false);
                    }else if(element.attachEvent){
                        element.attachEvent('on' + name,evtDelagate);
                    }
                });
            });
        },
        off: function( name, callback, context ) {
            return this.each(function(i, element) {
                eachEvent( name, callback, function(name, callback) {
                    var guid = name+'_'+element['domid'],
                        fn = callback[guid] || callback;

                    if(element.removeEventListener){
                        element.removeEventListener(name, fn, false);
                    }else if(element.detachEvent){
                        element.detachEvent('on' + name, fn);
                    }
                });
            });
        },
        offset : function(){
            var box = this[0].getBoundingClientRect();

            return {
                top: box.top + window.pageXOffset,
                left: box.left + window.pageYOffset,
                width: box.width,
                height: box.height
            };
        }
    }

    $.fn.init.prototype = $.fn;

    function isDocument(obj) {
        return obj != null && (obj.nodeType == 9 || obj.nodeType == obj.DOCUMENT_NODE)
    }

    function isArray(value) {
        return value instanceof Array
    }

    function compact(array) {
        return filter.call(array, function(item) {
            return item != null
        })
    }

    function eachEvent( events, callback, iterator ) {
        (events || '').split( /\s+/ ).forEach(function( type ) {
            iterator( type, callback );
        });
    }

    function className(node, value) {
        var klass = node.className,
            svg = klass && klass.baseVal !== undefined

        if (value === undefined) return svg ? klass.baseVal : klass
        svg ? (klass.baseVal = value) : (node.className = value)
    }

    $.contains = function(parent, node) {
        return parent !== node && parent.contains(node)
    }

    $.trim = function( str ){
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    P.$ = $;
})();