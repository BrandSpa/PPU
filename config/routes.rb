Rails.application.routes.draw do
  devise_for :users

  namespace :api do 
    resources :lawyers
    resources :academics
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
    resources :posts
    resources :post_images
    resources :galleries
  end
  
  get "", to: 'posts#index'

  scope "(:locale)", locale: /en/ do
    get "abogados/", to: 'lawyers#index'
    get "abogados/:name", to: 'lawyers#show'
    get "abogados/:id/vcard", to: 'lawyers#vcard'
    get "lawyers", to: 'lawyers#index'
    get "crear-abogado", to: 'admin/lawyers#index'
    get "editar-abogado/:slug", to: 'admin/lawyers#index'
    get "edit-lawyer/:username", to: 'admin/lawyers#index'
    namespace :admin do 
      resources :posts
    end
  end

  get "dashboard", to: 'admin/lawyers#dashboard'

end
