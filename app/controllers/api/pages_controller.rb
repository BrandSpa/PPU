class Api::PagesController < ApplicationController
  def index
    collection = Page.find_by(page: params[:page])
    render json: collection
  end

  def create
    model = Page.create(params_page)
    render json: model, status: 201
  end

  def update
    model = Page.find(params[:id])
    updated = model.update(params_page)
    render json: model, status: 200
  end

  def destroy
    model = Page.find(params[:id])
    model.destroy()
    render json: "destroyed"
  end

  def params_page
    params.permit(:title_es, :text_es, :title_en, :text_en, :page)
  end

end
