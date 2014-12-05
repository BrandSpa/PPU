class Api::EducationsController < ApplicationController
  
  def entity
    Education
  end

  def params_model
    params[:fields]
  end

  def index
    lawyer_id = params[:lawyer_id]
    collection = entity.where('lawyer_id = ?', lawyer_id) if lawyer_id.present?
    render json: collection, status: 200
  end

  def show
    id = params[:id]
    model = entity.find(id) if id.present?
    render json: model, status: 200
  end

  def create
    new_data = {}
    new_data.merge!(params_model)
    model = entity.create(new_data)
    render json: model, status: 200
  end

  def update
    id = params[:id]
    model = entity.find(id) if id.present?
    model.update(education_params)
    render json: model, status: 200
  end

end