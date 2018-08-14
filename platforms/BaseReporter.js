class BaseReporter {
	
	constructor() {
		//
	}

	sleep( ms ) { return new Promise( function( resolve ) { setTimeout( resolve , ms ) } ); }

}


module.exports = BaseReporter;