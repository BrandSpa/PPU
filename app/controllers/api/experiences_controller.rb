class Api::ExperiencesController < ApplicationController
	include Filterable

	def index
		lang = params[:lang] || I18n.locale
    paginate = params[:paginate] || 0
		collection = entity.with_relationships.lang(lang).paginate(paginate).order(date: :desc)
		collection = filters( params, collection)

		render json: collection.to_json(:include => [
			:translations,
			:translation,
			{:categories => {:only => [:id, :name]} },
			:lawyers,
			:gallery
			]);
	end

	def show
		id = params[:id]

		if is_a_number?(id)
			model = entity.with_relationships.find_by(id: params[:id])
		else
			model = entity.with_relationships.find_by(slug: params[:id])
		end
		render json: model.to_json(:include => [:translations,:translation, :categories, :lawyers, :gallery])
	end

	def create
		model = entity.create(experience_params)
		if model.valid?
			render json: model
		else
			render json: model.errors.messages, status: 400
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

	def is_a_number?(s)
  	s.to_s.match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil ? false : true
	end

	private
		def entity
			Experience
		end

		def experience_params
			params.require(:fields).permit(
			:gallery_id,
			:country,
			:img_name,
			:company_name,
			:company_web,
			:date,
			:title,
			:content,
			:category_ids => [],
			:lawyer_ids => [])
		end

end
