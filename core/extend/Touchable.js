(function(_super) {

    var Touchable = P.Class('Touchable', {
        init: function( node, option ) {
            this.inDoubleTap = false;
            this.isOneFingerGesture = false;
            this.doubleTapTimer = null;
            this.longTapTimer = null;

            option = option || {};

            this.node = option.isTargetNode ? node : P.$(document);

            node.on( 'mousedown', this.touchStart, this );
        
            node.on( 'touchstart', this.touchStart, this );
        },

        touchStart: function( evt ) {
            var self = this;
            this.reset();

            if ( evt.touches ) {
                if (!evt.touches.length || this.isCurrentlyTouching) {
                    return false;
                }

                this.isCurrentlyTouching = true;

                this.isOneFingerGesture = evt.touches.length == 1;

                if (evt.touches.length == 1) {

                    this.startTouch.x = this.currentTouch.x = evt.touches[0].clientX;
                    this.startTouch.y = this.currentTouch.y = evt.touches[0].clientY;

                } else if (evt.touches.length > 1) {

                    var array = [];
                    for (var i = 0, len = evt.touches.length; i < len; i++) {
                        array.push(evt.touches[i]);
                    }
                    
                    array.sort( function (touch1, touch2){
                        return touch1.clientY - touch2.clientY;
                    });

                    var len = array.length - 1;
                    this.startTouch.x = this.currentTouch.x = array[len].clientX;
                    this.startTouch.y = this.currentTouch.y = array[len].clientY;
                }

                this.node.on('touchmove', this.touchMove, this);
                this.node.on('touchend', this.touchEnd, this);

            } else {

                this.startTouch.x = this.currentTouch.x = evt.pageX;
                this.startTouch.y = this.currentTouch.y = evt.pageY;
                this.node.on('mousemove', this.touchMove, this);
                this.node.on('mouseup', this.touchEnd, this);
            }

            this.target = evt.target;
            this.currentTarget = evt.currentTarget;
            this.hitTarget = document.elementFromPoint ? (document.elementFromPoint(this.startTouch.x, this.startTouch.y)) : null;

            //500毫秒内触发两次，发送double事件
            if (!this.inDoubleTap) {

                this.inDoubleTap = true;
                this.doubleTapTimer = setTimeout(function() {
                    self.inDoubleTap = false;

                }, 500);

            } else {

                this.fire('doubleTouch', this);
                clearTimeout(self.doubleTapTimer);
                this.inDoubleTap = false;
            }

            this.longTapTimer = setTimeout(function() {

                self.fire('longTouch', self);

            }, 1000);

            this.fire('touchstart', this, evt);
        },

        touchMove: function(evt) {

            this.previousTouch.x = this.currentTouch.x;
            this.previousTouch.y = this.currentTouch.y;

            if (evt.touches) {

                if (!evt.touches.length || !this.isOneFingerGesture) return;

                if (evt.touches.length > 1) {
                    this.isOneFingerGesture = false;
                    return;
                }

                this.currentTouch.x = evt.touches[0].clientX;
                this.currentTouch.y = evt.touches[0].clientY;

            } else {

                this.currentTouch.x = evt.pageX;
                this.currentTouch.y = evt.pageY;
            }

            this.currentDelta.x = this.currentTouch.x - this.previousTouch.x;
            this.currentDelta.y = this.currentTouch.y - this.previousTouch.y;
            this.currentStartDelta.x = this.currentTouch.x - this.startTouch.x;
            this.currentStartDelta.y = this.currentTouch.y - this.startTouch.y;

            this.target = evt.target;
            this.currentTarget = evt.currentTarget;

            this.fire('touchmove', this, evt);

            this.longTapTimer && clearTimeout(this.longTapTimer);

        },

        touchEnd: function(evt) {
            
            if (evt.touches) {

                if (evt.targetTouches.length) return;

                this.node.off( 'touchmove', this.touchMove, this );
                this.node.off( 'touchend', this.touchEnd, this );

            } else {

                this.node.off( 'mousemove', this.touchMove, this );
                this.node.off( 'mouseup', this.touchEnd, this );
            }

            this.isCurrentlyTouching = false;
            
            this.longTapTimer && clearTimeout(this.longTapTimer);

            this.fire('touchend', this, evt);
        },

        reset: function() {

            this.startTouch = {
                x: 0,
                y: 0
            };
            this.currentTouch = {
                x: 0,
                y: 0
            };
            this.previousTouch = {
                x: 0,
                y: 0
            };
            this.currentDelta = {
                x: 0,
                y: 0
            };
            this.currentStartDelta = {
                x: 0,
                y: 0
            };
        }

    }, _super );

    P.m.Touchable = Touchable;

})( P.Event );