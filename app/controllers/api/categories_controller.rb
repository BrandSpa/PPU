class Api::CategoriesController < ApplicationController

  def index
    lang = params[:lang] || "es"
    collection = Category.where(nil).lang(lang)
    render json: collection
  end
  
end
