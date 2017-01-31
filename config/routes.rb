Rails.application.routes.draw do
  devise_for :users

  resources :lists

  resources :beers, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :lists
      resources :beers
      resources :users
    end
  end
  root 'users#show'
end
