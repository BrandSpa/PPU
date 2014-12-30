class Api::ExperiencesController < ApplicationController

	def index
		lang = params[:lang] || I18n.locale 
		collection = entity.by_lang(lang).all
		render json: collection
	end

	def show
		model = entity.with_relationships.find_by(id: params[:id])
		render json: model.to_json(:include => [:translation, :categories, :lawyers, :gallery])
	end

	def create
		model = entity.create(experience_params)
		if model.valid?
			render json: model
		else
			render json: model.errors, status: 400
		end
	end

	def update
		model = entity.with_relationships.find_by(id: params[:id])
		model.update(experience_params)
		if model.valid?
			render json: model
		else
			render json: model.errors, status: 400
		end
	end

	def destroy
		model = entity.find_by(id: params[:id])
		model.destroy
		render json: "destroyed", status: 200
	end

	private
		def entity
			Experience
		end

		def experience_params
			params.require(:fields).permit(:gallery_id, :company_name, :company_web, :date, :title, :content, :category_ids => [], :lawyer_ids => [])
		end

end
