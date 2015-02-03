(function ( ) {

    function PrepModel( option ) {

        var model = { };

        P.object.extend( model, option );

        return model;
    }

    P.m.PrepModel = PrepModel;

})( );