const Masto = require( "mastodon" );

const BaseReporter = require( "./BaseReporter.js" );
class MastodonReporter extends BaseReporter {
	
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
				if ( !that.config.access_token ) { reject( "no access token" ); return; }
				if ( !that.config.api_url ) { reject( "no api url" ); return; }
				that.client = new Masto({
					access_token: that.config.access_token ,
					timeout_ms: that.config.timeout_ms ,
					api_url: that.config.api_url
				});
				await that.sleep( 2000 );
				console.log( "Mastadon Client Ready" );
				resolve();
			}
			catch( error ) { console.log( error ); reject( error ); }
		});
	}

	quit() { /* this.client.disconnect(); */ }

	error( wMessage ) {
		let that = this;
		return new Promise( async function( resolve , reject ) {
			try {
				if ( !that.client ) { resolve( "mastodon not connected" ); return; }
				console.log( "mastodon.js --> error()" );
				await that.client.post( "statuses" , { status: wMessage });
				resolve();
				resolve();
			}
			catch( error ) { console.log( error ); reject( error ); }
		});
	}

	log( wMessage ) {
		let that = this;
		return new Promise( async function( resolve , reject ) {
			try {
				if ( !that.client ) { resolve( "mastodon not connected" ); return; }
				console.log( "mastodon.js --> log()" );
				await that.client.post( "statuses" , { status: wMessage });
				resolve();
				resolve();
			}
			catch( error ) { console.log( error ); reject( error ); }
		});
	}

	post( wMessage ) {
		let that = this;
		return new Promise( async function( resolve , reject ) {
			try {
				if ( !that.client ) { resolve( "mastodon not connected" ); return; }
				console.log( "mastodon.js --> post()" );
				await that.client.post( "statuses" , { status: wMessage });
				resolve();
			}
			catch( error ) { console.log( error ); reject( error ); }
		});
	}

}
module.exports = MastodonReporter;