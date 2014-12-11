class Api::CategoriesController < ApplicationController

  def index
    lang = params[:lang] || "es"
    collection = Category.where(nil).lang(lang).order('name ASC')
    render json: collection
  end
  
end
