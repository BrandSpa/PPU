class Api::ExperiencesController < ApplicationController

	def index
		lang = params[:lang] || I18n.locale 
		collection = entity.with_relationships.by_lang(lang).all
		render json: collection.to_json(:include => [:translations, :categories, :lawyers, :gallery])
	end

	def show
		id = params[:id]
		if id.kind_of? String
			model = entity.with_relationships.find_by(slug: params[:id])
			
		else
			model = entity.with_relationships.find(params[:id])
		end

		render json: model.to_json(:include => [:translations, :categories, :lawyers, :gallery])
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
		duplicate = params[:duplicate]

		model = entity.with_relationships.find_by(id: params[:id])
		if duplicate.present?
      new_model = entity.duplicate(model)
      render json: new_model.to_json(:include => [:translations, :gallery]), status: 200
    else
			model.update(experience_params)
			if model.valid?
				render json: model
			else
				render json: model.errors, status: 400
			end
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
			params.require(:fields).permit(:gallery_id, :country, :img_name, :company_name, :company_web, :date, :title, :content, :category_ids => [], :lawyer_ids => [])
		end

end
