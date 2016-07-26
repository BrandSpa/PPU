Rails.application.routes.draw do

  # devise route for users
  devise_for :users

  # api routes
  namespace :api do

    resources :lawyers do
      post "duplicate", on: :member

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

    resources :posts do
      post "duplicate", on: :member
      post "featured", on: :member
    end

    resources :experiences do
      post "duplicate", on: :member
    end

    resources :galleries

    resources :categories

    resources :trades

    resources :curriculums

    resources :contacts

    resources :sliders

    resources :pages

    # lawyers relationships
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

  get "editar-abogado", to: 'api/lawyers#update_description'

  scope "(:locale)", locale: /en|es/ do

    resources :posts

    get "", to: 'posts#index'
    get "contacto", to: 'posts#index'

    get "el-actual", to: 'posts#the_actual'

    get "el-actual/:id", to: 'posts#the_actual_detail'

    get "el-actual-colombia", to: 'posts#the_actual_co'

    get "el-actual-colombia/:id", to: 'posts#the_actual_co_detail'

    get "abogados-beta", to: 'lawyers#index'
    get "abogados", to: 'lawyers#index'
    get "abogados/:id", to: 'lawyers#show', constraints: { id: /[^\/]+/ }

    get "experiencias", to: 'experiences#index'
    get "experiencias/:slug", to: 'experiences#show'

    get "abogados/:id/vcard", to: 'lawyers#vcard'

    get "lawyers", to: 'lawyers#index'

    get "crear-abogado", to: redirect('/admin/lawyers/new')
    get "editar-abogado/:slug", to: 'admin/lawyers#index'
    get "edit-lawyer/:username", to: 'admin/lawyers#index'

    get "areas", to: 'categories#index'
    get "areas/:name", to: 'categories#show'

    get "/nosotros", to: 'pages#us'
    get "/trabaje-con-nosotros", to: 'pages#work_with_us'
    get "/probono", to: 'pages#pro_bono'

    namespace :admin do
      resources :posts
      resources :lawyers
      resources :experiences

      get "/probono", to: "posts#base"
      get "/posts2", to: "posts#base"
      get "/posts2/:id/edit", to: "posts#base"
      get "/experiences2", to: "posts#base"
      get "/lawyers2", to: "posts#base"
      get "/nosotros", to: "posts#base"
      get "/trabaje-con-nosotros", to: "posts#base"
      get "the-actual/new", to: "posts#the_actual_new"
      get "the-actual/:id/edit", to: "posts#the_actual_edit"
      get "the-actual", to: "posts#the_actual"
      get "the-actual-co/new", to: "posts#the_actual_co_new"
      get "the-actual-co/:id/edit", to: "posts#the_actual_co_edit"
      get "the-actual-co", to: "posts#the_actual_co"
      get "the-actual-pe/new", to: "posts#base"
      get "the-actual-pe/:id/edit", to: "posts#the_actual_pe_edit"
      get "the-actual-pe", to: "posts#the_actual_co"


    end

  end

  get "get-token", to: 'sessions#get_token_fb'
  get "save-token", to: 'sessions#save_user_token'
  get "see-token", to: 'sessions#see_token'

  get "dashboard", to: 'admin/lawyers#dashboard'

  get "admin/experiences", to: 'admin/experiences#dashboard'
  get "admin/posts", to: 'admin/posts#dashboard'

end
