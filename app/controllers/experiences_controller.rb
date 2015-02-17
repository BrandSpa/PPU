class ExperiencesController < ApplicationController
	def index
	end

	def show
    id = params[:slug]
    @post = Experience.find_by(slug: id)
	end

end
