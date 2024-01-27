Rails.application.routes.draw do
  resources :pages, only: [:index]

  root "results#index"

  defaults format: :turbo_stream do
    resources :results, only: [:create]
    resources :selected_events, only: [:update]
  end
  resources :pages, only: [:index]
  devise_for :users, controllers: { registrations: "users/registrations", sessions: "users/sessions" }
end
