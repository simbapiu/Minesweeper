Rails.application.routes.draw do
  get 'pages/index'
  namespace :api do
    resources :games
  end
  root to: 'pages#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
