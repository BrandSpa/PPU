Rails.application.routes.draw do
  devise_for :users

  namespace :api do 
    resources :lawyers
    resources :categories
    resources :trades
    resources :posts
    resources :galleries
    resources :experiences
    
    namespace :lawyrs do 
      resources :academics
      resources :articles
      resources :awards
      resources :educations
      resources :institutions
      resources :jobs
      resources :languages
      resources :pharases
      resources :recognitions
    end
  end
  
  get "", to: 'pages#landing'
  

  scope "(:locale)", locale: /en|es/ do
    get "abogados/", to: 'lawyers#index'
    get "abogados/:slug", to: 'lawyers#show'
    get "abogados/:id/vcard", to: 'lawyers#vcard'
    get "lawyers", to: 'lawyers#index'
    get "crear-abogado", to: redirect('/admin/lawyers/new')
    get "editar-abogado/:slug", to: 'admin/lawyers#index'
    get "edit-lawyer/:username", to: 'admin/lawyers#index'

    resources :posts

    get "areas", to: 'categories#index'
    get "areas/:name", to: 'categories#show'

    get "/nosotros", to: 'pages#us'
    get "/probono", to: 'pages#pro_bono'

    namespace :admin do 
      resources :posts
      resources :lawyers
      resources :experiences
    end
  end

  get "dashboard", to: 'admin/lawyers#dashboard'

end
