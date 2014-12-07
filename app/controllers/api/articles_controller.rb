class Api::ArticlesController < ApplicationController
  include CreateBelongsToLawyer
  
  def entity
    Article
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

end
