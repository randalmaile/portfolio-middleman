require 'twitter'
module TwitterFeed
  class << self
    def registered(app)
      app.send :include, Helpers
    end
    alias :included :registered
  end

  module Helpers
    include Twitter::Autolink
    def tweet_news
      client = Twitter::REST::Client.new do |config|
        config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
        config.consumer_secret     = ENV['TWITTER_SECRET_KEY']
        config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
        config.access_token_secret = ENV['TWITTER_ACCESS_SECRET']
      end
      client.user_timeline("randalmaile", count: "4")
    end
  end
end

::Middleman::Extensions.register(:twitter_feed, TwitterFeed) 