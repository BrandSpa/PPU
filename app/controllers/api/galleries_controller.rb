class Api::GalleriesController < ApplicationController

  # get gallery by name or all of them
  def index
    name = params[:name]

    collection = entity.all
    collection = collection.by_name(name) if name.present?

    render json: collection
  end

  # store image
  def create
    model = entity.create(params_gallery)

    if model.name == "post_content"
      render plain: model.img_name.url
    elsif model.name == "experience_content"
      render plain: model.img_name.url
    else
      render json: model
    end
  end

  private
    def entity
      Gallery
    end

    def params_gallery
      params.require(:gallery).permit(:name, :img_name)
    end

end
