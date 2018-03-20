const Eris = require( "eris" );

function POST ( wClient , wMessage , wChannel ) {
	return new Promise( async function( resolve , reject ) {
		try {
			console.log( "discord.js --> post()" );
			if ( !wClient.connection ) { resolve( "discord not connected" ); return; }
			wChannel = wChannel || wClient.default_channel;
			await wClient.connection.createMessage( wChannel , wMessage );
			resolve();
		}
		catch( error ) { console.log( error ); reject( error ); }
	});
}
module.exports.post = POST;

function INIT( wClientPersonal ) {
	return new Promise( async function( resolve , reject ) {
		try {
			console.log( "discord.js --> init() " );
			if ( !wClientPersonal ) { resolve( "no token" ); return; }
			var wOBJ = {
				name: "discord" ,
				token:  wClientPersonal.token ,
				default_channel: wClientPersonal.default_channel ,
				default_error_channel: wClientPersonal.default_error_channel ,
				connection: null ,
				active: false ,
				post: POST ,
			};
			wOBJ[ "connection" ] = await new Eris( wClientPersonal.token );
			await wOBJ[ "connection" ].connect();
			wOBJ[ "connection" ].on( "ready" , () => {
				wOBJ[ "active" ] = true;
				resolve( wOBJ );
			});
		}
		catch( error ) { console.log( error ); reject( error ); }
	});
}
module.exports.init = INIT;