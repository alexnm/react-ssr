require( "babel-register" )( {
    presets: [ "env" ],
    plugins: [
        [
            "css-modules-transform",
            {
                camelCase: true,
                extensions: [ ".css", ".scss" ],
            },
        ],
        "dynamic-import-node",
    ],
} );
console.log('clone testing')
require( "./src/server" );
