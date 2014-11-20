class Api::LawyersController < ApplicationController

  def index
    lang = params[:lang] || "es"
    position = params[:position]
    keyword = params[:keyword]
    category = params[:category]
    category_id = params[:category_id]
    trade = params[:trade]
    trade_id = params[:trade_id]
    country = params[:country]

    collection = Lawyer.select(:id, :name, :lastname, :position, :phone, :email, :img_path).where(nil).lang(lang)
    collection = collection.by_position(position) if position.present?
    collection = collection.by_category(category) if category.present?
    collection = collection.by_trade(trade) if trade.present?
    collection = collection.by_category_id(category_id) if category.present?
    collection = collection.by_country(country) if country.present?
    collection = collection.search(keyword) if keyword.present?

    render json: collection
  end

  def show
    id = params[:id]
    lang = params[:lang] || "es"

    if id.present?
      model = Lawyer.lang(lang).find(id)
      render json: model.to_json(:include => 
          [ {:categories => { :only => :name }}, :educations, :jobs , {:languages=> { :only => :name }}, :awards, :articles, :phrases, :recognitions, :institutions, :trades])
    else
      render json: "id don't received in lawyers", status: 400
    end
  end

end