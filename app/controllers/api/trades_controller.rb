class Api::TradesController < ApplicationController

  def index
    lang = params[:lang] || "es"
    collection = Trade.where(nil).lang(lang)
    render json: collection
  end

  def show
    id = params[:id]
    lang = params[:lang] || "es"

    model = Trade.lang(lang).find(id)
    render json: model.to_json(:include => [:lawyers])
  end
end
