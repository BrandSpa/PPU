class Api::CategoriesController < ApplicationController

  def index
    lang = params[:lang] || I18n.locale 
    collection = Category.where(nil).lang(lang).order('name ASC')
    render json: collection
  end
  
end
