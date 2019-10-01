Rails.application.routes.draw do
  resources :cards
  resources :decks
  resources :users
  resources :sessions, only: [:index, :new, :create, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
