Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :quizzes

  resources :users do
    resources :interests
  end

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
