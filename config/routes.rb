Rails.application.routes.draw do
  require 'sidekiq/web'
  require 'sidekiq/cron/web'
  mount Sidekiq::Web => '/sidekiq'

  devise_for :users, controllers: { registrations: "registrations", omniauth_callbacks: "callbacks" }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :quizzes

  resources :users do
    resources :interests
  end

  resources :terms
  resources :privacy

  namespace :api do
    namespace :v1 do
      resources :users do
        resources :interests
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :users do
        resources :favorite_categories
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :users do
        resources :scores
      end
    end
  end

  root 'quizzes#index'
end
