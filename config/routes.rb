Rails.application.routes.draw do
  devise_for :users

  resources :lists
  resources :beers, only: [:index, :show]
  resources :users, only: [:show]

  get '/home' => 'homes#index'
  root 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :users
      resources :beers do
        resources :ratings
      end
      resources :lists do
        resources :selections, only: [:create, :destroy]
        resources :beers do
          resources :selections, only: [:index]
        end
      end
    end
  end

end
