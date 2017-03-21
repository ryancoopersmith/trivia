Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :quizzes do
    resources :questions
  end

  resources :interests

  root 'quizzes#index'
end
