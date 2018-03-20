module.exports = {
	
	slack : {
		token : "" ,
		default_channel : "" ,
		default_error_channel : ""
	} ,

	discord : {
		token : "" ,
		default_channel : "" ,
		default_error_channel : ""
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