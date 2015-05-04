class Api::ContactsController < ApplicationController

	# store contact and depending of country send mail
	def create
		model = entity.create(entity_params)

    if model.valid?
      render json: model, status: 200

      if model.country == "Colombia"
        ContactMailer.notification(model, "infoco@ppulegal.com").deliver
      elsif model.country == "Chile"
        ContactMailer.notification(model, "infocl@ppulegal.com").deliver
      else
        ContactMailer.notification(model, "alejandro@brandspa.com").deliver
      end

    else
      render json: model.errors, status: 400
    end
	end

	private
		def entity
			Contact
		end

		def entity_params
			params.require(:fields).permit(:name, :lastname, :email, :message, :country)
		end
end
