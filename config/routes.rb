Rails.application.routes.draw do
  devise_for :users

  namespace :api do 
    resources :lawyers
    resources :articles
    resources :awards
    resources :categories
    resources :educations
    resources :institutions
    resources :jobs
    resources :languages
    resources :pharases
    resources :recognitions
    resources :trades
  end
  
  get "", to: 'posts#index'

  scope "(:locale)", locale: /es|en/ do
    get "abogados", to: 'lawyers#index'
    get "lawyers", to: 'lawyers#index'
    get "crear-abogado", to: 'admin/lawyers#index'
    get "editar-abogado/:id", to: 'admin/lawyers#index'
  end

  get "dashboard", to: 'admin/lawyers#dashboard'
end
