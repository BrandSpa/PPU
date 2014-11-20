Rails.application.routes.draw do
  scope "(:locale)", locale: /en/ do
    namespace :api do 
      resources :lawyers
      resources :categories
      resources :trades
    end
  end

  get "abogados", to: 'lawyers#index'
end
