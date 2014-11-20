Rails.application.routes.draw do
  namespace :api do 
    resources :lawyers
    resources :categories
    resources :trades
  end

  scope "(:locale)", locale: /es|en/ do
    get "abogados", to: 'lawyers#index'
    get "lawyers", to: 'lawyers#index'
  end
end
