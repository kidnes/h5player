/**
 * @file {Class} 准备显示层
 * @desc 重构UI层时，重写此类，监听全局的PrepView
 * @author liubin
 */
(function ( ) {

    function _initView( model ) {
        this.views = { };

        this.views.core = new P.v.CoreVideo( model );

        this.views.pannel = new P.v.PlayingPannel( model ) ;

        this.views.loading = new P.v.Loading( model );

        this.views.poster = new P.v.Poster( model );

        this.views.bigPlayBtn = new P.v.BigPlayBtn( model );

        this.views.btnPlay = new P.v.PlayBtn( model );

        this.views.btnFull = new P.v.FullBtn( model );

        this.views.bar = new P.v.ProgressBar( model, this.views.core );

        this.views.app = new P.v.Application( this.views );

    }

    function _render( model ) {
        var tag, id = model.cont;

        if ( !/^#/.test(id) ) id = '#'+id;
        tag = P.$( id );

        if ( !tag || !tag.length || !tag[0].nodeName ) {
            throw new TypeError('The element or ID supplied is not valid.');
        }

        var tpl = P.tpl.opentpl.replace(/{cont}/g, id);

        tag[0].innerHTML = tpl;

        model.parentEl = tag.find('.hv_box');

        return tag[0];
    }

    // function _loadCss() {
    //     var tag = P.$( 'h5style' );

    //     if ( tag && tag.length > 0 ) return;

    //     var head = document.head,
    //         node = document.createElement( 'style' );


    //     node.setAttribute( "type", "text/css" );
    //     node.setAttribute( "id", "h5style" );

    //     node.innerHTML = P.tpl.opencss;

    //     head.appendChild( node );
    // }

    function _loadCss() {
        var tag = P.$( 'h5style' );

        if ( tag && tag.length > 0 ) return;

        var head = document.head,
            node = document.createElement( 'link' );


        node.setAttribute( "rel", "stylesheet" );
        node.setAttribute( "id", "h5style" );
        node.setAttribute( "href", "../open/surface/h5player.css" );

        head.appendChild( node );
    }

    var PrepView = P.Class( {
        init : function( model ) {
            console.log('onPrepView', model);

            _render( model );

            _loadCss();

            _initView( model );
        }
    } );

    P.v.PrepView = PrepView;
    
})( );