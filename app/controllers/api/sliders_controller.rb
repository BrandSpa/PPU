class Api::SlidersController < ApplicationController
  def index
    collection = Slider.order(position: :asc).order(created_at: :desc).where(name: params[:name])
    render json: collection
  end

  def create
    model = Slider.create(params_slider)
    render json: model, status: 201
  end

  def update
    model = Slider.find(params[:id])
    updated = model.update(params_slider)
    render json: model, status: 200
  end

  def destroy
    model = Slider.find(params[:id])
    model.destroy()
    render json: "destroyed"
  end

  def params_slider
    params.permit(:slider_image, :name, :position, :text, :title)
  end

end
