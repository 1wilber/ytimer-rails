# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin "stimulus-toggle-util" # @0.4.1
pin_all_from "app/javascript/controllers", under: "controllers"
pin "stimulus" # @1.1.1
