Rails.application.routes.draw do
  namespace :api do 
    resources :lawyers
    resources :categories
    resources :trades
  end

  scope "(:locale)", locale: /es|en/ do
    get "abogados", to: 'lawyers#index'
    get "lawyers", to: 'lawyers#index'
    get "crear-abogado", to: 'admin/lawyers#index'
    get "terminar-abogado/:id", to: 'admin/lawyers#index'
    get "lawyer-attach-img", to: 'admin/lawyers#attach_img'
  end

  

end
