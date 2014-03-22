require 'tumblr_client'
module TumblrFeed
  class << self
    def registered(app)
      app.send :include, Helpers
    end
    alias :included :registered
  end

  module Helpers
    def client
      Tumblr.configure do |config|
        config.consumer_key = "Kn4ApAuZEtTi0Cv9PTcs8PmzUhJYguCK1QDaGbcQyCVMFisbp5"
        config.consumer_secret = "85VrHulCErqki2A1IlhhlvAm0vZCfRZ7onSeJhu9g1fjmgksxu"
        config.oauth_token = "Ouxv3X4kBCBHdTF4gMrMpC0MRgFXejKbsiM4M7K9tvUtZMrg3a"
        config.oauth_token_secret = "qMWKGS5GMxoPBK1gv80p49yW9UZMZHzmflPysnBfkOhTq7aH6T"
      end
      Tumblr::Client.new
    end

    def tumblr_info
      client.info
    end
  end
end

::Middleman::Extensions.register(:tumblr_feed, TumblrFeed) 