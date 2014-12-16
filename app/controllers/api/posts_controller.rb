class Api::PostsController < ApplicationController
  def entity
     Post
  end

  def index
    lang = params[:lang] || :es
    country = params[:country]
    collection = entity.by_lang(lang).all
    collection = collection.by_country(country) if country.present?
    render json: collection
  end

  def create
    model = entity.create(post_params)
  end

  private 
    def post_params
      params.require(:post).permit(:lang, :country, :author, :title, :content)
    end
end
