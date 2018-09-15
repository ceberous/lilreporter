const DiscordReporter = require( "./platforms/discord.js" );
const MastodonReporter = require( "./platforms/mastodon.js" );
class LilReporterBase {
	
	constructor( wConfigOBJ ) {
		this.clients = [];
		this.config = wConfigOBJ;
	}

	async init() {
		let that = this;
		return new Promise( async function( resolve , reject ) {
			try {
				if ( !that.config ) { resolve( "nothing here" ); return; }
				// if ( that.config[ "slack" ] ) { 
				// 	let wSM = await require( "./platforms/slack.js" ).init( that.config[ "slack" ] );
				// 	that.clients.push( wSM );
				// }
				if ( that.config[ "discord" ] ) { 
					let wDM = new DiscordReporter( that.config[ "discord" ] );
					await wDM.init();
					that.clients.push( wDM ); 
				}
				// if ( that.config[ "twitter" ] ) { 
				// 	let wTM = await require( "./platforms/twitter.js" ).init( that.config[ "twitter" ] );
				// 	that.clients.push( wTM );
				// }
				if ( that.config[ "mastodon" ] ) { 
					let wMM = new MastodonReporter( that.config[ "mastodon" ] );
					await wMM.init();
					that.clients.push( wMM ); 
				}
				resolve();
			}
			catch( error ) { console.log( error ); reject( error ); }
		});
	}

	error( wMessage ) {
		if ( !wMessage ) { console.trace(); console.log( "Blank Message" ); return; }
		if ( typeof wMessage !== "string" ) { console.trace(); console.log( "Blank Message" ); return; }
		if ( wMessage.length < 1 ) { console.trace(); console.log( "Blank Message" ); return; }
		let that = this;
		return new Promise( async function( resolve , reject ) {
			try {
				for ( var i = 0; i < that.clients.length; ++i ) {
					try { await that.clients[ i ].error( that.clients[ i ] ,  wMessage ); }
					catch( e ) { /*console.log( e ); */ }
				}
				resolve();
			}
			catch( error ) { console.log( error ); reject( error ); }
		});
	}

	log( wMessage ) {
		if ( !wMessage ) { console.trace(); console.log( "Blank Message" ); return; }
		if ( typeof wMessage !== "string" ) { console.trace(); console.log( "Blank Message" ); return; }
		if ( wMessage.length < 1 ) { console.trace(); console.log( "Blank Message" ); return; }		
		let that = this;
		return new Promise( async function( resolve , reject ) {
			try {
				for ( var i = 0; i < that.clients.length; ++i ) {
					try { await that.clients[ i ].log( wMessage ); }
					catch( e ) { /*console.log( e ); */ }
				}
				resolve();
			}
			catch( error ) { console.log( error ); reject( error ); }
		});
	}

	post( wMessage ) {
		if ( !wMessage ) { console.trace(); console.log( "Blank Message" ); return; }
		if ( typeof wMessage !== "string" ) { console.trace(); console.log( "Blank Message" ); return; }
		if ( wMessage.length < 1 ) { console.trace(); console.log( "Blank Message" ); return; }		
		let that = this;
		return new Promise( async function( resolve , reject ) {
			try {
				for ( var i = 0; i < that.clients.length; ++i ) {
					try { await that.clients[ i ].post( wMessage ); }
					catch( e ) { /*console.log( e ); */ }
				}
				resolve();
			}
			catch( error ) { console.log( error ); reject( error ); }
		});
	}	

}
module.exports = LilReporterBase;