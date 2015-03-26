(function( ) {

    var VodPlayer = P.Class( {

        init : function( option ) {
            this.option = option;

            this.model = P.m.PrepModel( option );

            this.view = P.v.PrepView( this.model );
        }

    } );

    P.VodPlayer = VodPlayer;

})( );