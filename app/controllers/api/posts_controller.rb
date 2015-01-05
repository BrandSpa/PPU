class Api::PostsController < ApplicationController
  
  def index
    lang = params[:lang] || I18n.locale
    featured = params[:featured]
    published = params[:published]
    not_featured = params[:not_featured]
    not_published = params[:not_published]
    filters = params.slice(:by_category, :by_country, :by_keyword)
    
    collection = entity.get_relationships().by_lang(lang).all.order(date: :desc)
    collection = collection.featured.order_featured if featured.present?
    collection = collection.published if published.present?
    collection = collection.not_featured if not_featured.present?
    collection = collection.not_published if not_published.present?

    filters.each do |key, val|
      collection = collection.public_send(key, val) if val.present?
    end

    render json: collection.to_json(:include => [:translations, :translation, :gallery])
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
