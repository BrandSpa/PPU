class Api::LawyersController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    lang = params[:lang] || "es"
    name = params[:name]
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
    collection = collection.by_name(name) if name.present?
    render json: collection
  end

  def show
    id = params[:id]
    lang = params[:lang] || "es"

    if id.present?
      model = Lawyer.lang(lang).find(id)
      render json: model.to_json(:include => [ {:categories => { :only => [:id, :name] }}, :educations, :jobs , {:languages=> { :only => :name }}, :awards, :articles, :phrases, :recognitions, :institutions, :trades])
    else
      render json: "id don't finded", status: 400
    end
  end

  def create
    model = entity.create(lawyer_params)
    if model.valid?
      categories = params[:categories]
      render json: model, status: 200
    else
      render json: model.errors.messages, status: 400
    end
  end

  def update
    model = Lawyer.find(params[:id])
    model.update(lawyer_params)
    model.save
    if model.valid?
      render json: model
    else
      errors = model.errors.messages
      render json: errors, status: 400
    end
  end


  private
    def lawyer_params
      params.require(:fields).permit(:lang, :country, :img_name, :name , :lastname, :phone, :position, :level, :email, :description, :category_ids => []) 
    end
    def entity
      Lawyer
    end
end