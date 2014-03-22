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
        config.consumer_key        = "O6NSQqC02XkT03Iq7QD29A"
        config.consumer_secret     = "5QqjCdWauX8b8doiKdWfeKyWVFzB5TVlQJY34tNH3w"
        config.access_token        = "7834272-MnXVjCGTsgzarZDpl2yaJkHRey20boAmUfWzAm9qFY"
        config.access_token_secret = "sN61VoAnq2d4cfFwtS88b2XlyH7XHxo7YbYCwau6Umb4Q"
      end
      client
    end
  end
end

::Middleman::Extensions.register(:twitter_feed, TwitterFeed) 
