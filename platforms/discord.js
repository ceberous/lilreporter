const Eris = require( "eris" );
const BaseReporter = require( "./BaseReporter.js" );

class DiscordReporter extends BaseReporter {
	
	constructor( wConfigOBJ ) {
		super();
		this.config = wConfigOBJ;
		console.log( this.config );
		this.client = undefined;
	}

	async init() {
		let that = this;
		return new Promise( async function( resolve , reject ) {
			try {
				that.client = new Eris( that.config.token );
				await that.client.connect();
				await that.sleep( 2000 );
				resolve();
			}
			catch( error ) { console.log( error ); reject( error ); }
		});
	}

	quit() { this.client.disconnect(); }

	error( wMessage , wChannel ) {
		let that = this;
		return new Promise( async function( resolve , reject ) {
			try {
				if ( !that.client ) { resolve( "discord not connected" ); return; }
				console.log( "discord.js --> post()" );
				if ( !wChannel ) {
					if ( !that.config.channels.error ) { wChannel = that.config.channels.default; }
					else { wChannel = that.config.channels.error; }
				}
				else { wChannel = that.config.channels.error; }
				await that.client.createMessage( wChannel , wMessage );
				resolve();
			}
			catch( error ) { console.log( error ); reject( error ); }
		});
	}

	log( wMessage , wChannel ) {
		let that = this;
		return new Promise( async function( resolve , reject ) {
			try {
				if ( !that.client ) { resolve( "discord not connected" ); return; }
				console.log( "discord.js --> post()" );
				if ( !wChannel ) {
					if ( !that.config.channels.log ) { wChannel = that.config.channels.default; }
					else { wChannel = that.config.channels.log; }
				}
				else { wChannel = that.config.channels.log; }
				await that.client.createMessage( wChannel , wMessage );
				resolve();
			}
			catch( error ) { console.log( error ); reject( error ); }
		});
	}

	post( wMessage , wChannel ) {
		let that = this;
		return new Promise( async function( resolve , reject ) {
			try {
				if ( !that.client ) { resolve( "discord not connected" ); return; }
				console.log( "discord.js --> post()" );
				wChannel = wChannel || that.config.channels.default;
				await that.client.createMessage( wChannel , wMessage );
				resolve();
			}
			catch( error ) { console.log( error ); reject( error ); }
		});
	}

}
module.exports = DiscordReporter;