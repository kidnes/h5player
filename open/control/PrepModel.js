(function ( ) {

    var br = P.m.br;

    function PrepModel( option ) {

        var model = P.object.extend( {}, option );;

        model.isH5 = (br.iphone || br.ipad || br.android || br.ipod || br.wph || br.ps);
        model.isPC = br.mac && ( br.safari || br.chrome ); //mac已放弃flash，默认使用h5

        //解析配置参数
        !model.type && (model.type = 'vod');

        model.autoload = model.autoload != 0;
        model.autoplay = model.autoplay != 0;

        return model;
    }

    P.m.PrepModel = PrepModel;

})( );