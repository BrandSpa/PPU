Rails.application.routes.draw do
  devise_for :users

  namespace :api do 
    resources :lawyers
    resources :educations
    resources :categories
    resources :trades
    post "lawyer-attach-img", to: 'lawyers#attach_img'
  end
  get "", to: 'posts#index'
  scope "(:locale)", locale: /es|en/ do
    get "abogados", to: 'lawyers#index'
    get "lawyers", to: 'lawyers#index'
    get "crear-abogado", to: 'admin/lawyers#index'
    get "terminar-abogado/:id", to: 'admin/lawyers#index'
  end

  get "dashboard", to: 'admin/lawyers#dashboard'
end
