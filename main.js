function REGISTER_CLIENT_BY_NAME( wClientName ) {
	return new Promise( function( resolve , reject ) {
		try {
			console.log( "this is by name --> " + wClientName );
			resolve();
		}
		catch( error ) { console.log( error ); reject( error ); }
	});
}

function REGISTER_CLIENTS_FROM_FILE( wFilePath ) {
	var that = this;
	return new Promise( async function( resolve , reject ) {
		try {
			const wClientData = require( wFilePath );
			if ( !wClientData ) { resolve( "nothing here" ); return; }
			if ( wClientData[ "slack" ] ) { 
				var wSM = await require( "./platforms/slack.js" ).init( wClientData[ "slack" ] );
				that.clients.push( wSM );
			}
			if ( wClientData[ "discord" ] ) { 
				var wDM = await require( "./platforms/discord.js" ).init( wClientData[ "discord" ] ); 
				that.clients.push( wDM ); 
			}
			if ( wClientData[ "twitter" ] ) { 
				var wTM = await require( "./platforms/twitter.js" ).init( wClientData[ "twitter" ] );
				that.clients.push( wTM );
			}
			if ( wClientData[ "mastodon" ] ) { 
				var wMM = await require( "./platforms/mastodon.js" ).init( wClientData[ "mastodon" ] ); 
				that.clients.push( wMM ); 
			}
			resolve();
		}
		catch( error ) { console.log( error ); reject( error ); }
	});
}

function POST( wMessage ) {
	const clients = this.clients;
	return new Promise( async function( resolve , reject ) {
		try {
			for ( var i = 0; i < clients.length; ++i ) {
				try { await clients[ i ].post( clients[ i ] ,  wMessage ); }
				catch( e ) { /*console.log( e ); */ }
			}
			resolve();
		}
		catch( error ) { console.log( error ); reject( error ); }
	});
}

function POST_ERROR( wMessage ) {
	return new Promise( async function( resolve , reject ) {
		try {
			for ( var xClient in clients ) {
				try { await clients[ xClient ][ "client" ].postError( wMessage ); }
				catch( e ) { /*console.log( e ); */ }
			}
			resolve();
		}
		catch( error ) { console.log( error ); reject( error ); }
	});
}

function LOAD() {
	return {
		clients: [] ,
		registerClientByName:  REGISTER_CLIENT_BY_NAME , 
		registerClientsByFile: REGISTER_CLIENTS_FROM_FILE ,
		post: POST ,
		postError: POST_ERROR
	};
}
module.exports = LOAD;