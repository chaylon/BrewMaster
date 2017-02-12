Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' }

  resources :lists
  resources :beers, only: [:index, :show]
  resources :users, only: [:show]

  authenticated :user do
    root 'beers#index'
  end
  get '/home' => 'homes#index'
  root 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :users
      resources :beers do
        resources :ratings
        collection do
          get 'filter'
        end
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
