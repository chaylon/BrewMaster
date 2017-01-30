Rails.application.routes.draw do
  devise_for :users

  resources :lists

  namespace :api do
    namespace :v1 do
      resources :lists
    end
  end
  root 'users#show'
end
