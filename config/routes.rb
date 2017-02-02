Rails.application.routes.draw do
  devise_for :users

  resources :lists
  resources :beers, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :beers
      resources :users
      resources :lists do
        resources :selections, only: [:create, :destroy]
        resources :beers do
          resources :selections, only: [:index]
        end
      end
    end
  end

  root 'users#show'
end
