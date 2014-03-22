require 'twitter'
module TwitterFeed
  class << self
    def registered(app)
      app.send :include, Helpers
    end
    alias :included :registered
  end

  module Helpers
    def client
      client = Twitter::REST::Client.new do |config|
        config.consumer_key        = "***REMOVED***"
        config.consumer_secret     = "***REMOVED***"
        config.access_token        = "***REMOVED***"
        config.access_token_secret = "***REMOVED***"
      end
      client
    end
  end
end

::Middleman::Extensions.register(:twitter_feed, TwitterFeed) 
