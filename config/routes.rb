Rails.application.routes.draw do
  devise_for :users

  resources :lists
  resources :beers, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :beers
      resources :users
      resources :lists do
        resources :selections, only: [:create]
      end
    end
  end

  root 'users#show'
end
