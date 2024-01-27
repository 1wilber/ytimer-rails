source "https://rubygems.org"

ruby "3.3.0"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.1.3"

gem "pg"

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem "sprockets-rails"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"

# Use JavaScript with ESM import maps [https://github.com/rails/importmap-rails]
gem "importmap-rails"

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails"

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "stimulus-rails"

# Bundle and process CSS [https://github.com/rails/cssbundling-rails]
gem "cssbundling-rails"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[windows jruby]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

group :development, :test do
  gem "byebug"
  gem "debug", platforms: %i[mri windows]
  gem "solargraph", require: false
  gem "standardrb", require: false
  gem "rufo", require: false
  gem "factory_bot_rails"
  gem "ffaker"
end

group :test do
  gem "database_cleaner-active_record"
  gem "rspec-rails"
  gem "shoulda-matchers"
end

group :development do
  gem "web-console"
end

# default template engine
gem "haml-rails"

# rails internationalization support
gem "rails-i18n"

# custom flash messages
gem "responders"

# better form builder
gem "simple_form"

# authentication
gem "devise"

gem "devise-i18n"

gem "scrambler"
