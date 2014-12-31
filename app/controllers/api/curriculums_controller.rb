class Api::CurriculumsController < ApplicationController
	before_action :authenticate_user!, except: [:index, :show]

	def create
		model = entity.create(curriculum_params)
		if model.valid?
			render json: model
		else
			render json: model.errors, status: 400
		end
		
	end

	private
		def entity
			Curriculum
		end
		def curriculum_params
			params.require(:fields).permit(:country, :name, :file_name)
		end
end
