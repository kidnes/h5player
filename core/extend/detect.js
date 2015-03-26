(function() {
    var ua = navigator.userAgent.toLowerCase();
    var browser = {
        iphone:/iphone/.test( ua ),
        ipad : /ipad/.test( ua ),
        ipod : /ipod/.test( ua ),
        mac : /macintosh/.test( ua ),
        letv : /letv/.test( ua ),
        android : /android/.test( ua ),
        atwin: /win/.test( ua ),
        opera: /opera/.test( ua ),
        msie: /msie/.test( ua ),
        firefox: /firefox/.test( ua ),
        safari: /safari/.test( ua ) && !/chrome/.test( ua ),
        chrome: /chrome/.test( ua ),
        wph: /windows phone/.test( ua ),
        ps: /playstation/.test( ua ),
        uc: /ucbrowser|ucweb/.test( ua ),
        qq: /mqqbrowser/.test( ua ),
        xiaomi : /xiaomi/.test( ua ),
        weixin : /micromessenger/i.test( ua )
    }

    P.m.br = browser;
})();