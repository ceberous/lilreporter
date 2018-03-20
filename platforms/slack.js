const Slack = require( "slack" );

function POST ( wClient , wMessage , wChannel ) {
	return new Promise( async function( resolve , reject ) {
		try {
			console.log( "slack.js --> post()" );
			if ( !wClient.connection ) { resolve( "slack not connected" ); return; }
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
			console.log( "slack.js --> init() " );
			if ( !wClientPersonal.token ) { resolve( "no token" ); return; }
			const xtk1 = wClientPersonal.token;
			var wOBJ = {
				name: "slack" ,
				token:  xtk1 ,
				default_channel: wClientPersonal.default_channel ,
				default_error_channel: wClientPersonal.default_error_channel ,
				connection: null ,
				active: false ,
				post: POST ,
			};
			wOBJ[ "connection" ] = await new Slack( { xtk1 } );
			wOBJ[ "active" ] = true;
			resolve( wOBJ );
		}
		catch( error ) { console.log( error ); reject( error ); }
	});
}
module.exports.init = INIT;