Rails.application.routes.draw do
  devise_for :users

  resources :lists
  resources :beers, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :lists do
        resources :beers do
          post '/add' => 'lists#add', as: :add
        end
      end
      resources :beers
      resources :users
    end
  end

  root 'users#show'
end
