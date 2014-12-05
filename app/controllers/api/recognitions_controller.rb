class Api::RecognitionsController < ApplicationController
  def entity
    Recognition
  end

  def params_model
    params[:recognitions]
  end

  def param_lawyer_id
    params[:lawyer_id]
  end

  def index
    lawyer_id = param_lawyer_id
    collection = entity.where('lawyer_id = ?', lawyer_id) if lawyer_id.present?
    render json: collection, status: 200
  end

  def show
    id = params[:id]
    model = entity.find(id) if id.present?
    render json: model, status: 200
  end

   def create
    params_model.each do |data|
      new_data = {}
      new_data.merge!(data)
      entity.create(new_data)
    end
    render json: "models created", status: 200
  end

  def update
    id = params[:id]
    model = entity.find(id) if id.present?
    models = params_model
    models.each do |data|
      new_data = {}
      new_data.merge!(data)
      model.update(education_params)
    end
    render json: models, status: 200
  end
end
