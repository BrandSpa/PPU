class Api::LawyersController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  def index
    lang = params[:lang] || "es"
    position = params[:position]
    keyword = params[:keyword]
    category = params[:category]
    category_id = params[:category_id]
    trade = params[:trade]
    trade_id = params[:trade_id]
    country = params[:country]
    offset = params[:offset]

    collection = Lawyer.select(:id, :lang, :name, :lastname, :country, :position, :phone, :email, :img_name).where(nil).lang(lang).limit(10).offset(offset).order('id DESC')
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
      render json: model.to_json(:include => [ {:categories => { :only => :name }}, :educations, :jobs , {:languages=> { :only => :name }}, :awards, :articles, :phrases, :recognitions, :institutions, :trades])
    else
      render json: "id don't finded", status: 400
    end
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
    model = Lawyer.find(id)
    model.update(lawyer_params)
    model.save

    if model
      render json: model
    else
      render json:  model.errors.messages, status: 400
    end
    
  end


  private
    def lawyer_params
      params.permit(:lang, :country, :img_name, :name , :lastname, :phone, :position, :email, :description) 
    end

end