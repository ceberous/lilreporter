module.exports = {
	
	slack : {
		token : "" ,
		default_channel : "" ,
		default_error_channel : undefined
	} ,

	discord : {
		token : "" ,
		default_channel : "" ,
		default_error_channel : undefined
	} ,
	
	twitter : {
		username: "" ,
		creds: {
			consumer_key: "" ,
			consumer_secret: "" ,
			access_token_key: "" ,
			access_token_secret: ""
		}
	} ,
	
	mastodon: {
		access_token: "" ,
		api_url: "" ,
		timeout_ms: 60000
	}

};