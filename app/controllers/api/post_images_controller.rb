class Api::PostImagesController < ApplicationController
  def entity
     PostImage
  end

  def index
    collection = entity.all
    render json: collection
  end

  def create
    model = entity.create(post_image_params)
    render plain: "http://localhost:3000#{model.img_name.url}"
  end

  private 
    def post_image_params
      params.require(:postimage).permit(:img_name)
    end
end