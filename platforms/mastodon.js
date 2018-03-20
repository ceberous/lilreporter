const Masto = require( "mastodon" );

function POST ( wClient , wMessage , wChannel ) {
	return new Promise( async function( resolve , reject ) {
		try {
			console.log( "mastodon.js --> post()" );
			if ( !wClient.connection ) { resolve( "nastodon not connected" ); return; }
			wChannel = wChannel || wClient.default_channel;
			await wClient.connection.chat.postMessage( { token: wClient.token , channel: wChannel , text: wMessage  } );
			resolve();
		}
		catch( error ) { console.log( error ); reject( error ); }
	});
}
module.exports.post = POST;


function INIT( wClientPersonal ) {
	return new Promise( async function( resolve , reject ) {
		try {
			console.log( "mastodon.js --> init() " );
			if ( !wClientPersonal.access_token ) { resolve( "no access token" ); return; }
			var wOBJ = {
				name: "mastodon" ,
				creds:  wClientPersonal ,
				connection: null ,
				active: false ,
				post: POST ,
			};
			wOBJ[ "connection" ] = await new Masto( wClientPersonal );
			wOBJ[ "active" ] = true;
			resolve( wOBJ );
		}
		catch( error ) { console.log( error ); reject( error ); }
	});
}
module.exports.init = INIT;