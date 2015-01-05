class Api::PostsController < ApplicationController
  
  def index
    lang = params[:lang] || I18n.locale

    filters = params.slice(:by_category, :by_country, :by_keyword)
    filters_not_params = params.slice(:featured, :published, :not_featured, :not_published)
    
    collection = entity.get_relationships().by_lang(lang).all.order(date: :desc)
    collection = filters_without_params(filters_not_params, collection)
    collection = filters_with_params(filters, collection)

    
    render json: collection.to_json(:include => [:translations, :translation, :gallery])
  end


  def filters_without_params(filters, collection)
    filters.each do |scope_name, scope_param|
      collection = collection.public_send(scope_name) if scope_param.present?
    end

    collection
  end

  def filters_with_params(filters, collection)
    filters.each do |scope_name, scope_param|
      collection = collection.public_send(scope_name, scope_param) if scope_param.present?
    end

    collection
  end

  def create
    model = entity.create(post_params)
    if model.valid?
      render json: model, status: 200
    else
      render json: model.errors, status: 400
    end
  end

  def update
    id = params[:id]
    duplicate = params[:duplicate]

    model = entity.get_relationships().find_by(id: id)

    if duplicate.present?
      new_model = entity.duplicate(model)
      render json: new_model, status: 200
    else

      model.update(post_params)

      if model.valid?
        render json: model.to_json(:include => [:translations, :gallery]), status: 200
      else
        render json: model.errors, status: 400
      end
    end
    
  end

  def show
    id = params[:id]
    lang = params[:lang] || I18n.locale

    if is_a_number?(id)
      model = entity.get_relationships().find_by(id: id)
    else
      model = entity.get_relationships().find_by(slug: id)
    end

    render json: model.to_json(:include => [:translations, :translation, :categories, :lawyers, :gallery])  
  end

  def is_a_number?(s)
    s.to_s.match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil ? false : true 
  end

  private 
    def entity
      Post
    end

    def post_params
      params.require(:fields).permit(:lang, :country, :date, :author, :title, :content, :content_plain, :img_name, :gallery_id, :published, :featured, :lawyer_ids => [], :category_ids => [])
    end
    
end
