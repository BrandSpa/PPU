Rails.application.routes.draw do
  devise_for :users
  scope "(:locale)", locale: /en/ do
    namespace :api do 
      resources :lawyers
    end
  end
end
