class Api::PostsController < ApplicationController
  include Filterable

  def index
    lang = params[:lang] || I18n.locale
    
    collection = entity.get_relationships().lang(lang).all.order(date: :desc)
    collection = filters_without_params(set_filters_without_params(params), collection)
    collection = filters_with_params(set_filters(params), collection)

    render json: collection.to_json(:include => [:translations, :translation, :gallery])
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

  def set_filters(params)
    params.slice(:category, :country, :keyword)
  end

  def set_filters_without_params(params)
    params.slice(:featured, :published, :not_featured, :not_published)
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
