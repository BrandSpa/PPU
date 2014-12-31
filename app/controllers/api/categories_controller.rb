class Api::CategoriesController < ApplicationController
	def show
		model = Category.includes(:gallery, :translation, :experiences).find_by(slug: params[:id])
		render json: model.to_json(:include => [:gallery, :translation, :translations, :experiences => {:include => :gallery} ])
	end

  def index
    lang = params[:lang] || I18n.locale 
    collection = Category.includes(:gallery).all.lang(lang).order('name ASC')
    render json: collection.to_json(:include => [:gallery])
  end
  
end
