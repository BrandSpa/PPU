class Api::CategoriesController < ApplicationController

  def index
    lang = params[:lang] || I18n.locale 
    collection = Category.includes(:gallery).where(nil).lang(lang).order('name ASC')
    render json: collection.to_json(:include => [:gallery])
  end
  
end
