class Api::CurriculumsController < ApplicationController
	before_action :authenticate_user!, except: [:index, :show, :create]

	# store curriculum and send mail
	def create
		model = entity.create(curriculum_params)

		if model.valid?
			render json: model
			if model.country == 'Chile'
				CurriculumMailer.notification(model, "alejandro@brandspa.com").deliver
				CurriculumMailer.notification(model, "seleccioncl@ppulegal.com").deliver
			else
				CurriculumMailer.notification(model, "alejandro@brandspa.com").deliver
				CurriculumMailer.notification(model, "seleccionco@ppulegal.com").deliver
			end

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
