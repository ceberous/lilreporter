const twitter = require( "ntwitter" );

function POST ( wClient , wMessage ) {
	return new Promise( function( resolve , reject ) {
		try {
			console.log( "twitter.js --> post()" );
			wClient.connection.updateStatus( wMessage , function ( err , data ) {
				resolve();
			});
		}
		catch( error ) { console.log( error ); reject( error ); }
	});
}
module.exports.post = POST;

function INIT( wClientPersonal ) {
	return new Promise( async function( resolve , reject ) {
		try {
			console.log( "twitter.js --> init() " );
			if ( !wClientPersonal.creds ) { resolve( "no creds" ); return; }
			var wOBJ = {
				name: "twitter" ,
				username: wClientPersonal.username ,
				creds:  wClientPersonal.creds ,
				connection: null ,
				active: false ,
				post: POST ,
			};
			wOBJ[ "connection" ] = await new twitter( wOBJ[ "creds" ] );
			wOBJ[ "active" ] = true;
			resolve( wOBJ );
		}
		catch( error ) { console.log( error ); reject( error ); }
	});
}
module.exports.init = INIT;