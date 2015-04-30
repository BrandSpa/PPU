class Api::CategoriesController < ApplicationController
	def show

		if I18n.locale == "en"
			lawyer_position = "Partner"
		else
			lawyer_position = "Socio"
		end

		model = Category.includes(
			:gallery,
			:translation,
			:experiences,
			:lawyers
		)
		.find_by(slug: params[:id])

		render json: model.to_json(
			:include => [
				:gallery,
				:translation,
				:translations,
				:lawyers,
				:experiences => {:include => :gallery}
		])
	end

  def index
    lang = params[:lang] || I18n.locale
    collection = Category.includes(:gallery).all.lang(lang).order('name ASC')
    render json: collection.to_json(:include => [:gallery])
  end

end
