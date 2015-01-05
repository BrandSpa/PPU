class Api::ContactsController < ApplicationController
	def entity
		Contact
	end
	
	def create
		model = entity.create(entity_params)

    if model.valid?
      render json: model, status: 200
    else
      render json: model.errors, status: 400
    end
	end
	private
	
		def entity_params
			params.require(:fields).permit(:name, :lastname, :email, :message)
		end
end
