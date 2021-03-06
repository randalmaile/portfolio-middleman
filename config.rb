require "lib/twitter_feed"

###
# Global settings
##
activate :directory_indexes
activate :twitter_feed
activate :dotenv
activate :minify_html
###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###


# Automatic image dimensions on image_tag helper
activate :automatic_image_sizes

# Reload the browser automatically whenever files change
set :file_watcher_ignore, [
    /^\.idea\//,
    /^\.bundle\//,
    /^\.sass-cache\//,
    /^\.git\//,
    /^\.gitignore$/,
    /\.DS_Store/,
    /^build\//,
    /^\.rbenv-.*$/,
    /^Gemfile$/,
    /^Gemfile\.lock$/,
    /~$/,
    /(^|\/)\.?#/
]
activate :livereload

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :tumblr_api_key, ENV['TUMBLR_API_KEY']

set :tumblr_hostname, ENV['TUMBLR_HOSTNAME']

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  
  # activate :imageoptim 

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # pre-gzip files
  activate :gzip, :exts => %w(.js .css .html .htm .json .rss .xml)

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_path, "/Content/images/"
end
