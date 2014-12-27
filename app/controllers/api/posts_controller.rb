class Api::PostsController < ApplicationController
  def entity
     Post
  end

  def index
    lang = params[:lang] || I18n.locale
    country = params[:country]
    featured = params[:featured]
    collection = entity.get_relationships().not_featured.by_lang(lang).all
    collection = entity.featured.by_lang(lang).order(featured: :asc) if featured.present?
    collection = collection.by_country(country) if country.present?
    render json: collection.to_json(:include => [:translations, :gallery])
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
    model = entity.get_relationships().find(id)
    model.update(post_params)
    if model.valid?
      render json: model, status: 200
    else
      render json: model.errors, status: 400
    end
  end

  def show
    id = params[:id]
    lang = params[:lang] || I18n.locale
    model = entity.get_relationships().by_lang(lang).find_by(id: id)

    unless model.present?
      m = entity.find(id)
      new_model = duplicate(m)
      render json: new_model
      
    else
      render json: model.to_json(:include => [:translation, :categories, :lawyers, :gallery])
    end
    
  end

  def duplicate(model)
    model_new = model.dup
    model_new.lang = "en"
    model_new.translation_id = model.id
    model_new.title = "#{model.title}-traducir"
    model_new.save!
    model_new
  end

  private 
    def post_params
      params.require(:post).permit(:lang, :country, :date, :author, :title, :content, :content_plain, :img_name, :gallery_id, :lawyer_ids => [], :category_ids => [])
    end
    
end
