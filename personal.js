module.exports = {
	
	// https://api.slack.com/apps
	slack : {
		token : "" ,
		default_channel : "" ,
		default_error_channel : undefined
	} ,

	// https://github.com/Chikachi/DiscordIntegration/wiki/How-to-get-a-token-and-channel-ID-for-Discord
	discord : {
		token : "" ,
		default_channel : "" ,
		default_error_channel : undefined
	} ,
	
	// https://developer.twitter.com/en/docs/basics/authentication/guides/access-tokens
	twitter : {
		username: "" ,
		creds: {
			consumer_key: "" ,
			consumer_secret: "" ,
			access_token_key: "" ,
			access_token_secret: ""
		}
	} ,
	
	// https://tinysubversions.com/notes/mastodon-bot/
	mastodon: {
		access_token: "" ,
		api_url: "" ,
		timeout_ms: 60000
	} ,

	// http://www.developerdrive.com/2014/05/how-to-get-started-with-the-tumblr-api-part-1/
	tumbler: {

	}

};