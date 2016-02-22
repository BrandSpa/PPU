class Api::CurriculumsController < ApplicationController
	before_action :authenticate_user!, except: [:index, :show, :create]

	# store curriculum and send mail
	def create
		model = entity.create(curriculum_params)

		if model.valid?
			render json: model
			if model.country == 'Chile'
				CurriculumMailer.notification(model, "seleccioncl@ppulegal.com").deliver
				CurriculumMailer.notification(model, "alejandro@brandspa.com").deliver
			elsif model.country == 'Colombia'
				CurriculumMailer.notification(model, "seleccionco@ppulegal.com").deliver
				CurriculumMailer.notification(model, "alejandro@brandspa.com").deliver
			elsif model.country == 'Perú'
				CurriculumMailer.notification(model, "seleccionco@ppulegal.com").deliver
				CurriculumMailer.notification(model, "alejandro@brandspa.com").deliver
			else
				CurriculumMailer.notification(model, "seleccionco@ppulegal.com").deliver
				CurriculumMailer.notification(model, "alejandro@brandspa.com").deliver
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
			params.permit(
				:country,
				:name,
				:lastname,
				:file_name,
				:birthday,
				:graduation_year,
				:university_colombia,
				:university_chile,
				:english,
				:areas,
				:grade_approved,
				:certification_ranking,
				:gathering_notes
			)
		end
end
