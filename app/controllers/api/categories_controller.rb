class Api::CategoriesController < ApplicationController

	# get all and filter by lang
	def index
		lang = params[:lang] || I18n.locale

		collection = entity.includes(:gallery).all.lang(lang).order('name ASC')

		render json: collection.to_json(:include => [:gallery])

	end


	# get category by slug or id
	def show

		if I18n.locale == "en"
			lawyer_position = "Partner"
		else
			lawyer_position = "Socio"
		end

		model = entity.includes(
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

	private
	
		def entity
			Category
		end

end
