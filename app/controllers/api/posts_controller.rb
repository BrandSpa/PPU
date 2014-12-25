class Api::PostsController < ApplicationController
  def entity
     Post
  end

  def index
    lang = params[:lang] || I18n.locale
    country = params[:country]
    collection = entity.get_relationships().by_lang(lang).all
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
      render json: duplicate(m)
    else
      render json: model.to_json(:include => [:translation, :categories, :lawyers, :gallery])
    end
    
  end

  def duplicate(model)
    model_new = model.dup
    model_new.lang = "en"
    model_new.translation_id = model.id
    model_new.title = "#{model.title} en"
    model_new.save!
  end

  private 
    def post_params
      params.require(:post).permit(:lang, :country, :date, :author, :title, :content, :img_name, :gallery_id, :lawyer_ids => [], :category_ids => [])
    end
    
end
