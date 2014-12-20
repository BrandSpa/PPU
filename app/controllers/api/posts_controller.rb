class Api::PostsController < ApplicationController
  def entity
     Post
  end

  def index
    lang = params[:lang] || :es
    country = params[:country]
    collection = entity.by_lang(lang).all
    collection = collection.by_country(country) if country.present?
    render json: collection.to_json(:include => [:gallery])
  end

  def create
    model = entity.create(post_params)
    if model.valid?
      render json: model, status: 200
    else
      render json: model.errors, status: 400
    end
    
  end

  private 
    def post_params
      params.require(:post).permit(:lang, :country, :date, :author, :title, :content, :img_name, :gallery_id)
    end
    
end
