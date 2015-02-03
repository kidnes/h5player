/**
 *  声明 日志 操作相关
 */
(function() {
    P.log = {
        log : function( info ) { },
        
        showLog : function( info ) {
            console.log( [ '[', this._getTimeStr(), '] ',  info ].join('') );        
        },

        _getTimeStr : function() {

            var d = new Date();
            var timeStr = d.getFullYear() + "-" + String(d.getMonth() + 1) + "-" + d.getDate() + " ";
            timeStr += d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            return timeStr;
        }
    }
})();
